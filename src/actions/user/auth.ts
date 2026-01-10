"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export const completeOnboarding = async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const user = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role: Role.STUDENT,
      },
    });

    // Check if already exists
    const existing = await prisma?.user.findUnique({
      where: { clerk_id: userId },
    });

    if (existing) return;

    // Extract clean data
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email = user.emailAddresses[0]?.emailAddress;

    // Fix role typing: ensure it's exactly Role or fallback to safe default
    const roleFromMetadata = user.publicMetadata?.role;
    const safeRole =
      roleFromMetadata && Object.values(Role).includes(roleFromMetadata as Role)
        ? (roleFromMetadata as Role)
        : Role.STUDENT;

    await prisma?.user.create({
      data: {
        clerk_id: userId,
        firstName,
        lastName,
        email,
        role: safeRole,
      },
    });

    return {
      success: true,
      message: "User updated and synced successfully",
      role: user.publicMetadata.role,
    };
  } catch (err) {
    return {
      success: false,
      message: "There was an error updating the user metadata.",
      role: null,
    };
  }
};

// export const syncClerkUser = async () => {
//   try {
//     const { isAuthenticated, userId } = await auth();
//     if (!isAuthenticated || !userId) {
//       return { message: "No Logged In User" };
//     }

//     const user = await currentUser();
//     if (!user) {
//       return { message: "No Logged In User" };
//     }

//     // Check if already exists
//     const existing = await prisma?.user.findUnique({
//       where: { clerk_id: userId },
//     });

//     if (existing) return existing;

//     // Extract clean data
//     const firstName = user.firstName || "";
//     const lastName = user.lastName || "";
//     const email = user.emailAddresses[0]?.emailAddress;

//     // Fix role typing: ensure it's exactly Role or fallback to safe default
//     const roleFromMetadata = user.publicMetadata?.role;
//     const safeRole =
//       roleFromMetadata && Object.values(Role).includes(roleFromMetadata as Role)
//         ? (roleFromMetadata as Role)
//         : Role.STUDENT;

//     await prisma?.user.create({
//       data: {
//         clerk_id: userId,
//         firstName,
//         lastName,
//         email,
//         role: safeRole,
//       },
//     });

//     return;
//   } catch (error) {
//     console.error("Error in syncClerkUser:", error);
//     return { error: "Failed to sync user" };
//   }
// };
