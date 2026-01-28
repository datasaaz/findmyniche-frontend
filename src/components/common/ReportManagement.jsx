import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Trash2,
  Edit2,
  Star,
  Share2,
  Copy,
  Mail,
  Link2,
  X,
  Check,
  AlertTriangle,
  Calendar,
  Lock,
  Globe,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

export function DeleteReportModal({
  isOpen,
  onClose,
  onConfirm,
  reportTitle,
  isPermanent = false,
}) {
  const [confirmText, setConfirmText] = useState("");
  const requiresConfirmation = isPermanent;

  if (!isOpen) return null;

  const canDelete = !requiresConfirmation || confirmText === "DELETE";

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
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Delete this report?
          </h2>

          <p className="text-base text-gray-600 mb-2 text-center">
            <span className="font-semibold">{reportTitle}</span>
          </p>

          {isPermanent ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-1">
                    This action cannot be undone
                  </p>
                  <p className="text-sm text-red-800 mb-3">
                    This report and all associated data will be permanently deleted.
                  </p>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-red-900">
                      Type <span className="font-bold">DELETE</span> to confirm
                    </label>
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="DELETE"
                      className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-6 text-center">
              You can always generate a new report for this location.
            </p>
          )}

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!canDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function RenameReportModal({ isOpen, onClose, onSave, currentTitle }) {
  const [title, setTitle] = useState(currentTitle);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() && title !== currentTitle) {
      onSave(title.trim());
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
            <h2 className="text-2xl font-bold text-gray-900">Rename report</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Report title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter report title"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Choose a memorable name for this report
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
              onClick={handleSave}
              disabled={!title.trim() || title === currentTitle}
              className="flex-1 bg-essence hover:bg-cyan-300 text-white font-semibold"
            >
              <Check className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ShareReportModal({
  isOpen,
  onClose,
  onGenerateLink,
  onSendEmail,
  reportTitle,
  userPlan,
  onUpgrade,
}) {
  const [shareLink, setShareLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [linkExpiration, setLinkExpiration] = useState("7d");
  const [requirePassword, setRequirePassword] = useState(false);

  const isPro = userPlan === "pro";

  if (!isOpen) return null;

  const handleGenerateLink = async () => {
    if (!isPro) {
      onUpgrade();
      return;
    }

    setIsGeneratingLink(true);
    try {
      const link = await onGenerateLink();
      setShareLink(link);
    } catch (error) {
      console.error("Failed to generate link:", error);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleSendEmail = async () => {
    if (!isPro) {
      onUpgrade();
      return;
    }

    if (!email.trim()) return;

    setIsSendingEmail(true);
    try {
      await onSendEmail(email);
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setEmail("");
      }, 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsSendingEmail(false);
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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b-2 border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Share report</h2>
              <p className="text-sm text-gray-600">{reportTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="px-8 py-6 space-y-6">
            {!isPro && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-amber-900 mb-2">
                    Sharing is a premium feature
                  </h3>
                  <p className="text-sm text-amber-800 mb-4">
                    Upgrade to share reports with colleagues and clients via public links or
                    email.
                  </p>
                  <Button
                    onClick={onUpgrade}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                  >
                    Upgrade to share
                  </Button>
                </div>
              </div>
            )}

            <div className={!isPro ? "opacity-50 pointer-events-none" : ""}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Public link
              </h3>

              {!shareLink ? (
                <>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Link expiration
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "7d", label: "7 days" },
                          { value: "30d", label: "30 days" },
                          { value: "never", label: "Never" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setLinkExpiration(option.value)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                              linkExpiration === option.value
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="requirePassword"
                        checked={requirePassword}
                        onChange={(e) => setRequirePassword(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="requirePassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Require password to view
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateLink}
                    disabled={isGeneratingLink}
                    className="w-full bg-essence hover:bg-cyan-300 text-white font-semibold"
                  >
                    {isGeneratingLink ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating link...
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 mr-2" />
                        Generate shareable link
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono text-gray-900 truncate">{shareLink}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <p className="text-xs text-gray-500">
                          Expires: {linkExpiration === "never" ? "Never" : linkExpiration}
                        </p>
                        {requirePassword && (
                          <>
                            <Lock className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-500">Password required</p>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      size="sm"
                      className={
                        linkCopied ? "bg-green-600 hover:bg-green-700" : "bg-essence hover:bg-cyan-300"
                      }
                    >
                      {linkCopied ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <Button
                    onClick={() => setShareLink("")}
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:bg-gray-50"
                  >
                    Generate new link
                  </Button>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            <div className={!isPro ? "opacity-50 pointer-events-none" : ""}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Send via email
              </h3>

              {emailSent ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">Email sent successfully!</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendEmail();
                    }}
                  />
                  <Button
                    onClick={handleSendEmail}
                    disabled={!email.trim() || isSendingEmail}
                    className="bg-essence hover:bg-cyan-300 text-white font-semibold"
                  >
                    {isSendingEmail ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Send"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 px-8 py-4">
            <p className="text-xs text-gray-500 text-center">
              Recipients will see a view-only version of this report
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ReportActionsMenu({
  onRename,
  onFavorite,
  onShare,
  onDuplicate,
  onDelete,
  isFavorited,
  userPlan,
}) {
  return (
    <div className="w-[220px] bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden">
      <button
        onClick={onFavorite}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <Star className={`w-4 h-4 ${isFavorited ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
        <span className="text-sm font-medium text-gray-700">
          {isFavorited ? "Remove from favorites" : "Add to favorites"}
        </span>
      </button>

      <button
        onClick={onRename}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <Edit2 className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Rename</span>
      </button>

      <button
        onClick={onShare}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <Share2 className="w-4 h-4 text-gray-600" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Share</span>
          {userPlan === "free" && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">
              Pro
            </Badge>
          )}
        </div>
      </button>

      {onDuplicate && (
        <button
          onClick={onDuplicate}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
        >
          <Copy className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Duplicate</span>
        </button>
      )}

      <div className="border-t-2 border-gray-200"></div>

      <button
        onClick={onDelete}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
        <span className="text-sm font-medium text-red-600">Delete</span>
      </button>
    </div>
  );
}
