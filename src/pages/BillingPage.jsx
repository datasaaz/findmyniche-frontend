import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  CreditCard,
  Check,
  Crown,
  Zap,
  Download,
  ArrowRight,
  Shield,
  Info,
  AlertCircle,
  DollarSign,
  Plus,
} from "lucide-react";
import {
  PaymentMethodCard,
  AddPaymentMethodModal,
  InvoiceItem,
  CancelSubscriptionModal,
  DowngradeWarningModal,
} from "../components/common/BillingManagement";

const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2028,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    last4: "5555",
    brand: "Mastercard",
    expiryMonth: 6,
    expiryYear: 2027,
    isDefault: false,
  },
];

const mockInvoices = [
  {
    id: "inv_1",
    date: "January 15, 2026",
    amount: 29.99,
    status: "paid",
    description: "Pro Plan - Monthly",
    pdfUrl: "#",
  },
  {
    id: "inv_2",
    date: "December 15, 2025",
    amount: 29.99,
    status: "paid",
    description: "Pro Plan - Monthly",
    pdfUrl: "#",
  },
  {
    id: "inv_3",
    date: "November 15, 2025",
    amount: 29.99,
    status: "paid",
    description: "Pro Plan - Monthly",
    pdfUrl: "#",
  },
];

export function BillingPage() {
  const navigate = useNavigate();
  const userPlan = "pro";
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [invoices] = useState(mockInvoices);
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [downgradeModalOpen, setDowngradeModalOpen] = useState(false);

  const currentPlan = userPlan === "pro" ? "Pro" : "Free";
  const billingCycle = "Monthly";
  const nextBillingDate = "February 15, 2026";

  const handleUpgrade = () => {
    navigate("/billing/upgrade");
  };

  const handleSetDefaultPayment = (methodId) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      })),
    );
  };

  const handleDeletePayment = (methodId) => {
    if (
      confirm(
        "Are you sure you want to delete this payment method? This action cannot be undone.",
      )
    ) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== methodId));
    }
  };

  const handleAddPayment = async (paymentData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newMethod = {
      id: `pm_${Date.now()}`,
      type: "card",
      last4: paymentData.cardNumber.slice(-4),
      brand: "Visa",
      expiryMonth: parseInt(paymentData.expiryDate.split("/")[0], 10),
      expiryYear: parseInt(`20${paymentData.expiryDate.split("/")[1]}`, 10),
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const handleDownloadInvoice = (invoiceId) => {
    console.log("Downloading invoice:", invoiceId);
  };

  const handleCancelSubscription = (reason) => {
    console.log("Subscription cancelled. Reason:", reason);
  };

  const handleConfirmDowngrade = () => {
    console.log("Downgrading to free plan");
    setDowngradeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Plan</h2>

          {userPlan === "free" ? (
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Free Plan</h3>
                      <p className="text-sm text-gray-600">Limited features available</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      3 reports per month
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Basic analytics
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <AlertCircle className="w-4 h-4" />
                      No export or sharing
                    </div>
                  </div>

                  <Button
                    onClick={handleUpgrade}
                    size="lg"
                    className="bg-essence hover:bg-cyan-300"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Pro
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-blue-300 ml-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-gray-900 mb-1">$29.99</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Unlimited reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Export as PDF/CSV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Share reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Priority support</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-essence rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-bold text-gray-900">Pro Plan</h3>
                      <Badge className="bg-essence text-white">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      You have full access to all premium features
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">$29.99</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Active Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Unlimited reports
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Export as PDF/CSV
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Share with public links
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600" />
                      Priority support
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Billing Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Billing cycle</span>
                      <span className="font-medium text-gray-900">{billingCycle}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next billing date</span>
                      <span className="font-medium text-gray-900">{nextBillingDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Payment method</span>
                      <span className="font-medium text-gray-900">
                        {paymentMethods.find((method) => method.isDefault)
                          ? `•••• ${paymentMethods.find((method) => method.isDefault)?.last4}`
                          : "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setDowngradeModalOpen(true)}
                  variant="outline"
                  className="border-2 border-gray-300"
                >
                  Downgrade to Free
                </Button>
                <Button
                  onClick={() => setCancelModalOpen(true)}
                  variant="outline"
                  className="border-2 border-red-300 text-red-600 hover:bg-red-50"
                >
                  Cancel Subscription
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Methods</h2>
              <p className="text-sm text-gray-600">
                Manage your payment methods for subscriptions
              </p>
            </div>
            <Button
              onClick={() => setAddPaymentModalOpen(true)}
              className="bg-essence hover:bg-cyan-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          {paymentMethods.length === 0 ? (
            <Card className="p-12 text-center border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No payment methods</h3>
              <p className="text-gray-600 mb-6">
                Add a payment method to subscribe to Pro
              </p>
              <Button
                onClick={() => setAddPaymentModalOpen(true)}
                className="bg-essence hover:bg-cyan-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  onSetDefault={() => handleSetDefaultPayment(method.id)}
                  onDelete={() => handleDeletePayment(method.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Secure payments:</span> All payment
                information is encrypted and securely stored. We never see or store your full
                card details.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Billing History</h2>
              <p className="text-sm text-gray-600">View and download your past invoices</p>
            </div>
          </div>

          {invoices.length === 0 ? (
            <Card className="p-12 text-center border-2 border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-600">
                Your billing history will appear here once you subscribe
              </p>
            </Card>
          ) : (
            <Card className="bg-white border-2 border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <InvoiceItem
                    key={invoice.id}
                    invoice={invoice}
                    onDownload={() => handleDownloadInvoice(invoice.id)}
                  />
                ))}
              </div>
            </Card>
          )}
        </div>

        <Card className="p-6 bg-gray-50 border-2 border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need help with billing?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help with any billing questions or issues you may
                have.
              </p>
              <Button variant="outline" className="border-2 border-gray-300">
                Contact Support
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <AddPaymentMethodModal
        isOpen={addPaymentModalOpen}
        onClose={() => setAddPaymentModalOpen(false)}
        onAdd={handleAddPayment}
      />

      <CancelSubscriptionModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelSubscription}
        currentPlan={currentPlan}
        billingCycle={billingCycle}
        nextBillingDate={nextBillingDate}
      />

      <DowngradeWarningModal
        isOpen={downgradeModalOpen}
        onClose={() => setDowngradeModalOpen(false)}
        onConfirm={handleConfirmDowngrade}
        reportsCount={15}
        exportsCount={8}
      />
    </div>
  );
}
