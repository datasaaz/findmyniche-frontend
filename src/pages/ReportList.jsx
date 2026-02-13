import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Eye,
  MoreVertical,
  MapPin,
  Building2,
  Calendar,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  DeleteReportModal,
  RenameReportModal,
  ShareReportModal,
} from "../components/common/ReportManagement";
import { GlobalLoader } from "../components/common/GlobalLoader";
import { useQuery } from "@tanstack/react-query";
import { getReportList } from "../utils/api";

export function ReportList() {
  const navigate = useNavigate();
  const userPlan = "free";
  const [selectedReport, setSelectedReport] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { data: reportListData, isLoading } = useQuery({
    queryKey: ["report-list"],
    queryFn: getReportList,
    staleTime: 2 * 60 * 1000,
  });

  const reports = useMemo(() => {
    const apiReports = Array.isArray(reportListData?.reports) ? reportListData.reports : [];
    return apiReports.map((report) => ({
      id: report.report_id,
      location: report.location,
      category: report.category,
      createdAt: report.created_at,
      plan: report.plan,
    }));
  }, [reportListData]);

  const handleDeleteReport = () => {
    if (selectedReport) {
      console.log("Delete report:", selectedReport.id);
      setDeleteModalOpen(false);
      setSelectedReport(null);
    }
  };

  const handleRenameReport = (newTitle) => {
    console.log("Rename report to:", newTitle);
    setRenameModalOpen(false);
    setSelectedReport(null);
  };

  const handleGenerateShareLink = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `https://findmyniche.com/reports/shared/${selectedReport?.id}`;
  };

  const handleSendEmail = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Email sent to:", email);
  };

  const getPlanBadge = (plan) => {
    const normalizedPlan = (plan || "free").toLowerCase();
    if (normalizedPlan === "paid") {
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-400">Paid</Badge>;
    }

    return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Free</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Reports</h1>
            <p className="text-gray-600">
              View and manage all your market analysis reports
            </p>
          </div>
          <Button
            onClick={() => navigate("/create-report")}
            size="lg"
            className="bg-essence hover:bg-cyan-300"
          >
            <FileText className="w-5 h-5 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="p-8">
        {isLoading ? (
          <GlobalLoader containerClassName="min-h-[55vh]" spinnerClassName="text-essence" />
        ) : reports.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No reports created</h3>
            <p className="text-gray-600 mb-6">
              Create your first market analysis report to get started
            </p>
            <Button onClick={() => navigate("/create-report")} className="bg-essence hover:bg-cyan-300">
              Create New Report
            </Button>
          </Card>
        ) : (
          <Card className="bg-white border-2 border-gray-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
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
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.report_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900">{report.report_id}</p>
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
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(report.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPlanBadge(report.plan)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => navigate(`/report/${report.report_id}`)}
                              size="sm"
                              variant="outline"
                              className="border-gray-300"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>

                            {/* <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="border-gray-300">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedReport(report);
                                    setRenameModalOpen(true);
                                  }}
                                >
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedReport(report);
                                    setShareModalOpen(true);
                                  }}
                                >
                                  Share {userPlan === "free" && "🔒"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    setSelectedReport(report);
                                    setDeleteModalOpen(true);
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
        )}
      </div>

      {selectedReport && (
        <>
          <DeleteReportModal
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setSelectedReport(null);
            }}
            onConfirm={handleDeleteReport}
            reportTitle={`${selectedReport.location} - ${selectedReport.category}`}
            isPermanent={true}
          />

          <RenameReportModal
            isOpen={renameModalOpen}
            onClose={() => {
              setRenameModalOpen(false);
              setSelectedReport(null);
            }}
            onSave={handleRenameReport}
            currentTitle={`${selectedReport.location} - ${selectedReport.category}`}
          />

          <ShareReportModal
            isOpen={shareModalOpen}
            onClose={() => {
              setShareModalOpen(false);
              setSelectedReport(null);
            }}
            onGenerateLink={handleGenerateShareLink}
            onSendEmail={handleSendEmail}
            reportTitle={`${selectedReport.location} - ${selectedReport.category}`}
            userPlan={userPlan}
            onUpgrade={() => navigate("/billing/upgrade")}
          />
        </>
      )}
    </div>
  );
}
