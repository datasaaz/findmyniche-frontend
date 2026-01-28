import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { Dashboard } from "./pages/Dashboard";
import { LocationCategoryInput } from "./pages/LocationInput";
import { ReportPreview } from "./pages/ReportPreview";
import { ReportPage } from "./pages/ReportPage";
import { ReportDetail } from "./pages/ReportDetail";
import { SignInSignUp } from "./pages/SignInSignUp";
import { BillingSubscription } from "./pages/BillingSubscription";
import { BillingCheckout } from "./pages/BillingCheckout";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { ReportLoading } from "./pages/ReportLoading";
import { ReportError } from "./pages/ReportError";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Contact } from "./pages/Contact";
import { Settings } from "./pages/Settings";
import { ReportList } from "./pages/ReportList";
import { About } from "./pages/About";
import { OurData } from "./pages/OurData";
import { BillingPage } from "./pages/BillingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/input" element={<LocationCategoryInput />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth" element={<SignInSignUp />} />
          <Route path="/preview" element={<ReportPreview />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/report/detail" element={<ReportDetail />} />
          <Route path="/billing/upgrade" element={<BillingSubscription />} />
          <Route path="/checkout" element={<BillingCheckout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/report-loading" element={<ReportLoading />} />
          <Route path="/report-error" element={<ReportError />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<OurData />} />
        </Route>

        {/* Dashboard/Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/billing" element={<BillingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}
