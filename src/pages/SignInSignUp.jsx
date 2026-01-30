import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { TrendingUp, Mail, Lock, User, ArrowLeft } from "lucide-react";

export function SignInSignUp({ onBack, onSuccess } = {}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isFormValid =
    mode === "signin"
      ? email.trim() !== "" && password.trim() !== ""
      : email.trim() !== "" && password.trim() !== "" && name.trim() !== "" && password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signin" && email === "saadattakhan@gmail.com" && password === "12345678") {
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/dashboard");
      }
      return;
    }

    if (mode === "signup" && isFormValid) {
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/dashboard");
      }
      return;
    }

    if (mode === "signin") {
      alert(
        "Invalid email or password. Please try:\nEmail: saadattakhan@gmail.com\nPassword: 12345678"
      );
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </button>
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Report
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 py-16">
        <Card className="p-8 bg-white border border-gray-200 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {mode === "signin" ? "Welcome back" : "Get started free"}
            </h1>
            <p className="text-gray-600">
              {mode === "signin"
                ? "Sign in to access your reports"
                : "Create an account to unlock full market reports"}
            </p>
            {mode === "signin" && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-left">
                <p className="text-xs font-medium text-blue-900 mb-1">Demo Credentials:</p>
                <p className="text-xs text-blue-700">Email: saadattakhan@gmail.com</p>
                <p className="text-xs text-blue-700">Password: 12345678</p>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full h-11 border-gray-300 hover:bg-gray-50" type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-11 border-gray-300 hover:bg-gray-50" type="button">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 border-gray-300"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 border-gray-300"
                  required
                />
              </div>
              {mode === "signup" && (
                <p className="text-xs text-gray-500">Must be at least 8 characters</p>
              )}
            </div>

            {mode === "signin" && (
              <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full h-11 bg-essence hover:bg-cyan-300" disabled={!isFormValid}>
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {mode === "signup" && (
            <p className="mt-6 text-xs text-center text-gray-500">
              By creating an account, you agree to our{" "}
              <button onClick={() => navigate("/terms")} className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </button>{" "}
              and{" "}
              <button onClick={() => navigate("/privacy")} className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </button>
            </p>
          )}
        </Card>

        {mode === "signup" && (
          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium text-gray-700 text-center mb-4">
              What you'll get with your account:
            </p>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Full market reports</p>
                <p className="text-xs text-gray-600">Deep-dive analysis with competitor insights</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Save & export reports</p>
                <p className="text-xs text-gray-600">Access your reports anytime, anywhere</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Priority support</p>
                <p className="text-xs text-gray-600">Get help when you need it</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
