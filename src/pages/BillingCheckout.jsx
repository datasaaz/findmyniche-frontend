import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  TrendingUp,
  Check,
  CreditCard,
  Lock,
  CheckCircle,
  Loader2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export function BillingCheckout({ onBack, onSuccess, userEmail = "", monthlyPrice = "€29" } = {}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState(userEmail || state?.userEmail || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("Ireland");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      setExpiry(value.substring(0, 2) + "/" + value.substring(2, 4));
    } else {
      setExpiry(value);
    }
  };

  const getCardBrand = () => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === "4") return "visa";
    if (firstDigit === "5") return "mastercard";
    if (firstDigit === "3") return "amex";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !cardNumber || !expiry || !cvc || !country) {
      setError("Please fill in all payment details");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 13) {
      setError("Please enter a valid card number");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/payment-success", { state: { userEmail: email, monthlyPrice } });
      }
    }, 2500);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[720px] mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 border-2 border-green-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">Plan</span>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-essence rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <span className="text-sm font-bold text-blue-600">Payment</span>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">3</span>
              </div>
              <span className="text-sm font-medium text-gray-600 hidden sm:inline">Access</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Subscription</h1>
          <p className="text-lg text-gray-600">Unlock full access to your market reports</p>
        </div>

        <Card className="p-8 mb-8 border-2 border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pro Plan</h2>
              <p className="text-sm text-gray-600 mt-1">Billed monthly</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{monthlyPrice}</div>
              <p className="text-sm text-gray-600">/month</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            <span className="font-medium text-gray-900">Cancel anytime.</span> No long-term contracts or hidden fees.
          </p>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">What's included</h3>
            <div className="space-y-3">
              {[
                "Unlimited full market reports",
                "Unmasked insights & recommendations",
                "Saved report history & access",
                "Export reports to PDF",
                "Priority report processing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Change plan</button>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment details</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-sm font-semibold text-gray-900">Card number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="pl-10 pr-16 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <div
                      className={`w-8 h-6 rounded border ${
                        getCardBrand() === "visa"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 bg-white opacity-40"
                      } flex items-center justify-center text-xs font-bold`}
                    >
                      💳
                    </div>
                    <div
                      className={`w-8 h-6 rounded border ${
                        getCardBrand() === "mastercard"
                          ? "border-orange-600 bg-orange-50"
                          : "border-gray-300 bg-white opacity-40"
                      } flex items-center justify-center text-xs`}
                    >
                      🔴
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Secure payments powered by Stripe
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-semibold text-gray-900">Expiry date</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvc" className="text-sm font-semibold text-gray-900">CVC</Label>
                  <Input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").substring(0, 4))}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Billing information</h2>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-900">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  required
                />
                <p className="text-xs text-gray-500">Receipt will be sent to this email</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-semibold text-gray-900">Country</Label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-12 px-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-white text-gray-900"
                  required
                >
                  <option value="">Select country</option>
                  <option value="Ireland">Ireland</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing payment...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Subscribe & Unlock Report
                </>
              )}
            </Button>
          </div>

          <div className="text-center">
            <button onClick={handleBack} type="button" className="text-sm text-gray-500 hover:text-gray-700">
              Back
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
