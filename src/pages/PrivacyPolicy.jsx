import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Target,
  ArrowLeft,
  Shield,
  Database,
  Lock,
  Eye,
  Share2,
  Clock,
  UserCheck,
  Mail,
} from "lucide-react";

export function PrivacyPolicy({ onBack, onContact } = {}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  const handleContact = (event) => {
    event?.preventDefault?.();
    if (onContact) {
      onContact();
      return;
    }
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </button>
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">How we collect, use, and protect your information</p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 7, 2026</p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            We value your privacy. This policy explains what information we collect, how it is used,
            and the choices you have. We are committed to transparency and protecting your data.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Information We Collect</h2>

          <div className="space-y-4">
            <Card className="p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Information</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Email address</li>
                    <li>• Account ID</li>
                    <li>• Subscription status</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Usage Information</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Reports created</li>
                    <li>• Selected locations and categories</li>
                    <li>• Feature usage (aggregated, non-personal)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Data</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Device type</li>
                    <li>• Browser</li>
                    <li>• Anonymous analytics (no tracking across sites)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">What We Do NOT Collect</h2>
                <p className="text-gray-700">
                  Your privacy is important. Here's what we explicitly do not collect:
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  <strong>No personal location tracking</strong> — We don't track where you physically are
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  <strong>No private business data</strong> — We only use public information
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  <strong>No sensitive personal information</strong> — We don't ask for or store sensitive data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  <strong>No data scraping from user accounts</strong> — Your personal accounts remain private
                </span>
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">How We Use Data</h2>
          <Card className="p-6 border border-gray-200">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">1</span>
                </div>
                <span>
                  <strong>Generate reports</strong> — Create market analysis based on your inputs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">2</span>
                </div>
                <span>
                  <strong>Improve product quality</strong> — Understand usage patterns to enhance features
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">3</span>
                </div>
                <span>
                  <strong>Manage billing and access</strong> — Process payments and subscription status
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">4</span>
                </div>
                <span>
                  <strong>Prevent abuse and fraud</strong> — Protect our platform and users
                </span>
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Data Sources</h2>
          <Card className="p-6 bg-blue-50 border border-blue-200">
            <p className="text-gray-800 leading-relaxed">
              All market insights are derived from <strong>publicly available information</strong> such as maps, reviews, and business listings. We do not access private databases or proprietary information.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
          <Card className="p-6 border border-gray-200">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <Share2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>No selling of user data</strong> — We will never sell your information to third parties
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Limited sharing with infrastructure providers</strong> — Only necessary services like hosting and payment processing
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Only as required by law</strong> — We comply with legal requirements when necessary
                </span>
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Data Retention</h2>
          <Card className="p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Data retained while account is active</strong> — Your information is stored as long as you maintain an active account
                </p>
                <p>
                  <strong>Users can request deletion</strong> — Contact us to delete your account and associated data at any time
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border border-gray-200">
              <p className="text-gray-800">✓ Access your data</p>
            </Card>
            <Card className="p-4 border border-gray-200">
              <p className="text-gray-800">✓ Request deletion</p>
            </Card>
            <Card className="p-4 border border-gray-200">
              <p className="text-gray-800">✓ Update account information</p>
            </Card>
            <Card className="p-4 border border-gray-200">
              <p className="text-gray-800">✓ Opt out of communications</p>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Security</h2>
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-essence rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 leading-relaxed mt-2">
                We use <strong>industry-standard security measures</strong> to protect your information, including encryption, secure servers, and regular security audits.
              </p>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Contact</h2>
          <Card className="p-6 border border-blue-300 bg-blue-50">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-gray-800 mb-2">Questions about privacy?</p>
                <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium" onClick={handleContact}>
                  Contact us →
                </a>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2026 findmyniche. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
