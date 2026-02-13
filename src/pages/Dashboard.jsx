import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  FileText,
  CreditCard,
  PlusCircle,
  TrendingUp,
  Sparkles,
  Clock,
  ChevronRight,
  MapPin,
  Building2,
  Eye,
  Calendar,
} from "lucide-react";
import { GlobalLoader } from "../components/common/GlobalLoader";
import { getDashboard } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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

function UsageDonut({ used, allocated, isUnlimited }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const safeUsed = used || 0;
  const safeAllocated = allocated || 0;
  const percentage = isUnlimited
    ? 100
    : safeAllocated > 0
      ? Math.round((safeUsed / safeAllocated) * 100)
      : 0;
  const remaining = 100 - percentage;

  const data = [
    { name: "Used", value: percentage || 1 },
    { name: "Remaining", value: remaining || 0 },
  ];
  const COLORS = ["#4f46e5", "#e0e7ff"];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={78}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              onMouseEnter={(_, idx) => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  fillOpacity={activeIndex === null ? 1 : index === activeIndex ? 1 : 0.35}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">
            {isUnlimited ? "∞" : `${percentage}%`}
          </span>
        </div>
      </div>
      <div className="flex gap-6 mt-3">
        <div className="text-center">
          <div className="text-xs text-gray-500">Used</div>
          <div className="text-sm font-bold text-gray-900">{safeUsed}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Allocated</div>
          <div className="text-sm font-bold text-gray-900">
            {isUnlimited ? "∞" : safeAllocated}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const plan = dashboardData?.plan || "free";
  const isPro = plan === "paid";
  const totalReports = dashboardData?.total_reports || 0;
  const pendingReports = dashboardData?.pending_reports || 0;
  const usage = dashboardData?.usage || {};
  const usedReports = usage.used || 0;
  const allocatedReports = usage.allocated || 0;
  const isUnlimited = usage.is_unlimited || false;
  const billing = dashboardData?.billing || {};
  const recentReports = dashboardData?.recent_reports || [];
  const memberSince = dashboardData?.member_since
    ? new Date(dashboardData.member_since).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";
  const periodEnd = usage.period_end
    ? new Date(usage.period_end).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const handleCreateReport = () => navigate("/create-report");
  const handleUpgrade = () => navigate("/billing");
  const handleManageBilling = () => navigate("/billing");

  if (isLoading) {
    return <GlobalLoader containerClassName="min-h-[70vh]" spinnerClassName="text-essence" />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back 👋</h1>
        <p className="text-sm text-gray-500">Here's a snapshot of your market research activity.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {/* Total Reports */}
        <Card className="p-6 bg-white border border-gray-200 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-500 mb-1">Total Reports</p>
                <div className="text-2xl font-bold text-gray-900 leading-none">{totalReports}</div>
                <p className="text-[14px] text-gray-400 mt-2 font-medium">All time</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-md text-[11px] font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>+0%</span>
            </div> */}
          </div>
        </Card>

        {/* Pending Reports */}
        <Card className="p-6 bg-white border border-gray-200 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-500 mb-1">Pending Reports</p>
                <div className="text-2xl font-bold text-gray-900 leading-none">{pendingReports}</div>
                <p className="text-[14px] text-gray-400 mt-2 font-medium">In progress</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Plan */}
        <Card className="p-6 bg-white border border-gray-200 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-500 mb-1">Current Plan</p>
                <div className="text-2xl font-bold text-gray-900 leading-none flex items-center gap-2">
                  {isPro ? "Pro" : "Free"}
                  {isPro && <Sparkles className="w-5 h-5 text-yellow-500" />}
                </div>
                <div className="mt-2">
                  {isPro ? (
                    <button onClick={handleManageBilling} className="text-[14px] text-blue-600 font-medium hover:underline">Manage plan</button>
                  ) : (
                    <button onClick={handleUpgrade} className="text-[14px] text-blue-600 font-medium hover:underline">Upgrade to Pro</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Member Since */}
        <Card className="p-6 bg-white border border-gray-200 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-500 mb-1">Member Since</p>
                <div className="text-2xl font-bold text-gray-900 leading-none truncate max-w-[120px]">{memberSince}</div>
                <p className="text-[14px] text-gray-400 mt-2 font-medium">Resets {periodEnd}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Reports Table + Donut ── */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="col-span-3 bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
            {recentReports.length > 0 && (
              <Button onClick={() => navigate("/reports")} variant="outline" size="sm" className="border-gray-300 text-xs">
                View all
              </Button>
            )}
          </div>
          {recentReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Report ID</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentReports.map((report) => (
                    <tr key={report.report_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span className="font-mono text-sm font-medium text-gray-900">{report.report_id}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{report.location || "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{report.category || "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {report.created_at
                            ? new Date(report.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-right">
                        <Button
                          onClick={() => navigate(`/report/${report.report_id}`)}
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 pb-5">
              <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Create a new market report</h3>
                    <p className="text-blue-100 text-sm">Use Google Places–verified locations for best results</p>
                  </div>
                  <Button
                    onClick={handleCreateReport}
                    size="sm"
                    className="bg-white text-blue-600 hover:bg-blue-50 shadow"
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    New report
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </Card>

        {/* Donut Chart Card */}
        <Card className="col-span-1 p-5 bg-white border border-gray-200 rounded-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Usage</h3>
          <UsageDonut
            used={usedReports}
            allocated={allocatedReports}
            isUnlimited={isUnlimited}
          />
          {!isPro && (
            <Button
              onClick={handleUpgrade}
              variant="outline"
              size="sm"
              className="w-full mt-4 border-blue-300 text-blue-700 hover:bg-blue-50 text-xs"
            >
              Upgrade for unlimited
            </Button>
          )}
        </Card>
      </div>

      {/* ── Billing & Quick Stats ── */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="md:col-span-4 p-6 bg-white border border-gray-200 rounded-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-600" />
            Billing & Subscription
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Plan</div>
              <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {isPro ? "Pro" : "Free"}
                {isPro && <Badge className="bg-blue-100 text-blue-700 border-blue-400 text-[10px]">Active</Badge>}
              </div>
            </div>

            {isPro && (
              <>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Next billing</div>
                  <div className="text-base font-semibold text-gray-900">
                    {billing.next_billing_date
                      ? new Date(billing.next_billing_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Payment method</div>
                  <div className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    {billing.payment_method || "—"}
                  </div>
                </div>
              </>
            )}

            <div>
              <div className="text-xs text-gray-500 mb-0.5">Usage resets</div>
              <div className="text-base font-semibold text-gray-900">{periodEnd}</div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-200">
            {!isPro ? (
              <Button onClick={handleUpgrade} size="sm" className="bg-essence hover:bg-cyan-300">
                <Sparkles className="w-4 h-4 mr-1" />
                Upgrade to Pro
              </Button>
            ) : (
              <Button onClick={handleManageBilling} variant="outline" size="sm" className="border-gray-300">
                Manage billing
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </Card>

        {/* <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Total reports</div>
              <div className="text-xl font-bold text-gray-900">{totalReports}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Member since</div>
              <div className="text-base font-semibold text-gray-900">{memberSince}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Reports this period</div>
              <div className="text-xl font-bold text-gray-900">{usedReports}</div>
            </div>
          </div>
        </Card> */}
      </div>

      <footer className="bg-white border-t border-gray-200 py-5 mt-10">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
          <button onClick={() => navigate("/privacy")} className="hover:text-gray-700 transition-colors">
            Privacy Policy
          </button>
          <span className="text-gray-300">•</span>
          <button onClick={() => navigate("/terms")} className="hover:text-gray-700 transition-colors">
            Terms of Service
          </button>
          <span className="text-gray-300">•</span>
          <button onClick={() => navigate("/support")} className="hover:text-gray-700 transition-colors">
            Contact Support
          </button>
        </div>
      </footer>
    </div>
  );
}
