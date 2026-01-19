import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Target,
  ArrowLeft,
  FileText,
  AlertTriangle,
  Shield,
  UserCheck,
  CreditCard,
  Ban,
  Scale,
  XCircle,
  Mail,
} from "lucide-react";

export function TermsOfService({ onBack, onContact } = {}) {
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
          <h1 className="text-5xl font-semibold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">Conditions for using the platform</p>
          <p className="text-sm text-gray-500 mt-4">Last updated: January 7, 2026</p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Acceptance</h2>
          <p className="text-gray-700 leading-relaxed">
            By using this platform, you agree to these terms. If you do not agree, please do not use the service. Continued use of the platform constitutes acceptance of any updates to these terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Service Description</h2>
          <Card className="p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 leading-relaxed">
                The platform provides <strong>analytical insights based on public data sources</strong>. Reports are informational only and are intended to help users understand market conditions. The platform does not guarantee specific outcomes or results.
              </p>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">No Professional Advice</h2>
                <p className="text-gray-700">Important disclaimer — please read carefully:</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">!</span>
                <span><strong>Not legal advice</strong> — Consult a lawyer for legal matters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">!</span>
                <span><strong>Not financial advice</strong> — Consult a financial advisor for investment decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">!</span>
                <span><strong>Not investment advice</strong> — All business decisions are your responsibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">!</span>
                <span><strong>Users remain responsible for decisions</strong> — You assume all risk</span>
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Accounts</h2>
          <Card className="p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <UserCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Users must provide accurate information</strong> — Ensure your account details are correct</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>One account per user</strong> — Do not create multiple accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Responsibility for account security</strong> — Keep your password secure and report unauthorized access immediately</span>
                </li>
              </ul>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Free vs Paid Access</h2>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Free Access</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Limited reports</li>
                <li>• Masked insights</li>
                <li>• Basic features only</li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-blue-300 bg-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Paid Access</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Full insights</li>
                <li>• Additional features</li>
                <li>• Export capabilities</li>
              </ul>
            </Card>
          </div>

          <p className="text-gray-600 text-sm mt-4">
            Paid subscriptions are billed according to the selected plan and can be canceled at any time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Fair Use</h2>
          <Card className="p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <Ban className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 mb-3">The following activities are prohibited:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>No scraping</strong> — Automated data extraction is not allowed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>No resale of reports</strong> — Reports are for your use only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span><strong>No abuse of APIs</strong> — Respect rate limits and usage guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Data & Output Ownership</h2>
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>Users own their generated reports</strong> — Once you create a report, it's yours to use for your business purposes
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>Platform retains system-level data for improvement</strong> — Aggregated, anonymized usage data helps us enhance the service
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <Scale className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Service provided "as is"</strong> — We make reasonable efforts to provide accurate information but cannot guarantee perfection
                </p>
                <p>
                  <strong>No guarantees of outcomes</strong> — Market conditions change, and reports reflect information at a point in time. We are not liable for business decisions or outcomes based on our reports.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Termination</h2>
          <Card className="p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Accounts may be suspended for misuse</strong> — Violations of these terms may result in account suspension or termination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Users can cancel anytime</strong> — You may cancel your subscription at any time with no penalties</span>
                </li>
              </ul>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Contact</h2>
          <Card className="p-6 border border-blue-300 bg-blue-50">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-gray-800 mb-2">Questions about these terms?</p>
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
