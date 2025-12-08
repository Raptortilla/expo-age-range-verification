package expo.modules.ageverification

import android.content.Context
import com.google.android.gms.tasks.Task
import com.google.android.play.agesignals.AgeSignalsManager
import com.google.android.play.agesignals.AgeSignalsManagerFactory
import com.google.android.play.agesignals.AgeSignalsRequest
import com.google.android.play.agesignals.AgeSignalsResult
import java.util.concurrent.CancellationException

/**
 * Small wrapper around the Play Age Signals API so the Expo module
 * doesn’t have to deal with Tasks directly.
 */
class PlayAgeSignalsClient(
  private val context: Context
) {

  // Lazily create the manager using the application context
  private val ageSignalsManager: AgeSignalsManager by lazy {
    AgeSignalsManagerFactory.create(context.applicationContext)
  }

  /**
   * Requests age signals from Google Play.
   *
   * @param onSuccess called with the [AgeSignalsResult] when the request succeeds.
   * @param onError called with an [Exception] if the request fails or is cancelled.
   */
  fun fetchAgeSignals(
    onSuccess: (AgeSignalsResult) -> Unit,
    onError: (Exception) -> Unit
  ) {
    try {
      val request = AgeSignalsRequest.builder().build()

      val task: Task<AgeSignalsResult> =
        ageSignalsManager.checkAgeSignals(request)

      task
        .addOnSuccessListener { result ->
          onSuccess(result)
        }
        .addOnFailureListener { throwable ->
          onError(
            if (throwable is Exception) throwable
            else Exception("Play Age Signals failed", throwable)
          )
        }
        .addOnCanceledListener {
          onError(
            CancellationException("Play Age Signals request was cancelled")
          )
        }
    } catch (e: Exception) {
      // Synchronous errors (e.g. mis-configuration)
      onError(e)
    }
  }
}
