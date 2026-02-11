import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { MailCheck, Loader2, RefreshCw, ArrowLeft } from "lucide-react";
import { auth } from "../firebase";
import { resendVerificationEmail } from "../utils/auth";

export function EmailVerificationPage() {
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
    if (user?.emailVerified) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage("");
    setError("");
    try {
      await resendVerificationEmail(user);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a moment before trying again.");
      } else {
        setError("Failed to resend email. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    setIsChecking(true);
    setMessage("");
    setError("");
    try {
      await user.reload();
      if (user.emailVerified) {
        navigate("/dashboard");
      } else {
        setError("Email not verified yet. Please check your inbox and click the verification link.");
      }
    } catch (err) {
      setError("Could not check verification status. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <MailCheck className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <h1 className="text-[28px] font-bold text-gray-900">Verify your email</h1>
              <p className="text-[16px] text-gray-600 mt-2">
                We've sent a verification link to
              </p>
              <p className="text-[16px] font-semibold text-gray-900 mt-1">
                {user?.email}
              </p>
            </div>

            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700 text-center">
                Please check your inbox and click the verification link to activate your account. Don't forget to check your spam folder.
              </p>
            </div>

            {message && (
              <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-sm text-green-700 text-center">{message}</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-sm text-red-700 text-center">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleCheckVerification}
                disabled={isChecking}
                className="w-full h-12 bg-essence hover:bg-cyan-300 text-white text-lg font-semibold shadow-lg"
              >
                {isChecking ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    I've verified my email
                  </>
                )}
              </Button>

              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                variant="outline"
                className="w-full h-12 border-2 text-lg font-semibold"
              >
                {isResending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Resend verification email"
                )}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
