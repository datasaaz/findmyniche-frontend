import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import {
  User,
  Settings as SettingsIcon,
  Shield,
  CreditCard,
  Bell,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  Check,
  Crown,
  Smartphone,
  Globe,
  MapPin,
  Calendar,
  FileText,
  LogOut,
  Trash2,
  Key,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export function Settings({ userPlan = "free", onBack, onManageBilling } = {}) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");

  const [fullName, setFullName] = useState("John Doe");
  const [email] = useState("saadattakhan@gmail.com");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("Austria");
  const [profileSaved, setProfileSaved] = useState(false);

  const [defaultRadius, setDefaultRadius] = useState("500");
  const [useGoogleMaps, setUseGoogleMaps] = useState(true);
  const [useYelp, setUseYelp] = useState(true);
  const [useWebScraping, setUseWebScraping] = useState(true);
  const [reportLanguage, setReportLanguage] = useState("en");
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [activeSessions] = useState([
    { id: 1, device: "Chrome on MacBook Pro", location: "Vienna, Austria", lastActive: "Active now" },
    { id: 2, device: "Safari on iPhone 15", location: "Vienna, Austria", lastActive: "2 hours ago" },
    { id: 3, device: "Chrome on Windows", location: "Salzburg, Austria", lastActive: "3 days ago" },
  ]);

  const [notifyReportComplete, setNotifyReportComplete] = useState(true);
  const [notifyUsageSummary, setNotifyUsageSummary] = useState(true);
  const [notifyBilling, setNotifyBilling] = useState(true);
  const [notifyProductUpdates, setNotifyProductUpdates] = useState(false);

  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const billingInfo = {
    reportsUsed: userPlan === "pro" ? 12 : 3,
    reportsLimit: userPlan === "pro" ? "Unlimited" : "3",
    nextBillingDate: userPlan === "pro" ? "February 8, 2026" : null,
    amount: userPlan === "pro" ? "$49.00" : null,
  };

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSavePreferences = () => {
    setPreferencesSaved(true);
    setTimeout(() => setPreferencesSaved(false), 3000);
  };

  const handleLogoutSession = (sessionId) => {
    console.log("Logout session:", sessionId);
  };

  const handleDeleteAccount = () => {
    if (deletePassword === "12345678") {
      console.log("Account deleted");
      setShowDeleteAccountDialog(false);
      setDeletePassword("");
    }
  };

  const handleClearHistory = () => {
    console.log("History cleared");
    setShowClearHistoryDialog(false);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate("/dashboard");
  };

  const handleManageBilling = () => {
    if (onManageBilling) {
      onManageBilling();
      return;
    }
    navigate("/billing");
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">findmyniche</span>
            </button>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={
                  userPlan === "pro"
                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-900 border-amber-200 gap-1"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }
              >
                {userPlan === "pro" && <Crown className="w-3 h-3" />}
                {userPlan === "pro" ? "Pro" : "Free"} Plan
              </Badge>
            </div>
          </div>
        </div>
      </nav> */}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 px-3">Settings</h2>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const isDanger = section.id === "danger";

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? isDanger
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 max-w-3xl">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Profile Information</h1>
                  <p className="text-sm text-gray-600">Manage your personal account details</p>
                </div>

                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-900 mb-2 block">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="max-w-md"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2 block">
                        Email Address
                      </Label>
                      <div className="flex items-center gap-2 max-w-md">
                        <Input id="email" value={email} disabled className="bg-gray-50 text-gray-600" />
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex-shrink-0">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">Contact support to change your email address</p>
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-gray-900 mb-2 block">
                        Company / Project Name <span className="text-gray-400 font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g., My Startup Inc."
                        className="max-w-md"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-sm font-medium text-gray-900 mb-2 block">
                        Country / Region
                      </Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="max-w-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Austria">Austria</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="Switzerland">Switzerland</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-3">
                      <Button onClick={handleSaveProfile} className="bg-essence hover:bg-cyan-300">
                        Save Changes
                      </Button>
                      {profileSaved && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Changes saved successfully</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Analysis Preferences</h1>
                  <p className="text-sm text-gray-600">Customize default settings for your reports</p>
                </div>

                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="radius" className="text-sm font-medium text-gray-900 mb-2 block">
                        Default Search Radius
                      </Label>
                      <Select value={defaultRadius} onValueChange={setDefaultRadius}>
                        <SelectTrigger className="max-w-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="250">250 meters</SelectItem>
                          <SelectItem value="500">500 meters</SelectItem>
                          <SelectItem value="1000">1 kilometer</SelectItem>
                          <SelectItem value="2000">2 kilometers</SelectItem>
                          <SelectItem value="5000">5 kilometers</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1.5">
                        This radius will be used by default for new market analyses
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium text-gray-900 mb-3 block">Preferred Data Sources</Label>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Google Maps</p>
                              <p className="text-xs text-gray-500">Business listings and reviews</p>
                            </div>
                          </div>
                          <Switch checked={useGoogleMaps} onCheckedChange={setUseGoogleMaps} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">⭐</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Yelp</p>
                              <p className="text-xs text-gray-500">Consumer reviews and ratings</p>
                            </div>
                          </div>
                          <Switch checked={useYelp} onCheckedChange={setUseYelp} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Globe className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Website Scraping</p>
                              <p className="text-xs text-gray-500">Public web data analysis</p>
                            </div>
                          </div>
                          <Switch checked={useWebScraping} onCheckedChange={setUseWebScraping} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Select which data sources to include in your market analyses
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="language" className="text-sm font-medium text-gray-900 mb-2 block">
                        Report Language
                      </Label>
                      <Select value={reportLanguage} onValueChange={setReportLanguage}>
                        <SelectTrigger className="max-w-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-3">
                      <Button onClick={handleSavePreferences} className="bg-essence hover:bg-cyan-300">
                        Save Preferences
                      </Button>
                      {preferencesSaved && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Preferences saved</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Security Settings</h1>
                  <p className="text-sm text-gray-600">Manage your password and account security</p>
                </div>

                <Card className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Key className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Change password</p>
                        <p className="text-xs text-gray-500">Update your password regularly</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                      Update
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                        <p className="text-xs text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h2>
                  <div className="space-y-4">
                    {activeSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{session.device}</p>
                            <p className="text-xs text-gray-500">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {session.lastActive !== "Active now" && (
                          <Button variant="outline" size="sm" onClick={() => handleLogoutSession(session.id)}>
                            Log out
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Billing & Subscription</h1>
                  <p className="text-sm text-gray-600">Manage your plan and payment details</p>
                </div>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Current plan</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {userPlan === "pro" ? "Pro" : "Free"}
                      </p>
                    </div>
                    {userPlan === "pro" && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Reports used</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {billingInfo.reportsUsed} / {billingInfo.reportsLimit}
                      </p>
                    </div>
                    {billingInfo.nextBillingDate && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Next billing date</p>
                        <p className="text-lg font-semibold text-gray-900">{billingInfo.nextBillingDate}</p>
                      </div>
                    )}
                    {billingInfo.amount && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                        <p className="text-lg font-semibold text-gray-900">{billingInfo.amount} / month</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    {userPlan === "pro" ? (
                      <Button variant="outline" onClick={handleManageBilling}>
                        Manage billing
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button className="bg-essence hover:bg-cyan-300" onClick={handleManageBilling}>
                        Upgrade to Pro
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Notification Preferences</h1>
                  <p className="text-sm text-gray-600">Choose when we send you updates</p>
                </div>

                <Card className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Report completed</p>
                      <p className="text-xs text-gray-500">Get notified when your report is ready</p>
                    </div>
                    <Switch checked={notifyReportComplete} onCheckedChange={setNotifyReportComplete} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Usage summary</p>
                      <p className="text-xs text-gray-500">Monthly summary of your activity</p>
                    </div>
                    <Switch checked={notifyUsageSummary} onCheckedChange={setNotifyUsageSummary} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Billing updates</p>
                      <p className="text-xs text-gray-500">Payment confirmations and receipts</p>
                    </div>
                    <Switch checked={notifyBilling} onCheckedChange={setNotifyBilling} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product updates</p>
                      <p className="text-xs text-gray-500">News about new features</p>
                    </div>
                    <Switch checked={notifyProductUpdates} onCheckedChange={setNotifyProductUpdates} />
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "danger" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">Danger Zone</h1>
                  <p className="text-sm text-gray-600">Proceed with caution</p>
                </div>

                <Card className="p-6 space-y-6 border-2 border-red-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Clear report history</p>
                      <p className="text-xs text-gray-500">Remove all saved reports from your account</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-200" onClick={() => setShowClearHistoryDialog(true)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delete account</p>
                      <p className="text-xs text-gray-500">Permanently delete your account and data</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-200" onClick={() => setShowDeleteAccountDialog(true)}>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>Use a strong password to keep your account secure.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Current password</Label>
              <Input type="password" placeholder="••••••••" className="mt-2" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">New password</Label>
              <Input type="password" placeholder="••••••••" className="mt-2" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-essence hover:bg-cyan-300">Update password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please enter your password to confirm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAccountDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
              Delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showClearHistoryDialog} onOpenChange={setShowClearHistoryDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear history</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all reports from your account. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowClearHistoryDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory} className="bg-red-600 hover:bg-red-700">
              Clear history
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
