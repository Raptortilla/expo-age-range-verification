// src/index.ts
import ExpoAgeVerificationModule from "./ExpoAgeVerificationModule";

export type PlayAgeSignalsResult = {
  raw: string; // matches the map we send from Kotlin
};

const AgeVerification = {
  async getPlayAgeSignals(): Promise<PlayAgeSignalsResult> {
    // This will call the AsyncFunction("getPlayAgeSignals") you defined in Kotlin
    return await ExpoAgeVerificationModule.getPlayAgeSignals();
  },
};

export default AgeVerification;
