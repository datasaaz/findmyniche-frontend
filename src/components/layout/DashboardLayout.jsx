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

export function DashboardLayout() {
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userPlan = "free";

  const handleLogout = () => {
    // Add logout logic here later
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-700 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">findmyniche</span>
          </div>

          <nav className="space-y-1">
            <NavLink to="/dashboard" className={getNavClass}>
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </NavLink>
            <NavLink to="/input" className={getNavClass}>
              <PlusCircle className="w-5 h-5" />
              Create new report
            </NavLink>
            <NavLink to="/reports" className={getNavClass}>
              <FileText className="w-5 h-5" />
              Reports
            </NavLink>
            <NavLink to="/billing" className={getNavClass}>
              <CreditCard className="w-5 h-5" />
              Billing
            </NavLink>
            <NavLink to="/settings" className={getNavClass}>
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
            <NavLink to="/contact" className={getNavClass}>
              <HelpCircle className="w-5 h-5" />
              Help / Support
            </NavLink>
          </nav>
        </div>
      </aside>

      <div className="flex-1 ml-64">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge
                className={
                  userPlan === "pro"
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
              >
                {userPlan === "pro" ? "Pro plan" : "Free plan"}
              </Badge>
            </div>

            <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">user@example.com</span>
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
