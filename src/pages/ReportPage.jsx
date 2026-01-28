import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Target,
  MapPin,
  TrendingUp,
  Lock,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Building2,
  Star,
  Download,
  Check,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const competitorData = [
  { name: "Excellent (4.5+)", count: 12, color: "#10b981" },
  { name: "Good (4.0-4.4)", count: 28, color: "#3b82f6" },
  { name: "Average (3.5-3.9)", count: 31, color: "#f59e0b" },
  { name: "Poor (<3.5)", count: 9, color: "#ef4444" },
];

const marketGaps = [
  {
    category: "Premium / Fine Dining",
    level: "High",
    levelColor: "green",
    signals: { demand: 87, supply: 23 },
    rationale:
      "Only 3 high-end restaurants found despite strong demand signals from customer reviews. Upper-income demographic shows willingness to pay premium prices. Competitor reviews frequently mention 'lack of upscale options' and 'need to travel to city center for fine dining'.",
  },
  {
    category: "Late-night Service",
    level: "High",
    levelColor: "green",
    signals: { demand: 78, supply: 12 },
    rationale:
      "Multiple reviews requesting later hours. No restaurants open past 10 PM in the area. Night shift workers and students represent underserved segment with consistent demand patterns.",
  },
  {
    category: "Family-friendly Options",
    level: "Medium",
    levelColor: "yellow",
    signals: { demand: 65, supply: 41 },
    rationale:
      "Growing demand based on review mentions of kids' menus and family seating. Limited dedicated family restaurants with play areas or children's entertainment.",
  },
  {
    category: "Vegetarian / Vegan Focus",
    level: "Medium",
    levelColor: "yellow",
    signals: { demand: 72, supply: 38 },
    rationale:
      "Plant-based dining mentions increasing in reviews. Current offerings are limited to side dishes at traditional restaurants rather than dedicated plant-based establishments.",
  },
];

const riskWarnings = [
  {
    category: "High Competition",
    level: "Medium",
    reasons: [
      "80 existing businesses in 500m radius indicates saturation",
      "Average rating of 4.1 shows established quality standards",
      "Top competitors have strong review volumes (500+ reviews)",
    ],
  },
  {
    category: "Market Maturity",
    level: "Low",
    reasons: [
      "Established market with mature competitors",
      "Customer loyalty patterns visible in review data",
    ],
  },
];

