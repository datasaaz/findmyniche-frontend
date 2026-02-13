import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Target,
  LayoutDashboard,
  PlusCircle,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logOut } from "../../utils/auth";
import { auth } from "../../firebase";




export function DashboardLayout() {
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userPlan = "free";

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all duration-200 ${
      isActive
        ? "bg-white/10 text-white font-medium"
        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-60 bg-[#1e2235] fixed h-full flex flex-col">
        <div className="p-5">
          <div className="flex items-center gap-2.5 mb-8 px-2">
            <div className="w-8 h-8 bg-essence rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">findmyniche</span>
          </div>

          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 px-4 mb-2">Main</p>
            <nav className="space-y-0.5">
              <NavLink to="/dashboard" className={getNavClass}>
                <LayoutDashboard className="w-[18px] h-[18px]" />
                Dashboard
              </NavLink>
              <NavLink to="/create-report" className={getNavClass}>
                <PlusCircle className="w-[18px] h-[18px]" />
                Create new report
              </NavLink>
              <NavLink to="/reports" className={getNavClass}>
                <FileText className="w-[18px] h-[18px]" />
                Reports
              </NavLink>
            </nav>
          </div>

          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 px-4 mb-2">Account</p>
            <nav className="space-y-0.5">
              <NavLink to="/billing" className={getNavClass}>
                <CreditCard className="w-[18px] h-[18px]" />
                Billing
              </NavLink>
              <NavLink to="/settings" className={getNavClass}>
                <Settings className="w-[18px] h-[18px]" />
                Settings
              </NavLink>
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 px-4 mb-2">Support</p>
            <nav className="space-y-0.5">
              <NavLink to="/support" className={getNavClass}>
                <HelpCircle className="w-[18px] h-[18px]" />
                Help / Support
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-60">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge
                className={
                  userPlan === "pro"
                    ? "bg-essence/10 text-essence border-essence/20"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
              >
                {userPlan === "pro" ? "Pro plan" : "Free plan"}
              </Badge>
            </div>

            <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-essence to-essence/40 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{auth.currentUser?.email}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/billing")} className="cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
