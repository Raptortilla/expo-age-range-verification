package expo.modules.ageverification

import android.util.Log
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAgeVerificationModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("ExpoAgeVerification")

    // JS: ExpoAgeVerification.getPlayAgeSignals()
    AsyncFunction("getPlayAgeSignals") { promise: Promise ->
      Log.d("ExpoAgeVerification", "getPlayAgeSignals() called from JS")

      val context = appContext.reactContext ?: run {
        promise.reject(
          "NO_REACT_CONTEXT",
          "React context is not available yet.",
          null
        )
        return@AsyncFunction
      }

      val client = PlayAgeSignalsClient(context)

      client.fetchAgeSignals(
        onSuccess = { result ->
          try {
            // For now just send the raw result string to JS
            val payload = mapOf(
              "raw" to result.toString()
            )
            promise.resolve(payload)
          } catch (e: Exception) {
            Log.e("ExpoAgeVerification", "Error handling Play Age Signals result", e)
            promise.reject(
              "AGE_SIGNALS_PARSE_ERROR",
              e.message ?: "Error while handling Play Age Signals result.",
              e
            )
          }
        },
        onError = { error ->
          Log.e("ExpoAgeVerification", "Play Age Signals failed", error)
          promise.reject(
            "AGE_SIGNALS_ERROR",
            error.message ?: "Play Age Signals failed.",
            error
          )
        }
      )
    }
  }
}