import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmail, signInWithGoogle, getFirebaseErrorMessage } from "../utils/auth";
import {
  TrendingUp,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  BarChart3,
} from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await signInWithEmail(email, password);
      if (!result.user.emailVerified) {
        navigate("/verify-email");
        return;
      }
      navigate("/dashboard");
    } catch (err) {
      const errorCode = err?.code || "";
      setError(getFirebaseErrorMessage(errorCode));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      const errorCode = err?.code || "";
      setError(getFirebaseErrorMessage(errorCode));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </Link>
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </nav> */}

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h1 className="text-[28px] font-bold text-gray-900">Welcome back</h1>
              <p className="text-[18px] text-gray-600">Log in to access your market reports</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-sm text-red-700 text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-essence hover:bg-cyan-300 text-white text-lg font-semibold shadow-lg"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log in"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 text-lg font-semibold bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 border-2 text-lg font-semibold"
            >
              Continue with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium text-lg">
              New to findmyniche?{" "}
              <Link to="/signup" className="font-semibold text-lg text-essence hover:text-cyan-600">
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
