import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, ArrowLeft } from "lucide-react";

export function About({ onBack, onContact } = {}) {
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
        <div className="max-w-7xl mx-auto ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-[68px] font-thin text-gray-900 mb-">About</h1>
              <h2 className="text-8xl text-[68px] font-bold text-gray-900 mb-6 leading-tight">
                findmyniche
              </h2>
              <p className="text-[24px] text-gray-700 mb-8 leading-rlaxed">
                Forging the next generation of Digital Intelligence and Analytics


              </p>
              <Button
                onClick={handleContact}
                size="lg"
                className="fs-18 cursor-pointer bg-dark hover:bg-dark/90 text-white shadow-sm px-22 py-6 rounded-full font-semibold text-lg border-none"
              >
                Join Our Team
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwb2ZmaWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3Njk1NDcyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGdyb3VwJTIwcGhvdG98ZW58MXx8fHwxNzY5NTA2NjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Team photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2 pt-8">
                <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMGNvbmZlcmVuY2UlMjBzcGVha2VyfGVufDF8fHx8MTc2OTYwMTc4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Conference presentation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjByZXBvcnQlMjBkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2OTYwMTc5MHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Data analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-essence py-8">
        <div className="max-w-7xl mx-auto 6">
          <h3 className="text-center text-gray-900 font-semibold mb-10 text-[24px]">
            Trusted by entrepreneurs worldwide
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16 ">
            <img className=" h-12" src="brand1.svg" />
            <img className=" h-12" src="brand1.svg" />
            <img className=" h-12" src="brand1.svg" />
            <img className=" h-12" src="brand1.svg" />
            <img className=" h-12" src="brand1.svg" />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[28px] font-semibold text-gray-900 mb-6">About findmyniche</h2>
              <div className=" text-[20px] space-y-4 text-gray-800 leading-relaxed">
                <p>
                  findmyniche is the leading source of mobile app, digital advertising, retail media, and audience insights for the largest brands and app publishers across the globe. 
                </p>
                <p>
                  Founded in 2013, findmyniche’s mobile app insights have helped marketers, app, and game developers demystify the mobile app ecosystem with visibility into usage, engagement, and paid acquisition strategies. Today, findmyniche’s digital market insights platform has expanded to include Audience, Retail Media, and Pathmatics Digital Advertising Insights, helping brands and advertisers understand their competitor’s advertising strategies and audiences across web, social, and mobile.
                </p>
                {/* <p>
                  Today, findmyniche's comprehensive market intelligence platform has expanded
                  to include location analytics, demographic profiling, and competitive
                  landscape analysis—helping businesses and entrepreneurs understand their
                  target markets, identify opportunities, and validate ideas across 100+
                  business categories.
                </p> */}
              </div>
            </div>

            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMGNvbmZlcmVuY2UlMjBzcGVha2VyfGVufDF8fHx8MTc2OTYwMTc4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Market intelligence platform"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto 6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGdyb3VwJTIwcGhvdG98ZW58MXx8fHwxNzY5NTA2NjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Global team"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-[28px] font-semibold text-gray-900 mb-6">Global Teams</h2>
              <div className="text-[20px] space-y-4 text-gray-800 leading-relaxed">
                <p>
                  Our diverse team spans multiple continents, bringing together data
                  scientists, market researchers, entrepreneurs, and engineers who share a
                  common mission: democratizing access to professional-grade market
                  intelligence.
                </p>
                <p>
                  We believe the best insights come from diverse perspectives. Our team members
                  have launched businesses, analyzed markets, and helped thousands of
                  entrepreneurs succeed. This real-world experience informs every feature we
                  build and every insight we deliver.
                </p>
                {/* <p>
                  Whether you're in San Francisco, London, Tokyo, or anywhere in between, our
                  platform provides the local market intelligence you need to make informed
                  decisions.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto ">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[28px] font-semibold text-gray-900 mb-6">Market Reports</h2>
              <div className="text-[20px] space-y-4 text-gray-800 leading-relaxed mb-8">
                <p>
                  findmyniche's Insights team leverages our comprehensive data to deliver
                  critical reports on the latest trends in local markets. In addition to quick
                  market snapshots, our platform regularly provides in-depth analyses on
                  business categories, geographic regions, and demographic behaviors.
                </p>
                <p>
                  Every report is backed by verified data from trusted sources, giving you the
                  confidence to make strategic business decisions.
                </p>
              </div>
              <Button
                onClick={handleBack}
                size="lg"
                className="fs-18 cursor-pointer bg-dark hover:bg-dark/90 text-white shadow-sm px-22 py-6 rounded-full font-semibold text-lg border-none"
              >
                View Reports
              </Button>
            </div>

            <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjByZXBvcnQlMjBkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2OTYwMTc5MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Market reports"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto  text-center">
          <h2 className="text-[28px] font-bold text-gray-900 mb-6">Ready to discover your niche?</h2>
          <p className="text-[20px] text-gray-600 mb-10">
            Join thousands of entrepreneurs making data-driven business decisions
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={handleBack}
              size="lg"
              className="bg-essence text-white hover:bg-cyan-300 font-semibold px-8 rounded-full"
            >
              Get Started
            </Button>
            <Button
              onClick={handleContact}
              size="lg"
              
            className=" fs-16 cursor-pointer bg-dark hover:bg-dark/90   text-white shadow-sm px-6 py-5 rounded-full font-semibold text-sm border-none"
            >
              Contact Us
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
            <p className="text-sm text-gray-600">© 2026 findmyniche. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
