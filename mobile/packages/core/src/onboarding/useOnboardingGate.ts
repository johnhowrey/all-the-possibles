import { useStoredFlag } from "../storage/storage";

/** Whether this app's onboarding has been completed, persisted per device. */
export function useOnboardingGate(appId: string): {
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  completeOnboarding: () => Promise<void>;
} {
  const { value, isLoading, setValue } = useStoredFlag(appId, "onboarding_complete", false);
  return {
    hasCompletedOnboarding: value,
    isLoading,
    completeOnboarding: () => setValue(true),
  };
}
