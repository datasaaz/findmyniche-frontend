import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ProcessingFailureState } from "../components/common/ProcessingStates";
import {
  TrendingUp,
  AlertCircle,
  MapPin,
  RefreshCw,
  Mail,
  CheckCircle,
  Shield,
  Clock,
  Info,
} from "lucide-react";

export function ReportError({
  onTryDifferentLocation,
  onChangeCategory,
  onRetry,
  onContactSupport,
  errorType = "data-unavailable",
} = {}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const resolvedErrorType = state?.errorType || errorType;

  const handleTryDifferentLocation = () => {
    if (onTryDifferentLocation) {
      onTryDifferentLocation();
      return;
    }
    navigate("/input");
  };

  const handleChangeCategory = () => {
    if (onChangeCategory) {
      onChangeCategory();
      return;
    }
    navigate("/input");
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    navigate("/report-loading");
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport();
      return;
    }
    navigate("/contact");
  };

  const getErrorReason = () => {
    if (resolvedErrorType === "timeout") {
      return "External data sources took longer than expected. Please try again.";
    }
    if (resolvedErrorType === "rate-limit") {
      return "Too many requests in a short time. Please wait a moment and try again.";
    }
    if (resolvedErrorType === "partial") {
      return "Some data sources were unavailable. We have partial results.";
    }
    return "Some data sources were unavailable in this area. Please try a different location.";
  };

  const getReasons = () => {
    if (resolvedErrorType === "timeout") {
      return [
        "External data sources took longer than expected",
        "Review platforms may be experiencing high traffic",
        "Network connectivity issues may have occurred",
      ];
    }
    if (resolvedErrorType === "rate-limit") {
      return [
        "External data sources have temporary request limits",
        "Too many requests in a short time period",
        "Data providers may be updating their systems",
      ];
    }
    return [
      "Limited public business data in this area",
      "Review data unavailable or restricted",
      "External data sources temporarily busy",
    ];
  };

  if (onRetry && resolvedErrorType === "partial") {
    return (
      <ProcessingFailureState
        onRetry={handleRetry}
        onViewPartial={handleTryDifferentLocation}
        errorReason={getErrorReason()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertCircle className="w-10 h-10 text-amber-600" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-amber-300 rounded-2xl animate-pulse opacity-20"></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            We couldn't complete your report this time
          </h1>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-base text-gray-700 leading-relaxed">
                  Some locations don't have enough public data for a reliable analysis, or our data sources may be temporarily unavailable.
                  We only generate reports when we're confident in the results.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">This might be because:</h2>
            <ul className="space-y-3">
              {getReasons().map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              onClick={handleTryDifferentLocation}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all gap-2"
            >
              <MapPin className="w-5 h-5" />
              Try a different location
            </Button>

            <Button
              onClick={handleChangeCategory}
              size="lg"
              variant="outline"
              className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 py-6 text-lg gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Change category
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry analysis
            </button>
            <button
              onClick={handleContactSupport}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact support
            </button>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">You were not charged for this report.</span> Your account remains unchanged.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">No data was lost.</span> All your previous reports are safe.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">You can try again anytime.</span> There's no limit on retries.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Tips for better results</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">•</span>
                <span>Try larger cities or well-populated areas with more businesses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">•</span>
                <span>Select broader categories first (e.g., "Restaurant" instead of "Vegan Sushi Bar")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-medium">•</span>
                <span>Wait a few minutes and try again if the issue seems temporary</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 text-xs text-gray-500">
            <button className="hover:text-gray-900 transition-colors">Help Center</button>
            <span className="text-gray-300">•</span>
            <button className="hover:text-gray-900 transition-colors">System Status</button>
            <span className="text-gray-300">•</span>
            <button onClick={handleContactSupport} className="hover:text-gray-900 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
