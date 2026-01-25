import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  MapPin,
  FileSearch,
  AlertTriangle,
  Lock,
  Download,
  Sparkles,
  Crown,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  FileText,
  Target,
} from "lucide-react";

export function EmptyDashboard({ onCreateReport, onSeeHowItWorks }) {
  return (
    <div className="min-h-[600px] flex items-center justify-center p-6">
      <Card className="max-w-[600px] w-full p-12 text-center bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 border-2 border-gray-200 shadow-xl">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-3xl opacity-20"></div>

            <div className="relative flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>

              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-bold text-xl">+</span>
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-6">
                <Target className="w-10 h-10 text-white" />
              </div>

              <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Find your next market opportunity.
        </h2>

        <p className="text-base text-gray-600 mb-8 max-w-[480px] mx-auto leading-relaxed">
          You haven't created any reports yet. Start by analyzing a location and
          category to uncover demand, competition, and gaps.
        </p>

        <Button
          onClick={onCreateReport}
          className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all mb-4"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Create your first report
        </Button>

        {onSeeHowItWorks && (
          <button
            onClick={onSeeHowItWorks}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center gap-1"
          >
            <PlayCircle className="w-4 h-4" />
            See how it works
          </button>
        )}
      </Card>
    </div>
  );
}

export function EmptyReportsList({ onCreateReport }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <FileSearch className="w-8 h-8 text-gray-400" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">No reports here yet</h3>

      <p className="text-sm text-gray-600 mb-6 text-center max-w-[400px]">
        Generate a new report to analyze demand, competition, and opportunities
        in a specific area.
      </p>

      <Button
        onClick={onCreateReport}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        <FileText className="w-4 h-4 mr-2" />
        New report
      </Button>
    </div>
  );
}

export function LimitedDataBanner({ onReRun, isPaidUser = false }) {
  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-sm font-bold text-amber-900 mb-1">
          Limited data available
        </h4>
        <p className="text-sm text-amber-800">
          Some data sources couldn't be collected for this location. Insights
          are based on available public data only.
        </p>
      </div>
      {isPaidUser && onReRun && (
        <Button
          onClick={onReRun}
          variant="outline"
          size="sm"
          className="border-amber-300 hover:bg-amber-100 text-amber-900 flex-shrink-0"
        >
          Re-run analysis
        </Button>
      )}
    </div>
  );
}

export function MaskedSectionEmptyState({
  onUpgrade,
  title = "Unlock deeper insights",
  description =
    "Upgrade to view detailed competitor analysis, opportunity scoring, and supporting evidence.",
}) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-60 rounded-xl"></div>

      <div className="relative bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
            <Lock className="w-7 h-7 text-white" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

        <p className="text-sm text-gray-600 mb-6 max-w-[400px] mx-auto">
          {description}
        </p>

        <Button
          onClick={onUpgrade}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
        >
          <Crown className="w-4 h-4 mr-2" />
          Upgrade to unlock
        </Button>
      </div>
    </div>
  );
}

export function QuotaReachedModal({
  isOpen,
  onClose,
  onUpgrade,
  onViewExistingReports,
  reportsUsed = 1,
  reportsLimit = 1,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            You've reached your free report limit
          </h2>

          <p className="text-base text-gray-600 mb-6 text-center">
            Upgrade to generate more reports and unlock full insights.
          </p>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Reports used
              </span>
              <span className="text-sm font-bold text-gray-900">
                {reportsUsed} / {reportsLimit}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onUpgrade}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-xl"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade plan
            </Button>

            <Button
              onClick={onViewExistingReports}
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              View existing reports
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function QuotaReachedBanner({
  onUpgrade,
  onViewExistingReports,
  reportsUsed = 1,
  reportsLimit = 1,
}) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            You've reached your free report limit
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            You've used {reportsUsed} of {reportsLimit} free reports. Upgrade to
            generate more reports and unlock full insights.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade plan
            </Button>

            <Button
              onClick={onViewExistingReports}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-white font-semibold"
            >
              View existing reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyExportState({ onExportReport }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
        <Download className="w-7 h-7 text-gray-400" />
      </div>

      <p className="text-sm text-gray-600 mb-4 text-center">
        Exports will appear here once generated.
      </p>

      <Button
        onClick={onExportReport}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        <Download className="w-4 h-4 mr-2" />
        Export report
      </Button>
    </div>
  );
}

export function GenericEmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

      <p className="text-sm text-gray-600 mb-6 max-w-[400px]">{description}</p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
