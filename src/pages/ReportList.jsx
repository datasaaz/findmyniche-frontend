import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  MoreVertical,
  MapPin,
  Building2,
  Calendar,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  FileText,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
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

const generateMockReports = () => [
  {
    id: "RPT-001",
    location: "San Francisco, CA",
    category: "Coffee Shop",
    createdDate: "2026-01-20",
    status: "complete",
    isFavorited: true,
  },
  {
    id: "RPT-002",
    location: "Austin, TX",
    category: "Restaurant",
    createdDate: "2026-01-18",
    status: "complete",
    isFavorited: false,
  },
  {
    id: "RPT-003",
    location: "Brooklyn, NY",
    category: "Boutique",
    createdDate: "2026-01-15",
    status: "processing",
    isFavorited: false,
  },
  {
    id: "RPT-004",
    location: "Miami, FL",
    category: "Fitness Studio",
    createdDate: "2026-01-12",
    status: "complete",
    isLocked: true,
    isFavorited: false,
  },
  {
    id: "RPT-005",
    location: "Seattle, WA",
    category: "Tech Startup",
    createdDate: "2026-01-10",
    status: "failed",
    isFavorited: false,
  },
];

export function ReportList() {
  const navigate = useNavigate();
  const userPlan = "free";
  const [reports, setReports] = useState(generateMockReports());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const itemsPerPage = 10;

  const handleToggleFavorite = (reportId) => {
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? { ...report, isFavorited: !report.isFavorited }
          : report,
      ),
    );
  };

  const handleDeleteReport = () => {
    if (selectedReport) {
      setReports(reports.filter((report) => report.id !== selectedReport.id));
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
          <Badge className="bg-red-100 text-red-800 border-red-400">Failed</Badge>
        );
      default:
        return null;
    }
  };

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === "all" || report.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
      } else if (sortBy === "location") {
        comparison = a.location.localeCompare(b.location);
      } else if (sortBy === "category") {
        comparison = a.category.localeCompare(b.category);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
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
            onClick={() => navigate("/input")}
            size="lg"
            className="bg-essence hover:bg-cyan-300"
          >
            <FileText className="w-5 h-5 mr-2" />
            New Report
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by location, category, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-2 border-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                Filter: {filterStatus === "all" ? "All" : filterStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Reports
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("complete")}>
                Complete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("processing")}>
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("failed")}>
                Failed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-2 border-gray-300">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("date")}>
                Date {sortBy === "date" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("location")}>
                Location {sortBy === "location" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("category")}>
                Category {sortBy === "category" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-8">
        {paginatedReports.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first market analysis report to get started"}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <Button onClick={() => navigate("/input")} className="bg-essence hover:bg-cyan-300">
                Create New Report
              </Button>
            )}
          </Card>
        ) : (
          <>
            <Card className="bg-white border-2 border-gray-200 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                        </div>
                      </th>
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
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleFavorite(report.id)}
                            className="hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                report.isFavorited
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium text-gray-900">
                              {report.id}
                            </span>
                            {report.isLocked && userPlan === "free" && (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )}
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
                            {new Date(report.createdDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(report.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => navigate(`/report/${report.id}`)}
                              size="sm"
                              variant="outline"
                              disabled={report.status === "processing"}
                              className="border-gray-300"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>

                            <DropdownMenu>
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
                                <DropdownMenuItem onClick={() => handleToggleFavorite(report.id)}>
                                  {report.isFavorited ? "Remove from favorites" : "Add to favorites"}
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
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} reports
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-2 border-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={
                        currentPage === i + 1
                          ? "bg-essence hover:bg-cyan-300"
                          : "border-2 border-gray-300"
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-2 border-gray-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
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
