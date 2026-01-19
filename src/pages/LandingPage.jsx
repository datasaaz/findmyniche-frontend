import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { MapPin, Search, TrendingUp, Map, BarChart3, Target, Shield, Users, Briefcase, LineChart, AlertTriangle, Lock, Check, ArrowRight, ChevronRight, Database, Eye, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLanding } from "../utils/api";
import { useQuery } from "@tanstack/react-query";

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { data: landingApiData , isLoading, error } = useQuery({
    queryKey: ["landing"],
    queryFn: getLanding,
  });

  console.log("landingApiData", landingApiData);



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onGetStarted = () => navigate("/input");
  const onSignIn = () => navigate("/login");
  const onContact = () => navigate("/contact");

  const landingData = 
  {
    insightPreview: {
      header: {
        location: "Cambridge, UK",
        category: "Coffee Shops",
        badgeText: "Good Opportunity"
      },
      metrics: [
        {
          id: "competitors",
          value: "18",
          label: "Competitors nearby",
          sublabel: "Within 1km radius",
          badgeText: "Moderate"
        },
        {
          id: "market-gaps",
          value: "5",
          label: "Market gaps found",
          sublabel: "Underserved niches",
          badgeText: "Strong"
        },
        {
          id: "customer-demand",
          value: "High",
          label: "Customer demand",
          sublabel: "1,247 monthly searches"
        },
        {
          id: "avg-rating",
          value: "3.8★",
          label: "Avg competitor rating",
          sublabel: "Room for improvement"
        }
      ],
      competition: {
        title: "Competition by area",
        zonesAnalyzed: 6,
        bars: [
          { label: "N", height: 35 },
          { label: "NE", height: 50 },
          { label: "E", height: 70 },
          { label: "SE", height: 95 },
          { label: "S", height: 65 },
          { label: "W", height: 40 }
        ],
        legend: [
          { label: "Low (0-5)" },
          { label: "Medium (6-12)" },
          { label: "High (13+)" }
        ],
        insight: "North and West zones show lower saturation — consider these areas for new location"
      }
    },
    pricingPlans: [
      {
        name: "Free",
        description: "Perfect for testing the waters",
        price: "$0",
        priceId: "price_1QVC...",
        priceSuffix: null,
        priceNote: "Forever free",
        ctaLabel: "Start free",
        isPopular: false,
        features: [
          { text: "1 free report on signup", included: true },
          { text: "Basic market stats", included: true },
          { text: "Limited insights", included: true },
          { text: "Masked details", included: false }
        ]
      },
      {
        name: "Pro",
        description: "For serious market research",
        price: "$49",
        priceId: "price_1QVC...",
        priceSuffix: "/month",
        priceNote: "Billed monthly",
        ctaLabel: "Unlock full insights",
        isPopular: true,
        features: [
          { text: "Full reports", included: true, emphasis: true },
          { text: "Unlocked market gaps", included: true, emphasis: true },
          { text: "Advanced signals", included: true, emphasis: true },
          { text: "Saved reports", included: true, emphasis: true },
          { text: "Priority analysis", included: true, emphasis: true }
        ]
      }
    ]
  };

  const { insightPreview, pricingPlans } = landingData;

  const competitionBarStyles = [
    { colorClass: "bg-green-400", hoverClass: "hover:bg-green-500" },
    { colorClass: "bg-green-300", hoverClass: "hover:bg-green-400" },
    { colorClass: "bg-amber-400", hoverClass: "hover:bg-amber-500" },
    { colorClass: "bg-red-400", hoverClass: "hover:bg-red-500" },
    { colorClass: "bg-amber-300", hoverClass: "hover:bg-amber-400" },
    { colorClass: "bg-green-300", hoverClass: "hover:bg-green-400" }
  ];
  const competitionLegendStyles = [
    { colorClass: "bg-green-400" },
    { colorClass: "bg-amber-400" },
    { colorClass: "bg-red-400" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation - Sticky */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                How it works
              </button>
              <button onClick={() => scrollToSection('example-insights')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Example insights
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </button>
              <button onClick={onContact} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </button>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onSignIn} className="text-gray-700 hover:text-gray-900">
                Sign in
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                Try for free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover market opportunities before you invest
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Location-based market intelligence that reveals competition, gaps, and real-world demand — powered by maps, reviews, and public data.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all"
                >
                  Try free market analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-500">
                  No credit card required
                </p>
              </div>
            </div>

            {/* Right Side - Dashboard Mockup */}
            <div className="relative">
              <Card className="p-6 bg-white shadow-2xl border border-gray-200">
                {/* Location & Category Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{insightPreview.header.location}</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{insightPreview.header.category}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {insightPreview.header.badgeText}
                  </Badge>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <Badge className="bg-blue-200 text-blue-900 text-xs">
                        Moderate
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 mb-1">{insightPreview.metrics[0].value}</div>
                    <div className="text-sm text-blue-700 font-medium mb-1">{insightPreview.metrics[0].label}</div>
                    <div className="text-xs text-blue-600">
                      {insightPreview.metrics[0].sublabel}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <Badge className="bg-green-200 text-green-900 text-xs">
                        {insightPreview.metrics[1].badgeText}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-900 mb-1">{insightPreview.metrics[1].value}</div>
                    <div className="text-sm text-green-700 font-medium mb-1">{insightPreview.metrics[1].label}</div>
                    <div className="text-xs text-green-600">
                      {insightPreview.metrics[1].sublabel}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="text-xs text-purple-700 font-medium">{insightPreview.metrics[2].label}</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900 mb-1">{insightPreview.metrics[2].value}</div>
                    <div className="text-xs text-purple-600">
                      {insightPreview.metrics[2].sublabel}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-amber-600" />
                      <span className="text-xs text-amber-700 font-medium">{insightPreview.metrics[3].label}</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-900 mb-1">{insightPreview.metrics[3].value}</div>
                    <div className="text-xs text-amber-600">
                      {insightPreview.metrics[3].sublabel}
                    </div>
                  </div>
                </div>

                {/* Market Saturation Chart with Context */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-gray-700" />
                      <div className="text-sm font-semibold text-gray-900">{insightPreview.competition.title}</div>
                    </div>
                    <Badge className="bg-gray-200 text-gray-700 text-xs">
                      {insightPreview.competition.zonesAnalyzed} zones analyzed
                    </Badge>
                  </div>
                  
                  {/* Chart */}
                  <div className="mb-3">
                    <div className="flex items-end justify-between gap-2 h-20 mb-2">
                      {insightPreview.competition.bars.map((bar, index) => (
                        <div key={bar.label} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                          <div
                            className={`w-full ${competitionBarStyles[index]?.colorClass ?? "bg-gray-300"} rounded-t transition-all ${competitionBarStyles[index]?.hoverClass ?? ""}`}
                            style={{ height: `${bar.height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Zone labels */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {insightPreview.competition.bars.map((bar) => (
                        <span key={bar.label} className="flex-1 text-center">{bar.label}</span>
                      ))}
                    </div>
                  </div>

                  {/* Legend & Insight */}
                  <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs mb-2">
                        {insightPreview.competition.legend.map((item, index) => (
                          <div key={item.label} className="flex items-center gap-1">
                            <div className={`w-3 h-3 ${competitionLegendStyles[index]?.colorClass ?? "bg-gray-300"} rounded`}></div>
                            <span className="text-gray-600">{item.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-900">Insight:</span> {insightPreview.competition.insight}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating accent element */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get actionable market intelligence in four simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" style={{ left: '12.5%', right: '12.5%' }}></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm relative z-10">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Choose a location
                </h3>
                <p className="text-gray-600 text-sm">
                  Search any city, neighborhood, or place using Google Maps
                </p>
              </Card>

              {/* Step 2 */}
              <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm relative z-10">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a category
                </h3>
                <p className="text-gray-600 text-sm">
                  Restaurants, retail, services, or any business category
                </p>
              </Card>

              {/* Step 3 */}
              <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm relative z-10">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Refine your niche
                </h3>
                <p className="text-gray-600 text-sm">
                  Narrow down with smart subcategory suggestions
                </p>
              </Card>

              {/* Step 4 */}
              <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow relative">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm relative z-10">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Get your report
                </h3>
                <p className="text-gray-600 text-sm">
                  Instant insights on competition, gaps, and risks
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive market analysis designed for decision-makers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Competitive landscape
              </h3>
              <p className="text-gray-600 text-sm">
                See how many competitors exist and where they're concentrated
              </p>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Market gap detection
              </h3>
              <p className="text-gray-600 text-sm">
                Identify underserved areas and untapped opportunities
              </p>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Review-based customer signals
              </h3>
              <p className="text-gray-600 text-sm">
                Understand demand and sentiment from real customer feedback
              </p>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Risk & saturation warnings
              </h3>
              <p className="text-gray-600 text-sm">
                Get alerts about oversaturated markets before you invest
              </p>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Location-specific insights
              </h3>
              <p className="text-gray-600 text-sm">
                Hyper-local data tailored to your exact target area
              </p>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Data-backed confidence score
              </h3>
              <p className="text-gray-600 text-sm">
                Clear opportunity ratings based on multiple signals
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Insights Preview */}
      <section id="example-insights" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Example Insights
            </h2>
            <p className="text-xl text-gray-600">
              See what a market report looks like
            </p>
          </div>

          <Card className="p-8 bg-white border-2 border-gray-200 shadow-xl relative overflow-hidden">
            {/* Report Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">San Francisco, CA • Coffee Shops</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Market Analysis Report</h3>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  High Opportunity
                </Badge>
              </div>
            </div>

            {/* Market Gaps Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Market Gaps</h4>
              </div>
              <div className="space-y-3 blur-sm select-none">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Specialty coffee near tech offices</div>
                    <div className="text-sm text-gray-600">High foot traffic area with limited premium options</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Late-night service gap</div>
                    <div className="text-sm text-gray-600">Few competitors open after 8 PM in residential zones</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Warnings Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-gray-900">Risk Warnings</h4>
              </div>
              <div className="blur-sm select-none">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-red-600 font-bold">!</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">Downtown core saturation</div>
                    <div className="text-sm text-gray-600">Market Square area has 3x average density</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Verdict Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Executive Verdict</h4>
              </div>
              <div className="blur-sm select-none">
                <p className="text-gray-700 leading-relaxed">
                  Strong opportunity in underserved residential zones with growing population. Competition exists but is concentrated in tourist areas. Consider positioning toward local professionals and remote workers with premium offerings.
                </p>
              </div>
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Example insights
                </h3>
                <p className="text-gray-600 mb-6">
                  Full details available after signup
                </p>
                <Button 
                  onClick={onGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                  size="lg"
                >
                  Try free analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Free vs Paid Teaser */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.isPopular
                    ? "p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-500 relative"
                    : "p-8 bg-white border-2 border-gray-200"
                }
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className={plan.isPopular ? "text-gray-700" : "text-gray-600"}>{plan.description}</p>
                </div>
                <div className="mb-8">
                  {plan.priceSuffix ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.priceSuffix}</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                  )}
                  <div className={`text-sm ${plan.isPopular ? "text-gray-600" : "text-gray-500"} ${plan.priceSuffix ? "mt-1" : ""}`}>
                    {plan.priceNote}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className={`flex items-start gap-3 ${feature.included ? "" : "opacity-50"}`}>
                      {feature.included ? (
                        <Check
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.isPopular ? "text-blue-600" : "text-green-600"}`}
                        />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></div>
                      )}
                      <span
                        className={
                          feature.included
                            ? plan.isPopular
                              ? `text-gray-800 ${feature.emphasis ? "font-medium" : ""}`
                              : "text-gray-700"
                            : "text-gray-500"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={onGetStarted}
                  variant={plan.isPopular ? undefined : "outline"}
                  className={
                    plan.isPopular
                      ? "w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "w-full h-12 border-2"
                  }
                >
                  {plan.ctaLabel}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Built using real-world location and review data
            </p>
            
            {/* Data Source Icons */}
            <div className="flex items-center justify-center gap-12 mb-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <Map className="w-8 h-8 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Google Maps</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <Star className="w-8 h-8 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Reviews</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <Database className="w-8 h-8 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Public Data</span>
              </div>
            </div>

            {/* Disclaimer */}
            <Card className="p-6 bg-blue-50 border border-blue-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy-first analysis</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We aggregate public data sources and never access private customer information. Reports are for strategic planning only.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-800 pb-12 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold">findmyniche</span>
            </div>
            <div className="flex gap-8">
              <button onClick={() => navigate("/privacy")} className="text-sm text-gray-400 hover:text-white">Privacy</button>
              <button onClick={() => navigate("/terms")} className="text-sm text-gray-400 hover:text-white">Terms</button>
              <button onClick={onContact} className="text-sm text-gray-400 hover:text-white">Contact</button>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} findmyniche. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
