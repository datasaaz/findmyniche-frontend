import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Target, ArrowLeft, Mail, Send, Clock, MapPin } from "lucide-react";
import { submitContact } from "../utils/api";

export function Contact({ onBack } = {}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Support");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const contactMutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setReason("Support");
        setMessage("");
      }, 10000);
    },
    onError: (error) => {
      console.error("Failed to submit contact form:", error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      topic: "beta",
      page_context: "contact",
      timestamp: new Date().toISOString()
    };

    contactMutation.mutate(payload);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  const isFormValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";
  const isLoading = contactMutation.isPending;

  return (
    <div className="min-h-screen bg-white">
      {/* <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
      </nav> */}

      <div className="max-w-4xl mx-auto px- py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We're here to help</p>
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-1 space-y-6">
            <Card className="  p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-essence" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:support@findmyniche.com" className="text-essence hover:text-cyan-300 mb-2 ">
                    support@findmyniche.com
                  </a>
                  <p className="text-sm text-gray-600">For support, billing, or general questions</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-essence rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-sm text-gray-700">
                    We typically respond within <strong>1–2 business days</strong>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                  <p className="text-sm text-gray-700 mb-1">findmyniche</p>
                  <p className="text-sm text-gray-600">United States</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-8 border border-gray-200">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 1–2 business days.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Send us a message</h2>
                    <p className="text-gray-600">Fill out the form below and we'll respond as soon as possible</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                        Reason
                      </Label>
                      <select
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full h-11 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Support">Support</option>
                        <option value="Billing">Billing</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        placeholder="How can we help you?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full min-h-[150px] px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || isLoading}
                      className="w-full h-12 bg-essence hover:bg-cyan-300 text-base font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            For urgent issues, please email us directly at{" "}
            <a href="mailto:support@findmyniche.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@findmyniche.com
            </a>
          </p>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2026 findmyniche. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
