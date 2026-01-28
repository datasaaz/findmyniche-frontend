import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  MapPin,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  FileText,
  CheckCircle,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Eye,
  Clock,
  Zap,
  Info,
} from "lucide-react";

const processingSteps = [
  {
    id: 1,
    label: "Finding nearby businesses",
    icon: MapPin,
    description: "Scanning location data",
  },
  {
    id: 2,
    label: "Analyzing customer reviews",
    icon: MessageSquare,
    description: "Processing sentiment & feedback",
  },
  {
    id: 3,
    label: "Checking market demand",
    icon: TrendingUp,
    description: "Evaluating search trends",
  },
  {
    id: 4,
    label: "Identifying opportunities",
    icon: Lightbulb,
    description: "Finding gaps & insights",
  },
  {
    id: 5,
    label: "Generating insights",
    icon: FileText,
    description: "Compiling your report",
  },
];

export function ReportProcessingScreen({
  currentStep = 1,
  onCancel,
  isSlowSource = false,
  estimatedTime = "under a minute",
}) {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-[600px] w-full">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-30"></div>

              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Analyzing your market{dots}
          </h1>

          <p className="text-base text-gray-600 text-center mb-12 max-w-[480px] mx-auto">
            We're collecting public data, analyzing competition, and identifying
            opportunities. This usually takes {estimatedTime}.
          </p>

          <Card className="bg-white border-2 border-gray-200 shadow-xl p-8 mb-6">
            <div className="space-y-6">
              {processingSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isComplete = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isPending = currentStep < step.id;

                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {index < processingSteps.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-12 w-0.5 h-8 -translate-x-1/2 transition-colors duration-500 ${
                            isComplete
                              ? "bg-green-500"
                              : isCurrent
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        ></div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isComplete
                            ? "bg-green-500 shadow-lg shadow-green-200"
                            : isCurrent
                            ? "bg-essence shadow-lg shadow-blue-200 animate-pulse"
                            : "bg-gray-100"
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <StepIcon
                            className={`w-6 h-6 ${
                              isCurrent
                                ? "text-white"
                                : isPending
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 pt-2">
                      <div
                        className={`text-base font-semibold mb-1 transition-colors duration-300 ${
                          isComplete
                            ? "text-green-700"
                            : isCurrent
                            ? "text-blue-700"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 text-blue-600">{dots}</span>
                        )}
                        {isComplete && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                      </div>
                      <div
                        className={`text-sm ${
                          isCurrent ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {isSlowSource && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-900">
                  <span className="font-semibold">Taking longer than usual.</span>{" "}
                  Some data sources are responding slowly. We'll continue with
                  available data if needed.
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button
              disabled
              className="h-14 px-8 bg-gray-400 text-white font-semibold text-lg mb-4 cursor-not-allowed"
            >
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating report{dots}
            </Button>

            <p className="text-sm text-gray-500">
              You can safely leave this page — we'll notify you when it's ready.
            </p>

            {onCancel && (
              <button
                onClick={onCancel}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FreeUserProcessingPreview({ currentStep = 3, onSignUp }) {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const maxStep = currentStep >= 3 ? 3 : currentStep;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-[600px] w-full">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Analyzing your market{dots}
          </h1>

          <p className="text-base text-gray-600 text-center mb-12 max-w-[480px] mx-auto">
            We're discovering initial insights about your selected location and
            category.
          </p>

          <Card className="bg-white border-2 border-gray-200 shadow-xl p-8 mb-6 relative">
            {currentStep >= 3 && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white rounded-lg backdrop-blur-sm z-10"></div>
            )}

            <div className="space-y-6 relative">
              {processingSteps.slice(0, 3).map((step, index) => {
                const StepIcon = step.icon;
                const isComplete = maxStep > step.id;
                const isCurrent = maxStep === step.id;

                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {index < 2 && (
                        <div
                          className={`absolute left-1/2 top-12 w-0.5 h-8 -translate-x-1/2 transition-colors duration-500 ${
                            isComplete ? "bg-green-500" : "bg-gray-200"
                          }`}
                        ></div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isComplete
                            ? "bg-green-500 shadow-lg"
                            : isCurrent
                            ? "bg-essence shadow-lg animate-pulse"
                            : "bg-gray-100"
                        }`}
                      >
                        {isComplete ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <StepIcon
                            className={`w-6 h-6 ${
                              isCurrent ? "text-white" : "text-gray-400"
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 pt-2">
                      <div
                        className={`text-base font-semibold mb-1 ${
                          isComplete
                            ? "text-green-700"
                            : isCurrent
                            ? "text-blue-700"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 text-blue-600">{dots}</span>
                        )}
                        {isComplete && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {currentStep >= 3 && (
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-8 shadow-2xl mb-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  We've found initial insights
                </h3>
                <p className="text-blue-100 mb-6">
                  Sign up to generate your free report and see complete market
                  analysis.
                </p>
                <Button
                  onClick={onSignUp}
                  className="h-14 px-8 bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg shadow-xl"
                >
                  Continue & sign up
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export function BackgroundProcessingIndicator({
  reportId = "REPORT-001",
  location = "Dublin, Ireland",
  category = "Coffee Shops",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left"
    >
      <div className="w-10 h-10 bg-essence rounded-lg flex items-center justify-center flex-shrink-0">
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900">Report in progress</span>
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            Processing
          </Badge>
        </div>
        <div className="text-sm text-gray-600 truncate">
          {location} • {category}
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">Click to view</div>
      </div>
    </button>
  );
}

export function ProcessingFailureState({
  onRetry,
  onViewPartial,
  errorReason = "Some data sources were unavailable.",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <Card className="max-w-[560px] w-full p-10 text-center border-2 border-gray-200 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-amber-600" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          We couldn't complete the analysis
        </h2>

        <p className="text-base text-gray-600 mb-8 max-w-[400px] mx-auto">
          {errorReason} You can retry or continue with limited data.
        </p>

        <div className="space-y-3">
          <Button
            onClick={onRetry}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retry analysis
          </Button>

          <Button
            onClick={onViewPartial}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
          >
            <Eye className="w-4 h-4 mr-2" />
            View partial report
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact support
          </a>
        </p>
      </Card>
    </div>
  );
}

export function CacheHitLoading({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 50;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 2;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-[500px] w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-30"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Loading your report
        </h2>

        <p className="text-base text-gray-600 mb-8">
          <span className="inline-flex items-center gap-2">
            <Info className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">
              Using recent data for faster results.
            </span>
          </span>
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

export function ProcessingBadge({ count = 1, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
    >
      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      <span className="text-sm font-medium text-blue-900">
        {count} {count === 1 ? "report" : "reports"} in progress
      </span>
    </button>
  );
}
