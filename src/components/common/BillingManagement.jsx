import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  CreditCard,
  Plus,
  Check,
  X,
  AlertTriangle,
  Download,
  Calendar,
  DollarSign,
  RefreshCw,
  Trash2,
  Shield,
  Info,
  Crown,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

export function PaymentMethodCard({ method, onSetDefault, onDelete }) {
  const getCardIcon = () => {
    return <CreditCard className="w-6 h-6 text-gray-600" />;
  };

  return (
    <Card className="p-6 border-2 border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            {getCardIcon(method.brand)}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-base font-bold text-gray-900">
                {method.brand || "Card"} ••••{method.last4}
              </h4>
              {method.isDefault && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  Default
                </Badge>
              )}
            </div>
            {method.expiryMonth && method.expiryYear && (
              <p className="text-sm text-gray-600">
                Expires {method.expiryMonth}/{method.expiryYear}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!method.isDefault && (
            <Button
              onClick={onSetDefault}
              size="sm"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              Set as default
            </Button>
          )}
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export function AddPaymentMethodModal({ isOpen, onClose, onAdd }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      await onAdd({
        cardNumber,
        expiryDate,
        cvc,
        name,
      });
      onClose();
    } catch (error) {
      console.error("Failed to add payment method:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add payment method</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cardholder name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3 mb-6">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Your payment information is encrypted and secure. We never store your full card
              details.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing || !cardNumber || !expiryDate || !cvc || !name}
              className="flex-1 bg-essence hover:bg-cyan-300 text-white font-semibold"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add card
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function InvoiceItem({ invoice, onDownload }) {
  const getStatusBadge = () => {
    switch (invoice.status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-700 border-green-300">Paid</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-300">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border-red-300">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900">{invoice.description}</h4>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            {invoice.date}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-base font-bold text-gray-900">
            ${invoice.amount.toFixed(2)}
          </div>
        </div>
        <Button
          onClick={onDownload}
          size="sm"
          variant="outline"
          className="border-gray-300 hover:bg-gray-50"
        >
          <Download className="w-3 h-3 mr-1" />
          PDF
        </Button>
      </div>
    </div>
  );
}

export function CancelSubscriptionModal({
  isOpen,
  onClose,
  onConfirm,
  currentPlan,
  billingCycle,
  nextBillingDate,
}) {
  const [step, setStep] = useState("offer");
  const [selectedReason, setSelectedReason] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!isOpen) return null;

  const reasons = [
    "Too expensive",
    "Not using it enough",
    "Missing features I need",
    "Found a better alternative",
    "Technical issues",
    "Other",
  ];

  const handleConfirmCancel = () => {
    onConfirm(selectedReason || feedback);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {step === "offer" && (
            <>
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  Before you go...
                </h2>

                <p className="text-base text-gray-600 mb-8 text-center">
                  We'd hate to see you leave! Here's a special offer just for you:
                </p>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-essence rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Get 50% off for 3 months
                      </h3>
                      <p className="text-sm text-gray-600">
                        Stay and save ${(29.99 * 0.5).toFixed(2)}/month
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Keep all your existing reports
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Unlimited exports and sharing
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Cancel anytime
                    </li>
                  </ul>

                  <Button
                    onClick={onClose}
                    className="w-full bg-essence hover:bg-cyan-300 text-white font-semibold"
                  >
                    Accept offer & stay
                  </Button>
                </Card>

                <Button
                  onClick={() => setStep("reason")}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:bg-gray-50 font-semibold"
                >
                  No thanks, continue cancellation
                </Button>
              </div>
            </>
          )}

          {step === "reason" && (
            <>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Help us improve</h2>
                <p className="text-base text-gray-600 mb-6">
                  Could you tell us why you're cancelling? This helps us make findmyniche better.
                </p>

                <div className="space-y-3 mb-6">
                  {reasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedReason === reason
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{reason}</span>
                        {selectedReason === reason && <Check className="w-5 h-5 text-blue-600" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional feedback (optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us more..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep("offer")}
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep("confirm")}
                    disabled={!selectedReason}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === "confirm" && (
            <>
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  Cancel subscription?
                </h2>

                <p className="text-base text-gray-600 mb-6 text-center">
                  Your {currentPlan} subscription will be cancelled, but you'll keep access
                  until {nextBillingDate}.
                </p>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
                  <h4 className="text-sm font-bold text-amber-900 mb-3">
                    What happens after cancellation:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-amber-800">
                      <TrendingDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      You'll lose access to pro features (export, sharing, etc.)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-amber-800">
                      <TrendingDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Your reports will remain viewable but limited
                    </li>
                    <li className="flex items-start gap-2 text-sm text-amber-800">
                      <TrendingDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Monthly report generation will be restricted
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep("reason")}
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmCancel}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    Confirm cancellation
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function DowngradeWarningModal({ isOpen, onClose, onConfirm, reportsCount, exportsCount }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
              <TrendingDown className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Downgrade to Free?
          </h2>

          <p className="text-base text-gray-600 mb-6 text-center">
            You currently have {reportsCount} reports and {exportsCount} exports. Here's what
            will change:
          </p>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    Report exports disabled
                  </div>
                  <div className="text-sm text-gray-600">
                    You won't be able to download PDF or CSV files
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    Report sharing disabled
                  </div>
                  <div className="text-sm text-gray-600">Public links will stop working</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    Limited to 3 reports/month
                  </div>
                  <div className="text-sm text-gray-600">Down from unlimited</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    Your reports stay viewable
                  </div>
                  <div className="text-sm text-gray-600">With free-tier limitations</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              Keep Pro
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold"
            >
              Confirm downgrade
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
