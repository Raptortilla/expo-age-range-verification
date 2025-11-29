package expo.modules.ageverification

import expo.modules.kotlin.modules.*

class ExpoAgeVerificationModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoAgeVerification")

    AsyncFunction("verifyAge") { age: Int ->
      age >= 18
    }
  }
}
