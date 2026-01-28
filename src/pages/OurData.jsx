import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Target,
  Database,
  CheckCircle,
  MapPin,
  Users,
  Building2,
  DollarSign,
  ArrowLeft,
  Lock,
  RefreshCw,
} from "lucide-react";

export function OurData({ onBack, onContact } = {}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  const handleContact = () => {
    if (onContact) {
      onContact();
      return;
    }
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">findmyniche</span>
          </div>
        </div>
      </header> */}

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-xl text-gray-600 mb-4">Our Data</h1>
              <h2 className="text-8xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Responsibly Sourced Data
              </h2>
              <p className="text-[24px] text-gray-700 mb-8 leading-relaxed">
                Transparent, ethical, and trustworthy market intelligence you can rely on
              </p>
              <Button
                onClick={handleContact}
                size="lg"
                className="fs-18 cursor-pointer bg-dark hover:bg-dark/90 text-white shadow-sm px-22 py-6 rounded-full font-semibold text-lg border-none"
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2VydmVyJTIwZGF0YSUyMGNlbnRlcnxlbnwxfHx8fDE3Njk2MDEzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Data infrastructure"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc2OTU3OTgzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Analytics dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1765046255479-669cf07a0230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2OTU5ODI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Data visualization"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjByZXBvcnQlMjBkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2OTYwMTc5MHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Market reports"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-essence py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Data Quality Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-gray-900">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm text-gray-800">Verified Sources</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-sm text-gray-800">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm text-gray-800">Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-gray-800">Compliant</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Trusted Data Sources</h2>
              <div className="text-[20px] space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Every data point in findmyniche comes from verified, reputable sources. We
                  partner with leading data providers, government agencies, and commercial
                  databases to ensure accuracy and reliability.
                </p>
                <p>
                  Our data aggregation process involves multiple layers of validation and
                  cross-referencing to eliminate inconsistencies and ensure you're getting the
                  most accurate market insights available.
                </p>
                <p>
                  We believe in complete transparency about where our data comes from and how
                  we process it. This commitment to openness builds trust and helps you make
                  confident business decisions.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Multi-source verification</div>
                    <p className="text-sm text-gray-600">
                      Every data point cross-referenced with 2-3 independent sources
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Continuous updates</div>
                    <p className="text-sm text-gray-600">
                      Automated systems refresh data based on optimal schedules
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Transparent methodology</div>
                    <p className="text-sm text-gray-600">
                      Open about data sources and processing methods
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full min-h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/flagged/photo-1579274216947-86eaa4b00475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2VydmVyJTIwZGF0YSUyMGNlbnRlcnxlbnwxfHx8fDE3Njk2MDEzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Data infrastructure"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Comprehensive Data Coverage
          </h2>
          <p className="text-[20px] text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            We aggregate data across multiple dimensions to give you a complete picture of any
            market
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location Data</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Verified locations, geographic boundaries, and accessibility metrics
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Google Places API</li>
                <li>• OpenStreetMap</li>
                <li>• Government databases</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Demographics</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Population statistics, age distribution, and household data
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• U.S. Census Bureau</li>
                <li>• Nielsen Analytics</li>
                <li>• Experian Data</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Business Intel</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Competitor analysis, industry trends, and market saturation
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Business registries</li>
                <li>• Yelp API</li>
                <li>• Industry reports</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Economic Data</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Income levels, cost of living, and spending patterns
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Bureau of Labor Stats</li>
                <li>• Federal Reserve</li>
                <li>• Financial institutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="h-full min-h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc2OTU3OTgzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Data analytics process"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Data Methodology</h2>
              <div className="text-[20px] space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  We follow a rigorous four-step process to ensure the highest quality market
                  insights for every location and category.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">1. Collection</h3>
                    <p className="text-sm text-gray-600">
                      Continuous data aggregation from 15+ verified sources with timestamping
                      and attribution
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">2. Validation</h3>
                    <p className="text-sm text-gray-600">
                      Automated cross-referencing and quality control to eliminate
                      inconsistencies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">3. Analysis</h3>
                    <p className="text-sm text-gray-600">
                      AI-powered pattern recognition and trend analysis for actionable insights
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">4. Updates</h3>
                    <p className="text-sm text-gray-600">
                      Regular refreshes on optimized schedules to maintain data currency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy & Security First</h2>
              <div className="text-[20px] space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  We take data privacy seriously. Every piece of data we use is ethically
                  sourced, anonymized, and fully compliant with global privacy regulations
                  including GDPR and CCPA.
                </p>
                <p>
                  Our platform uses only aggregated, anonymized data that contains zero
                  personally identifiable information. We believe in providing powerful market
                  insights while respecting individual privacy.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">No personal data</div>
                    <p className="text-sm text-gray-600">
                      Only aggregated, anonymized data with zero PII
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Enterprise-grade security</div>
                    <p className="text-sm text-gray-600">
                      End-to-end encryption and regular security audits
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Full compliance</div>
                    <p className="text-sm text-gray-600">
                      GDPR, CCPA, and all major data protection regulations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full min-h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1765046255479-669cf07a0230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2OTU5ODI3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Security and privacy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Trust the data. Make better decisions.
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Start exploring market opportunities with verified, high-quality data
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={handleBack}
              size="lg"
              className="fs-18 cursor-pointer bg-dark hover:bg-dark/90 text-white shadow-sm px-22 py-6 rounded-full font-semibold text-lg border-none"
            >
              Get Started
            </Button>
            <Button
              onClick={handleContact}
              size="lg"
              className="fs-18 cursor-pointer bg-dark hover:bg-dark/90 text-white shadow-sm px-22 py-6 rounded-full font-semibold text-lg border-none"
            >
              Questions? Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">findmyniche</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 findmyniche. All data sources properly licensed and attributed.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
