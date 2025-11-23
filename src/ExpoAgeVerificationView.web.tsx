import * as React from 'react';

import { ExpoAgeVerificationViewProps } from './ExpoAgeVerification.types';

export default function ExpoAgeVerificationView(props: ExpoAgeVerificationViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
