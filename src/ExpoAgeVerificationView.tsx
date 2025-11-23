import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoAgeVerificationViewProps } from './ExpoAgeVerification.types';

const NativeView: React.ComponentType<ExpoAgeVerificationViewProps> =
  requireNativeView('ExpoAgeVerification');

export default function ExpoAgeVerificationView(props: ExpoAgeVerificationViewProps) {
  return <NativeView {...props} />;
}
