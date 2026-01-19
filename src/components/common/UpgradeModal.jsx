import { useState } from "react";
import { Button } from "../ui/button";
import {
  X,
  Lock,
  Unlock,
  Check,
  AlertTriangle,
  Download,
  Shield,
  CheckCircle,
  Sparkles,
  BarChart3,
  Target,
} from "lucide-react";

export function UpgradeModal({
  isOpen,
  onClose,
  onUpgrade,
  onCreateAccount,
  isAuthenticated = true,
  monthlyPrice = "€29",
}) {
  const [isHoveringClose, setIsHoveringClose] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              onMouseEnter={() => setIsHoveringClose(true)}
              onMouseLeave={() => setIsHoveringClose(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10 group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>

            {isHoveringClose && (
              <div className="absolute right-16 top-4 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap">
                You're so close! 🚀
              </div>
            )}
          </div>

          <div className="p-8 pt-6">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-2xl opacity-30"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Unlock className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Unlock the Full Market Report
              </h2>

              <p className="text-base text-gray-600">
                You're seeing a preview. Upgrade to access complete insights.
              </p>
            </div>

            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 p-4 bg-gray-100 border-2 border-gray-200 rounded-xl opacity-60">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">
                    Market Gaps Analysis
                  </div>
                  <div className="text-xs text-gray-500">
                    Underserved opportunities
                  </div>
                </div>
                <Lock className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-100 border-2 border-gray-200 rounded-xl opacity-60">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">
                    Risk Analysis & Warnings
                  </div>
                  <div className="text-xs text-gray-500">
                    Critical decision factors
                  </div>
                </div>
                <Lock className="w-5 h-5 text-gray-400" />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-100 border-2 border-gray-200 rounded-xl opacity-60">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">
                    Competitive Breakdown
                  </div>
                  <div className="text-xs text-gray-500">
                    Detailed competitor analysis
                  </div>
                </div>
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                What you'll unlock
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Full market gap analysis
                      </span>{" "}
                      with no masking or limits
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Opportunity scores & rationale
                      </span>{" "}
                      for every insight
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Risk warnings & confidence indicators
                      </span>{" "}
                      to make informed decisions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Save & export reports
                      </span>{" "}
                      as PDF for presentations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Access past reports & usage history
                      </span>{" "}
                      anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-gray-900">
                        Pro Plan
                      </span>
                      <div className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        POPULAR
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Everything you need to succeed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {monthlyPrice}
                      </span>
                      <span className="text-base text-gray-600">/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Cancel anytime
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-200">
                  <p className="text-xs text-center text-gray-600 italic">
                    "Less than the cost of one failed idea."
                  </p>
                </div>
              </div>
            </div>

            {isAuthenticated ? (
              <Button
                onClick={onUpgrade}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all mb-4"
              >
                <Unlock className="w-5 h-5 mr-2" />
                Upgrade & Unlock Full Report
              </Button>
            ) : (
              <>
                <Button
                  onClick={onCreateAccount}
                  className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all mb-3"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create free account to continue
                </Button>
                <p className="text-xs text-center text-gray-600 mb-4">
                  You'll still get 1 free report • No credit card required
                </p>
              </>
            )}

            <button
              onClick={onClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors py-2"
            >
              Continue with free preview
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No hidden fees</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>GDPR compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
