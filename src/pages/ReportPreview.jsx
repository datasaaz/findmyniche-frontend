import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { UpgradeModal } from "../components/common/UpgradeModal";
import {
  Target,
  MapPin,
  Building2,
  Star,
  TrendingUp,
  Lock,
  Check,
  Shield,
  Database,
  ChevronDown,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export function ReportPreview({
  location,
  category,
  refinements,
  onUnlock,
  onBack,
  isAuthenticated = false,
  onCreateAccount,
} = {}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showComparison, setShowComparison] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const resolvedLocation = location || state?.location || "Cambridge, UK";
  const resolvedCategory = category || state?.category || "Coffee Shop";
  const resolvedRefinements = refinements || state?.refinements || [];
  const resolvedAuthenticated = state?.isAuthenticated ?? isAuthenticated;

  const handleUnlockClick = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    if (onUnlock) {
      onUnlock();
      return;
    }
    navigate("/auth", { state: { location: resolvedLocation, category: resolvedCategory } });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate("/");
  };

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
      return;
    }
    navigate("/signup", { state: { location: resolvedLocation, category: resolvedCategory } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-gray-900 font-medium">Location</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Category</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-blue-600 font-semibold">Preview</span>
              <Badge className="ml-2 bg-green-100 text-green-700 border-green-300">
                Free preview
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Market snapshot for your selected area
              </h1>
              <p className="text-lg text-gray-600">
                This is a limited preview. Full insights unlock after signup.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <span className="text-sm font-medium text-blue-900">{resolvedLocation}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span className="text-sm font-medium text-purple-900">{resolvedCategory}</span>
                </div>
                {resolvedRefinements.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
                    <Check className="w-4 h-4 text-green-700" />
                    <span className="text-sm font-medium text-green-900">
                      {resolvedRefinements.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-gray-900 mb-1">~80</div>
                    <div className="text-sm font-medium text-gray-700 mb-1">businesses found</div>
                    <div className="text-xs text-gray-500">Within 500m radius</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-gray-900 mb-1">10</div>
                    <div className="text-sm font-medium text-gray-700 mb-1">reviewed locations</div>
                    <div className="text-xs text-gray-500">Based on public reviews</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      Market Signal Summary
                    </div>
                    <p className="text-gray-700">
                      Moderate competition with mixed customer sentiment
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-white border-2 border-gray-300 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-bold text-gray-900">Potential market gaps</h3>
                </div>

                <div className="blur-md select-none space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        Premium service gap in residential areas
                      </div>
                      <div className="text-sm text-gray-600">
                        High-income neighborhoods show demand for upscale options with limited supply
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        Late-night and weekend service opportunity
                      </div>
                      <div className="text-sm text-gray-600">
                        Most competitors close early, leaving underserved time slots
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        Delivery-first model potential
                      </div>
                      <div className="text-sm text-gray-600">
                        Limited delivery options compared to dine-in focused competitors
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20">
                <div className="text-center px-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sign up to reveal niche opportunities and risks
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get detailed market gaps, risk warnings, and confidence scores
                  </p>
                  <Button
                    onClick={handleUnlockClick}
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                    size="lg"
                  >
                    Create free account
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 bg-gray-100 border border-gray-300 relative">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <h4 className="font-semibold text-gray-700">Risk Warnings</h4>
                </div>
                <p className="text-sm text-gray-500 blur-sm">
                  Market saturation analysis and competitive threats
                </p>
              </Card>
              <Card className="p-6 bg-gray-100 border border-gray-300 relative">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <h4 className="font-semibold text-gray-700">Confidence Score</h4>
                </div>
                <p className="text-sm text-gray-500 blur-sm">
                  Data-backed opportunity rating and insights
                </p>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Unlock your full market report
                </h2>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Detailed market gaps & opportunities
                      </div>
                      <div className="text-sm text-gray-600">Identify underserved niches</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Risk warnings & confidence score
                      </div>
                      <div className="text-sm text-gray-600">Avoid saturated markets</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Category-specific insights</div>
                      <div className="text-sm text-gray-600">Tailored to your business type</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Downloadable structured report</div>
                      <div className="text-sm text-gray-600">Export and share insights</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Saved report history</div>
                      <div className="text-sm text-gray-600">Access anytime, anywhere</div>
                    </div>
                  </li>
                </ul>

                <div className="space-y-3">
                  <Button
                    onClick={handleUnlockClick}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold shadow-lg"
                  >
                    Create free account
                  </Button>
                  <Button
                    onClick={handleUnlockClick}
                    variant="outline"
                    className="w-full h-12 border-2 text-base font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                  No credit card required for your free report
                </p>
              </Card>

              <Card className="p-6 bg-white border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Secure & private</div>
                      <div className="text-sm text-gray-600">Your data is protected</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Public data only</div>
                      <div className="text-sm text-gray-600">We only use publicly available data</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-900">
                    What's included in free vs paid?
                  </span>
                  {showComparison ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {showComparison && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="font-medium text-gray-900 mb-2">Free</div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                          Limited preview
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                          Masked insights
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="font-medium text-gray-900 mb-2">Paid</div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Full analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Full report visibility
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Advanced features
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
        isAuthenticated={resolvedAuthenticated}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
}
