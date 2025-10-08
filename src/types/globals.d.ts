import { Role } from "@prisma/client";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: Role;
    };
  }
}
