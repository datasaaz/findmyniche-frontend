import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { UpgradeModal } from "../components/common/UpgradeModal";
import {
  TrendingUp,
  ChevronRight,
  MapPin,
  Calendar,
  CheckCircle,
  Lock,
  Download,
  FileDown,
  AlertTriangle,
  Info,
  Target,
  Shield,
  Database,
  Sparkles,
  ArrowRight,
  Eye,
  Users,
  MessageSquare,
  Building2,
  Crown,
  X,
} from "lucide-react";

export function ReportDetail({
  isPaidUser = false,
  location,
  category,
  onUpgrade,
  onBack,
} = {}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(!isPaidUser);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const resolvedLocation = location || state?.location || "Cambridge, UK";
  const resolvedCategory = category || state?.category || "Coffee Shop";
  const resolvedPaid = state?.isPaidUser ?? isPaidUser;

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    if (onUpgrade) {
      onUpgrade();
      return;
    }
    navigate("/checkout", {
      state: { location: resolvedLocation, category: resolvedCategory },
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate("/dashboard");
  };

  const report = {
    id: "RPT-2026-001",
    title: `${resolvedCategory} Market Analysis — ${resolvedLocation}`,
    radius: "500m",
    generatedDate: "January 8, 2026",
    status: "complete",
    dataSources: [
      { name: "Google Maps", icon: "🗺️" },
      { name: "Yelp", icon: "⭐" },
      { name: "Public Web", icon: "🌐" },
    ],
    verdict: {
      type: "opportunity",
      confidence: 78,
      summary:
        "This market shows promising potential with moderate competition and identifiable gaps. The area has good foot traffic and demographic alignment, though some entry barriers exist.",
      keyReasons: [
        "3 clear market gaps identified in adjacent categories",
        "Above-average consumer spending in the area",
        "Limited direct competition within 500m radius",
        "Strong demographic match for target audience",
      ],
    },
    marketGaps: [
      {
        category: "Premium Coffee & Pastry",
        opportunity: "high",
        rationale:
          "Only one basic café exists within the radius. Local demographics show high income levels and preference for specialty coffee. Instagram activity suggests demand for photo-worthy café spaces.",
        signals: {
          competitors: 1,
          reviewMentions: 247,
          registeredCompanies: 3,
        },
      },
      {
        category: "Healthy Fast Casual",
        opportunity: "high",
        rationale:
          "No health-focused quick-service restaurants in the area. Nearby gyms and yoga studios indicate health-conscious population. Lunch hour analysis shows people leaving the area to find healthy options.",
        signals: {
          competitors: 0,
          reviewMentions: 189,
          registeredCompanies: 1,
        },
      },
      {
        category: "Artisan Bakery",
        opportunity: "medium",
        rationale:
          "Two traditional bakeries exist but none focus on artisan/sourdough offerings. Social media analysis shows residents traveling to other districts for specialty bread.",
        signals: {
          competitors: 2,
          reviewMentions: 156,
          registeredCompanies: 4,
        },
      },
    ],
    risks: [
      {
        category: "High Commercial Rent",
        level: "high",
        reasons:
          "Average rent in this district is €45/sqm, 30% above city average. Several businesses have closed in the past year citing high overhead costs.",
      },
      {
        category: "Seasonal Tourism Impact",
        level: "medium",
        reasons:
          "Foot traffic drops 40% during off-season months (Nov-Feb). Businesses report significant revenue fluctuations requiring careful cash flow management.",
      },
      {
        category: "Licensing Requirements",
        level: "low",
        reasons:
          "Standard food service licensing applies. Processing time is typically 6-8 weeks. No special restrictions identified for this category.",
      },
    ],
    dataSummary: {
      googleMapsPlaces: 127,
      yelpPlaces: 89,
      reviewSources: 5,
      sitesScraped: 234,
    },
    confidence: {
      limitations: [
        "Analysis based on publicly available data only",
        "Real-time customer interview data not included",
        "Exact revenue figures for competitors unavailable",
        "Some businesses may not have online presence",
      ],
      methodology:
        "This report combines data from multiple sources including business directories, review platforms, social media sentiment, and demographic databases. Confidence scores reflect data completeness and consistency across sources.",
    },
  };

  const getVerdictColor = (type) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800 border-green-200";
      case "neutral":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "risk":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getOpportunityColor = (level) => {
    switch (level) {
      case "high":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">findmyniche</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <button onClick={handleBack} className="hover:text-gray-900">
                  Dashboard
                </button>
                <ChevronRight className="w-4 h-4" />
                <button onClick={handleBack} className="hover:text-gray-900">
                  Reports
                </button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{report.id}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={
                  resolvedPaid
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-900 border-amber-200 gap-1"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }
              >
                {resolvedPaid && <Crown className="w-3 h-3" />}
                {resolvedPaid ? "Pro" : "Free"} Plan
              </Badge>

              {resolvedPaid ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileDown className="w-4 h-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
                </div>
              ) : (
                <Button onClick={handleUpgradeClick} className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <Card className="p-8 mb-6 bg-gradient-to-br from-white to-gray-50 border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">{report.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{resolvedCategory}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {resolvedLocation} ({report.radius})
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{report.generatedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-medium">Data sources:</span>
                {report.dataSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-xs text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200"
                  >
                    <span>{source.icon}</span>
                    <span>{source.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Badge className="bg-green-100 text-green-700 border-green-200 gap-1.5">
              <CheckCircle className="w-3 h-3" />
              Complete
            </Badge>
          </div>
        </Card>

        <Card className="p-8 mb-6 bg-white border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Executive Verdict</h2>
              <p className="text-sm text-gray-600">Overall market assessment</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Badge className={`${getVerdictColor(report.verdict.type)} capitalize text-sm px-3 py-1`}>
              {report.verdict.type}
            </Badge>
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-600">Confidence Score</span>
                <span className="font-semibold text-gray-900">{report.verdict.confidence}%</span>
              </div>
              <Progress value={report.verdict.confidence} className="h-2" />
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{report.verdict.summary}</p>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Reasons</h3>
            <div className="space-y-2">
              {report.verdict.keyReasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-6 bg-white border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Market Gaps & Opportunities</h2>
                <p className="text-sm text-gray-600">Identified business opportunities in this area</p>
              </div>
            </div>
            {!resolvedPaid && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5">
                <Lock className="w-3 h-3" />
                Partially Locked
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {report.marketGaps.map((gap, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`p-5 rounded-lg border-2 ${
                    gap.opportunity === "high"
                      ? "bg-green-50 border-green-200"
                      : gap.opportunity === "medium"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{gap.category}</h3>
                    <Badge className={`${getOpportunityColor(gap.opportunity)} capitalize`}>
                      {gap.opportunity} Opportunity
                    </Badge>
                  </div>

                  <div className={!resolvedPaid ? "relative" : ""}>
                    {!resolvedPaid && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 mx-auto border-2 border-blue-200">
                            <Lock className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Unlock detailed analysis</p>
                          <button onClick={handleUpgradeClick} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            Upgrade to Pro →
                          </button>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-gray-700 leading-relaxed mb-4">{gap.rationale}</p>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{resolvedPaid ? gap.signals.competitors : "—"}</span>
                        <span>Competitors</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">{resolvedPaid ? gap.signals.reviewMentions : "—"}</span>
                        <span>Review Mentions</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{resolvedPaid ? gap.signals.registeredCompanies : "—"}</span>
                        <span>Registered Companies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!resolvedPaid && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 text-center">
                <Lock className="w-4 h-4 inline mr-2" />
                Upgrade to unlock complete market gap analysis with detailed rationale and data signals
              </p>
            </div>
          )}
        </Card>

        <Card className="p-8 mb-6 bg-white border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Risk Warnings</h2>
                <p className="text-sm text-gray-600">Potential challenges to consider</p>
              </div>
            </div>
            {!resolvedPaid && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5">
                <Lock className="w-3 h-3" />
                Partially Locked
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {report.risks.map((risk, idx) => (
              <div key={idx} className="relative">
                <div className="p-5 rounded-lg border-2 bg-gray-50 border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">{risk.category}</h3>
                    <Badge className={`${getRiskColor(risk.level)} capitalize`}>
                      {risk.level} Risk
                    </Badge>
                  </div>

                  <div className={!resolvedPaid ? "relative min-h-[60px]" : ""}>
                    {!resolvedPaid && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-600">Upgrade to view</p>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-gray-700 leading-relaxed">{risk.reasons}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!resolvedPaid && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 text-center">
                <Lock className="w-4 h-4 inline mr-2" />
                Upgrade to see detailed risk analysis and mitigation strategies
              </p>
            </div>
          )}
        </Card>

        <Card className="p-8 mb-6 bg-white border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Confidence & Data Limits</h2>
              <p className="text-sm text-gray-600">Understanding the analysis methodology</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Methodology</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{report.confidence.methodology}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Known Limitations</h3>
            <div className="space-y-2">
              {report.confidence.limitations.map((limitation, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="w-3 h-3 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-700">{limitation}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-white border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Data Summary</h2>
              <p className="text-sm text-gray-600">Sources analyzed for this report</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{report.dataSummary.googleMapsPlaces}</div>
              <div className="text-xs text-gray-600">Google Maps Places</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{report.dataSummary.yelpPlaces}</div>
              <div className="text-xs text-gray-600">Yelp Places</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{report.dataSummary.reviewSources}</div>
              <div className="text-xs text-gray-600">Review Sources</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{report.dataSummary.sitesScraped}</div>
              <div className="text-xs text-gray-600">Sites Analyzed</div>
            </div>
          </div>
        </Card>
      </div>

      {!resolvedPaid && showUpgradeBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 border-t border-blue-700 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Unlock the Full Report</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      <span>See full market gaps</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4" />
                      <span>Access detailed risk analysis</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Download className="w-4 h-4" />
                      <span>Download report</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="w-4 h-4" />
                      <span>Unlimited reports</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleUpgradeClick}
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  View Pricing
                </Button>
                <Button onClick={handleUpgradeClick} className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <button onClick={() => setShowUpgradeBanner(false)} className="text-white/70 hover:text-white p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} onUpgrade={handleUpgrade} />
    </div>
  );
}
