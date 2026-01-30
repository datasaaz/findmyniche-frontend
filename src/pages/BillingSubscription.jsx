import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import {
  Target,
  Check,
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  Zap,
  RotateCcw,
  Eye,
  EyeOff,
  FileText,
  Database,
  Download,
  AlertCircle,
  ChevronRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

export function BillingSubscription({ onBack, onUpgradeSuccess } = {}) {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [email, setEmail] = useState("user@example.com");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const processingSteps = [
    "Validating payment information...",
    "Processing payment securely...",
    "Creating your Pro account...",
    "Unlocking premium features...",
    "Finalizing upgrade...",
  ];

  const handleUpgrade = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    setProgress(0);

    let currentStep = 0;
    let currentProgress = 0;

    const stepInterval = setInterval(() => {
      currentStep += 1;
      currentProgress += 20;

      setProcessingStep(currentStep);
      setProgress(currentProgress);

      if (currentStep >= processingSteps.length) {
        clearInterval(stepInterval);
        setTimeout(() => {
          setIsProcessing(false);
          if (onUpgradeSuccess) {
            onUpgradeSuccess();
          } else {
            navigate("/payment-success");
          }
        }, 800);
      }
    }, 1000);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">findmyniche</span>
              </div>

              <Button variant="ghost" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to report
              </Button>
            </div>

            <Badge className="bg-gray-100 text-gray-700 border-gray-300">Free plan</Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock the full market opportunity report
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upgrade to access complete insights, evidence, and advanced analysis for your selected location and category.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 border-2 border-gray-300 bg-white relative">
            <div className="mb-6">
              <Badge className="bg-gray-200 text-gray-700 border-gray-400 mb-3">Current plan</Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">€0</span>
                <span className="text-gray-600 ml-2">/ month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">1 report per month</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">High-level executive verdict</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Basic market gaps overview</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Limited confidence score (0.55)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Masked rationales & evidence</span>
              </li>
            </ul>

            <Button disabled className="w-full bg-gray-200 text-gray-500 cursor-not-allowed">
              You're on this plan
            </Button>
          </Card>

          <Card className="p-8 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-essence text-white border-blue-700 shadow-md">Most popular</Badge>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">€29</span>
                <span className="text-gray-600 ml-2">/ month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Unlimited reports",
                "Full market gap rationales",
                "Complete risk analysis",
                "Evidence & data sources",
                "Website & digital signals",
                "Save & revisit reports",
                "Export (PDF / CSV)",
                "Higher confidence score (0.85+)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-900 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setSelectedPlan("pro")}
              className="w-full bg-essence hover:bg-cyan-300 h-12 text-base font-semibold shadow-lg"
            >
              Upgrade & unlock full report
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            What unlocks instantly
          </h2>

          <p className="text-gray-700 mb-6">After upgrading, you immediately get:</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">All masked sections revealed</div>
                <div className="text-sm text-gray-600">See every blurred insight instantly</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Full reasoning behind each market gap</div>
                <div className="text-sm text-gray-600">Complete rationales with evidence</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Evidence appendix & data transparency</div>
                <div className="text-sm text-gray-600">Full source citations and raw data</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <AlertCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Higher confidence scoring</div>
                <div className="text-sm text-gray-600">Boost from 0.55 to 0.85+</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Access to saved reports dashboard</div>
                <div className="text-sm text-gray-600">Store and revisit all your reports</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-green-300">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <EyeOff className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-700">Before (Free)</span>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 blur-sm">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">After (Pro)</span>
              </div>
              <div className="bg-white border-2 border-green-500 rounded-lg p-6 shadow-md">
                <div className="h-4 bg-green-600 rounded mb-2"></div>
                <div className="h-4 bg-green-500 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 p-8 bg-white border-2 border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-700" />
              Payment information
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                  Card number
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="h-12 pr-24"
                    maxLength={19}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                      <rect width="32" height="20" rx="3" fill="#1434CB" />
                      <rect x="11" y="6" width="10" height="8" rx="1" fill="#FFF" />
                    </svg>
                    <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                      <rect width="32" height="20" rx="3" fill="#EB001B" />
                      <rect x="12" y="4" width="8" height="12" rx="4" fill="#F79E1B" fillOpacity="0.8" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-sm font-medium text-gray-700 mb-2 block">
                    Expiry date
                  </Label>
                  <Input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-sm font-medium text-gray-700 mb-2 block">
                    CVC
                  </Label>
                  <Input
                    id="cvc"
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123"
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2 block">
                  Country or region
                </Label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-12 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select country</option>
                  <option value="Austria">Austria</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Ireland">Ireland</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Secure checkout</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secure processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Cancel anytime</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan summary</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span>Plan</span>
                  <span className="font-medium">Pro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Billing</span>
                  <span className="font-medium">€29 / month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access</span>
                  <span className="font-medium">Instant</span>
                </div>
              </div>
            </Card>

            <Button onClick={handleUpgrade} className="w-full h-12 bg-essence hover:bg-cyan-300 text-base font-semibold shadow-lg">
              Upgrade now
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isProcessing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Processing your upgrade</DialogTitle>
            <DialogDescription>
              Please keep this window open while we complete your upgrade.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <p className="text-sm text-gray-700">{processingSteps[processingStep] || "Finalizing upgrade..."}</p>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-gray-500">
              Step {Math.min(processingStep + 1, processingSteps.length)} of {processingSteps.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