export function ReportPage({ location, category, onBack, onUpgrade } = {}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showRiskTooltip, setShowRiskTooltip] = useState(false);

  const resolvedLocation = location || state?.location || "Cambridge, UK";
  const resolvedCategory = category || state?.category || "Restaurant";

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate("/");
  };

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
      return;
    }
    navigate("/checkout", {
      state: { location: resolvedLocation, category: resolvedCategory },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={handleBack} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">findmyniche</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-gray-500">Preview</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">Report</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                Free report (limited)
              </Badge>
              <Button onClick={handleUpgrade} className="bg-essence hover:bg-cyan-300 gap-2">
                Unlock full report
                <Lock className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Market Opportunity Report
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg">
              <Building2 className="w-4 h-4 text-purple-700" />
              <span className="text-sm font-medium text-purple-900">{resolvedCategory}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span className="text-sm font-medium text-blue-900">{resolvedLocation}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
              <Target className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-900">Radius: 500m</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-600">Data sources:</span>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Google Maps</span>
              </div>
              <div className="px-3 py-1 bg-white border border-gray-200 rounded-md flex items-center gap-2">
                <Star className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Yelp</span>
              </div>
            </div>
          </div>

          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-700" />
                  <h3 className="font-semibold text-gray-900">Confidence Score</h3>
                  <button
                    className="relative"
                    onMouseEnter={() => setShowRiskTooltip(true)}
                    onMouseLeave={() => setShowRiskTooltip(false)}
                  >
                    <Info className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    {showRiskTooltip && (
                      <div className="absolute left-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                        Limited due to missing premium data sources. Upgrade for higher confidence analysis.
                      </div>
                    )}
                  </button>
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: "55%" }}></div>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">0.55</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Limited due to missing premium data sources
                </p>
              </div>
            </div>
          </Card>
        </div>

        <section className="mb-12">
          <Card className="p-8 border-2 border-blue-200 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-essence rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              Executive Verdict
            </h2>

            <div className="mb-6">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-400 text-base px-4 py-1">
                Neutral
              </Badge>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                The {resolvedCategory.toLowerCase()} market in {resolvedLocation} shows{" "}
                <strong>moderate opportunity with mixed signals</strong>. While competition is present
                (80 businesses in 500m), several underserved niches exist, particularly in premium
                dining and late-night service. Success will depend on clear differentiation and
                targeting specific market gaps.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Reasons:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-essence rounded-full mt-2"></div>
                  <span className="text-gray-700">Moderate competition with average ratings of 4.1/5.0</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-essence rounded-full mt-2"></div>
                  <span className="text-gray-700">High-opportunity gaps identified in premium and late-night segments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-essence rounded-full mt-2"></div>
                  <span className="text-gray-700">Customer reviews indicate unmet demand in specific categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-essence rounded-full mt-2"></div>
                  <span className="text-gray-700">Market maturity suggests established customer base but limited innovation</span>
                </li>
              </ul>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Snapshot</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-6 bg-white border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">80</div>
              <div className="text-sm text-gray-600">Businesses found</div>
            </Card>
            <Card className="p-6 bg-white border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">10</div>
              <div className="text-sm text-gray-600">Reviewed locations</div>
            </Card>
            <Card className="p-6 bg-white border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">Sites analyzed</div>
            </Card>
          </div>

          <Card className="p-8 bg-white border-2 border-gray-300 relative overflow-hidden">
            <h3 className="font-semibold text-gray-900 mb-6">Competitive Breakdown by Rating</h3>

            <div className="blur-sm select-none opacity-60">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {competitorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <div className="text-center px-6">
                <div className="w-14 h-14 bg-essence rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Detailed competitive breakdown available in full report
                </h3>
                <Button onClick={handleUpgrade} className="bg-essence hover:bg-cyan-300 mt-3">
                  Unlock chart
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Identified Market Gaps</h2>

          <div className="space-y-4">
            {marketGaps.map((gap, index) => (
              <Card key={index} className="p-6 bg-white border-2 border-gray-200 relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{gap.category}</h3>
                    <Badge
                      className={
                        gap.levelColor === "green"
                          ? "bg-green-100 text-green-800 border-green-400"
                          : "bg-yellow-100 text-yellow-800 border-yellow-400"
                      }
                    >
                      {gap.level} Opportunity
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Demand</div>
                      <div className="text-2xl font-bold text-green-600">{gap.signals.demand}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Supply</div>
                      <div className="text-2xl font-bold text-blue-600">{gap.signals.supply}</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="blur-md select-none mb-4">
                    <p className="text-gray-700">{gap.rationale}</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-700">Unlock full rationale and evidence</span>
                      <Button size="sm" onClick={handleUpgrade} className="bg-essence hover:bg-cyan-300">
                        Unlock
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Card className="p-8 border-2 border-red-200 bg-red-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              Key Risks
            </h2>

            <div className="space-y-6">
              {riskWarnings.map((risk, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-gray-900">{risk.category}</h3>
                    <Badge
                      className={
                        risk.level === "High"
                          ? "bg-red-100 text-red-800 border-red-400"
                          : risk.level === "Medium"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-400"
                          : "bg-green-100 text-green-800 border-green-400"
                      }
                    >
                      {risk.level} Risk
                    </Badge>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{risk.reasons[0]}</span>
                    </li>

                    {risk.reasons.slice(1).map((reason, reasonIndex) => (
                      <li key={reasonIndex} className="flex items-start gap-3 blur-sm select-none opacity-50">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>

                  {risk.reasons.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUpgrade}
                      className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
                    >
                      See full risk analysis
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-8 border-2 border-gray-300 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              Confidence & Data Limitations
            </h2>

            <div className="prose max-w-none space-y-4 text-gray-700">
              <p>
                This report is based on <strong>publicly available data sources</strong> including Google Maps and Yelp.
                The confidence score of <strong>0.55</strong> reflects the following limitations:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Missing proprietary data:</strong> Premium plans include access to business registration databases,
                    foot traffic analytics, and demographic overlays which significantly improve accuracy.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Limited review coverage:</strong> Only 10 out of 80 businesses have substantial review data,
                    making sentiment analysis incomplete.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>No website analysis:</strong> Competitor website content, pricing, and online presence data
                    are not included in free reports.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Historical trends unavailable:</strong> Time-series analysis of market changes requires
                    premium data sources.
                  </span>
                </li>
              </ul>

              <p className="pt-4 border-t border-gray-300">
                <strong>Why this matters:</strong> Upgrading to a paid plan increases confidence scores to 0.85+ by incorporating
                multiple additional data sources, providing more reliable insights for business decisions.
              </p>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-12 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 text-center">
            <div className="max-w-lg mx-auto">
              <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Evidence & Sources</h2>
              <p className="text-gray-700 mb-6">
                Detailed data sources, review signals, and raw evidence supporting this analysis are available
                in the full report. This includes competitor lists, review excerpts, and data provenance documentation.
              </p>
              <Button onClick={handleUpgrade} size="lg" className="bg-essence hover:bg-cyan-300">
                <Lock className="w-5 h-5 mr-2" />
                Unlock to view evidence
              </Button>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-lg">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-essence rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Unlock the full report</h2>
              <p className="text-lg text-gray-700 mb-8">
                Get complete access to all insights, evidence, and advanced features
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Full market gap rationales</div>
                    <div className="text-sm text-gray-600">See complete evidence and reasoning</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Complete risk analysis</div>
                    <div className="text-sm text-gray-600">All risk factors and mitigation strategies</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Evidence & source transparency</div>
                    <div className="text-sm text-gray-600">Full data provenance and citations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Saved reports & exports</div>
                    <div className="text-sm text-gray-600">Download PDF and access anytime</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" onClick={handleUpgrade} className="bg-essence hover:bg-cyan-300 text-lg px-8">
                  Upgrade to unlock full access
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleUpgrade} className="border-2 text-lg px-8">
                  View plans
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-6">
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
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
