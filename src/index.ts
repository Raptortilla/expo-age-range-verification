// Reexport the native module. On web, it will be resolved to ExpoAgeVerificationModule.web.ts
// and on native platforms to ExpoAgeVerificationModule.ts
export { default } from './ExpoAgeVerificationModule';
export { default as ExpoAgeVerificationView } from './ExpoAgeVerificationView';
export * from  './ExpoAgeVerification.types';
