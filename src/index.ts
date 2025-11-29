import { Platform } from "react-native";
import { requireNativeModule } from "expo-modules-core";

export type DeclaredAgeRangeNativeResponse = {
  status: "declinedSharing" | "sharing";
  range: {
    lowerBound?: number;
    upperBound?: number;
  } | null;
  metadata?: {
    ageRangeDeclaration?: string;
    reason?: string;
  };
};

type ExpoAgeVerificationModuleType = {
  requestDeclaredAgeRange(
    ageGates: number[]
  ): Promise<DeclaredAgeRangeNativeResponse>;
};

const ExpoAgeVerification = requireNativeModule<ExpoAgeVerificationModuleType>(
  "ExpoAgeVerification"
);

/**
 * Low-level call to Apple's Declared Age Range API.
 * @param ageGates Up to 3 ages (e.g. [13, 16, 18]) to define ranges.
 */
export async function requestDeclaredAgeRange(
  ageGates: number[]
): Promise<DeclaredAgeRangeNativeResponse> {
  if (Platform.OS !== "ios") {
    throw new Error("Declared Age Range is only available on iOS.");
  }

  return ExpoAgeVerification.requestDeclaredAgeRange(ageGates);
}

/**
 * Simple helper: returns true if the user is at least `minAge`.
 * If user declines or framework is unavailable, returns false.
 */
export async function isAtLeastAge(minAge: number): Promise<boolean> {
  try {
    const res = await requestDeclaredAgeRange([minAge]);

    if (res.status !== "sharing" || !res.range) {
      // user declined or we have no info → treat as underage
      return false;
    }

    const { lowerBound } = res.range;
    if (typeof lowerBound === "number" && lowerBound >= minAge) {
      return true;
    }

    return false;
  } catch (e: any) {
    // If it's AgeVerificationError.notSupported etc, just treat as underage or handle specially
    console.warn("Declared Age Range not available:", e?.message ?? String(e));
    return false;
  }
}
