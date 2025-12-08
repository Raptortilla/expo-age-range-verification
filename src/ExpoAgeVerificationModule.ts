// src/ExpoAgeVerificationModule.ts
import { requireNativeModule } from "expo-modules-core";

// This MUST match the name() in ExpoAgeVerificationModule.kt
// Name("ExpoAgeVerification")
const ExpoAgeVerification = requireNativeModule("ExpoAgeVerification");

export default ExpoAgeVerification;
