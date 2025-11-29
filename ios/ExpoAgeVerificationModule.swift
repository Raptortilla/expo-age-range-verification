import ExpoModulesCore
import DeclaredAgeRange // iOS 26+ framework

// Simple error type so we can send clear messages to JS
enum AgeVerificationError: Error {
  case notSupported
  case noViewController
}

extension AgeVerificationError: LocalizedError {
  var errorDescription: String? {
    switch self {
    case .notSupported:
      return "Declared Age Range is only available on iOS 26+ with the required entitlement."
    case .noViewController:
      return "Unable to find a presenting view controller."
    }
  }
}

public class ExpoAgeVerificationModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoAgeVerification")

    // iOS-specific function – JS will call this
    AsyncFunction("requestDeclaredAgeRange") { (ageGates: [Int]) -> [String: Any] in
      // Only available on iOS 26+
      guard #available(iOS 26.0, *) else {
        throw AgeVerificationError.notSupported
      }

      // Get the current view controller from Expo
      guard let viewController = self.appContext?.utilities?.currentViewController() else {
        throw AgeVerificationError.noViewController
      }

      // Apple allows 1–3 age gates; you can validate here if you want
      let sortedGates = ageGates.sorted()

      // UIKit call – AgeRangeService is the core API :contentReference[oaicite:4]{index=4}
      let response = try await AgeRangeService.shared.requestAgeRange(
        ageGates: sortedGates.first ?? 13,
        // Apple’s signature actually accepts up to 3 age gates,
        // but the first one is enough for many cases; you can expand later.
        in: viewController
      )

      // Map enum to a JS-usable dictionary
      switch response {
        case .declinedSharing:
          return [
            "status": "declinedSharing",
            "range": NSNull(),
            "metadata": [:]  // nothing extra for now
          ]

        case .sharing(let range):
          var rangeDict: [String: Any] = [:]
          if let lower = range.lowerBound {
            rangeDict["lowerBound"] = lower
          }
          if let upper = range.upperBound {
            rangeDict["upperBound"] = upper
          }

          return [
            "status": "sharing",
            "range": rangeDict,
            "metadata": [:]
          ]
      }

    }
  }
}


