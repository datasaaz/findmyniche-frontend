import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  TrendingUp,
  CheckCircle,
  Sparkles,
  FileText,
  ArrowRight,
  Mail,
} from "lucide-react";

export function PaymentSuccess({ onViewReport, onGoToDashboard, userEmail = "user@example.com", monthlyPrice = "€29" } = {}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const resolvedEmail = state?.userEmail || userEmail;
  const resolvedPrice = state?.monthlyPrice || monthlyPrice;

  const handleViewReport = () => {
    if (onViewReport) {
      onViewReport();
      return;
    }
    navigate("/report/detail", { state: { isPaidUser: true } });
  };

  const handleGoToDashboard = () => {
    if (onGoToDashboard) {
      onGoToDashboard();
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex flex-col">
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
        <div className="max-w-[600px] w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Pro! 🎉</h1>
            <p className="text-lg text-gray-600 mb-2">Your subscription is now active</p>
            <p className="text-sm text-gray-500">Payment confirmed • Full access unlocked</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Subscription</span>
                <span className="text-sm font-bold text-gray-900">Pro Plan</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Billing</span>
                <span className="text-sm font-bold text-gray-900">{resolvedPrice}/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-green-600">Active</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">What's unlocked</h3>
              <div className="space-y-3">
                {[
                  "Full market reports with no limitations",
                  "Complete insights & analysis now visible",
                  "Export to PDF enabled",
                  "Unlimited report generation ready to use",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">{item}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Receipt sent to {resolvedEmail}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">Check your inbox for payment confirmation and invoice</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleViewReport}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <FileText className="w-5 h-5 mr-2" />
              View Your Full Report
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={handleGoToDashboard}
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-semibold transition-all"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
