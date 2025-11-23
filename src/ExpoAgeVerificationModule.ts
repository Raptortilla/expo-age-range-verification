import { NativeModule, requireNativeModule } from 'expo';

import { ExpoAgeVerificationModuleEvents } from './ExpoAgeVerification.types';

declare class ExpoAgeVerificationModule extends NativeModule<ExpoAgeVerificationModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoAgeVerificationModule>('ExpoAgeVerification');
