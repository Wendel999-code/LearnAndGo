"use client";

import { completeOnboarding } from "@/actions/user/auth";
import { useEffect } from "react";
import Loading from "../loading";

export default function OnboardingPage() {
  useEffect(() => {
    const doOnboarding = async () => {
      try {
        const res = await completeOnboarding();

        if (!res.success) {
          window.location.href = "/";
          return;
        }

        //  Hard reload so Clerk + middleware pick up new metadata
        window.location.reload();
      } catch (err) {
        console.error("Onboarding failed:", err);
        window.location.href = "/";
      }
    };

    doOnboarding();
  }, []);

  return <Loading />;
}
