import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { EmptyDashboard } from "../components/common/EmptyStates";
import {
  FileText,
  CreditCard,
  PlusCircle,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  MapPin,
  Building2,
  Download,
  Eye,
  Trash2,
  Lock,
  Calendar,
} from "lucide-react";

const mockReports = [];

export function Dashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(mockReports);
  const userPlan = "free";

  const reportsUsed = userPlan === "free" ? 1 : reports.length;
  const reportsLimit = userPlan === "free" ? 1 : null;
  const lastReport = reports.length > 0 ? reports[0] : null;

  const handleCreateReport = () => {
    navigate("/input");
  };

  const handleUpgrade = () => {
    navigate("/billing");
  };

  const handleManageBilling = () => {
    navigate("/billing");
  };

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const handleDeleteReport = (reportId) => {
    if (confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((report) => report.id !== reportId));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "complete":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-400">
            Complete
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-400">
            Processing
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-400">
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back 👋</h1>
        <p className="text-gray-600">Here's a snapshot of your market research activity.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-white border-2 border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            {userPlan === "free" && reportsUsed >= (reportsLimit || 0) && (
              <Badge className="bg-red-100 text-red-700 border-red-400">Limit reached</Badge>
            )}
          </div>
          <div className="mb-1">
            <div className="text-3xl font-bold text-gray-900">
              {userPlan === "pro" ? (
                <span className="flex items-center gap-2">
                  <span>Unlimited</span>
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </span>
              ) : (
                `${reportsUsed} / ${reportsLimit}`
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-4">Reports used</div>
          {userPlan === "free" && (
            <Button
              onClick={handleUpgrade}
              variant="outline"
              size="sm"
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Upgrade for unlimited
            </Button>
          )}
        </Card>

        <Card className="p-6 bg-white border-2 border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mb-1">
            <div className="text-3xl font-bold text-gray-900">{userPlan === "pro" ? "Pro" : "Free"}</div>
          </div>
          <div className="text-sm text-gray-600 mb-4">Current plan</div>
          {userPlan === "free" ? (
            <Button onClick={handleUpgrade} size="sm" className="w-full bg-essence hover:bg-cyan-300">
              Upgrade to Pro
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleManageBilling} variant="outline" size="sm" className="w-full">
              Manage plan
            </Button>
          )}
        </Card>

        <Card className="p-6 bg-white border-2 border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          {lastReport ? (
            <>
              <div className="mb-1">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {new Date(lastReport.createdDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">Last report generated</div>
              <div className="text-xs text-gray-500 truncate">
                {lastReport.location} • {lastReport.category}
              </div>
            </>
          ) : (
            <>
              <div className="mb-1">
                <div className="text-lg font-bold text-gray-900">—</div>
              </div>
              <div className="text-sm text-gray-600">No reports generated yet</div>
            </>
          )}
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white mb-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Create a new market report</h2>
            <p className="text-blue-100 mb-4">Use Google Places–verified locations for best results</p>
            {userPlan === "free" && reportsUsed >= (reportsLimit || 0) && (
              <p className="text-sm text-yellow-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                You've reached your monthly limit. Upgrade to create more reports.
              </p>
            )}
          </div>
          <Button
            onClick={userPlan === "free" && reportsUsed >= (reportsLimit || 0) ? handleUpgrade : handleCreateReport}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {userPlan === "free" && reportsUsed >= (reportsLimit || 0) ? "Upgrade to create" : "New report"}
          </Button>
        </div>
      </Card>

      {reports.length > 0 ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Reports</h2>
            <Badge className="bg-gray-100 text-gray-700">{reports.length} total</Badge>
          </div>

          <Card className="bg-white border-2 border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-gray-900">{report.id}</span>
                          {report.isLocked && userPlan === "free" && <Lock className="w-4 h-4 text-gray-400" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{report.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{report.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {new Date(report.createdDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          {getStatusBadge(report.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewReport(report.id)}
                            disabled={report.isLocked && userPlan === "free"}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={userPlan === "free"}
                            title={userPlan === "free" ? "Pro feature" : "Download report"}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteReport(report.id)}
                            className="text-red-600 hover:bg-red-50 border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <EmptyDashboard onCreateReport={handleCreateReport} />
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-8 bg-white border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-gray-700" />
            Billing & Subscription
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Plan</div>
              <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {userPlan === "pro" ? "Pro" : "Free"}
                {userPlan === "pro" && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-400">Active</Badge>
                )}
              </div>
            </div>

            {userPlan === "pro" && (
              <>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Renewal date</div>
                  <div className="text-lg font-semibold text-gray-900">Feb 8, 2026</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Payment method</div>
                  <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    •••• 4242
                  </div>
                </div>
              </>
            )}

            <div>
              <div className="text-sm text-gray-600 mb-1">Monthly usage reset</div>
              <div className="text-lg font-semibold text-gray-900">Feb 1, 2026</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            {userPlan === "free" ? (
              <Button onClick={handleUpgrade} className="bg-essence hover:bg-cyan-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </Button>
            ) : (
              <Button onClick={handleManageBilling} variant="outline" className="border-gray-300">
                Manage billing
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total reports</div>
              <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Member since</div>
              <div className="text-lg font-semibold text-gray-900">Jan 2026</div>
            </div>
            {userPlan === "pro" && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Reports this month</div>
                <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="px-8">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <button onClick={() => navigate("/privacy")} className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </button>
            <span className="text-gray-300">•</span>
            <button onClick={() => navigate("/terms")} className="hover:text-gray-900 transition-colors">
              Terms of Service
            </button>
            <span className="text-gray-300">•</span>
            <button onClick={() => navigate("/contact")} className="hover:text-gray-900 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
