"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export const completeOnboarding = async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role: Role.STUDENT,
      },
    });
    return {
      success: true,
      message: "User updated successfully",
      role: res.publicMetadata.role,
    };
  } catch (err) {
    return {
      success: false,
      message: "There was an error updating the user metadata.",
      role: null,
    };
  }
};
