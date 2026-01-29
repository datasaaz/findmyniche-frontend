import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Target, 
  Menu, 
  X, 
  ChevronDown, 
  Database, 
  Info,
  ArrowRight
} from "lucide-react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "../ui/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const navLinks = [
    { name: "How it works", id: "how-it-works", description: "Learn our 4-step analysis process" },
    { name: "Example insights", id: "example-insights", description: "See what a market report looks like" },
    { name: "Pricing", id: "pricing", description: "Simple, transparent plans " },
    // { name: "Contact", id: "contact", isPath: true, description: "Get in touch with our team" },
  ];

  const companyLinks = [
    { name: "Our Data", path: "/data", icon: Database, description: "How we collect and process market data" },
    { name: "About", path: "/about", icon: Info, description: "Our mission and the team behind Find My Niche" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] bg-white h-[64px] flex items-center overflow-visible",
        scrolled 
          ? "shadow-sm border-b border-gray-100" 
          : "border-b border-transparent"
      )}
      style={{ top: 0, position: 'fixed' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between h-full">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group h-full" 
          onClick={handleLogoClick}
        >
          <div className="w-8 h-8 bg-essence rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-dark tracking-tight">findmyniche</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center h-full">
          
        </div>

        {/* Desktop CTAs (Sensor Tower Style) */}
        <div className="hidden md:flex items-center gap-3">
          <NavigationMenu className="relative">
            <NavigationMenuList className="items-center gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name} className="relative">
                  <NavigationMenuTrigger 
                    onClick={() => link.isPath ? navigate(link.id) : scrollToSection(link.id)}
                    className="bg-transparent cursor-pointer hover:bg-gray-100 text-gray-800 hover:text-black font-semibold text-[16px] px-4 py-2 h-auto rounded-md transition-colors data-[state=open]:bg-gray-50 border-none"
                  >
                    {link.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-1/2 top-full -translate-x-1/2 mt-2 overflow-visible">
                    <div className="relative">
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rotate-45 z-[-1]  border border-gray-300"></span>
                      <div className="w-64 p-4 bg-white shadow-xl rounded-xl border border-gray-100">
                        <p className="text-sm text-gray-900 text-center leading-relaxed font-medium">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className=" cursor-pointer bg-transparent  hover:bg-gray-100 text-gray-800 hover:text-black font-semibold text-[16px] px-4 py-2 h-auto rounded-md transition-colors data-[state=open]:bg-gray-50 border-none">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-1/2 top-full  -translate-x-1/2 mt-2 overflow-visible">
                  <div className="relative">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-[-1] w-8 h-8 rotate-45 bg-red border border-gray-300"></span>
                    <div className="w-72 p-2 bg-white shadow-xl rounded-xl border border-gray-100">
                      {companyLinks.map((item) => (
                        <div 
                          key={item.name}
                          onClick={() => {
                            navigate(item.path);
                          }}
                          className="flex flex-col items-start p-3 gap-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors group/item"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <item.icon className="w-4 h-4 text-essence" />
                            <span className="font-semibold text-dark group-hover/item:text-essence transition-colors">{item.name}</span>
                          </div>
                          <p className="text-xs text-gray-900 leading-relaxed pl-6">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            onClick={() => navigate("/input")}
            className=" fs-16 cursor-pointer bg-dark hover:bg-dark/90  text-white shadow-sm px-6 py-5 rounded-full font-semibold text-sm border-none"
          >
            Contact Sales
          </Button>
          <Button 
            onClick={() => navigate("/login")}
            className=" fs-16 cursor-pointer bg-dark hover:bg-dark/90   text-white shadow-sm px-6 py-5 rounded-full font-semibold text-sm border-none"
          >
            Log In
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className=" cursor-pointer md:hidden p-2 text-gray-600 hover:text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-6 py-8 space-y-6 overflow-y-auto max-h-[80vh]">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => link.isPath ? navigate(link.id) : scrollToSection(link.id)}
                  className=" cursor-pointer block w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile Company Accordion */}
              <div className="space-y-4">
                <button 
                  onClick={() => setCompanyOpen(!companyOpen)}
                  className=" cursor-pointer flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Company
                  {/* <ChevronDown className={cn("w-5 h-5 transition-transform", companyOpen && "rotate-180")} /> */}
                </button>
                {companyOpen && (
                  <div className="pl-4 space-y-4 border-l-2 border-gray-100">
                    {companyLinks.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.path);
                          setIsOpen(false);
                        }}
                        className=" cursor-pointer flex flex-col gap-1 w-full text-left hover:bg-gray-50 rounded-lg transition-colors group/item"
                      >
                        <span className="text-base font-medium text-gray-800">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className=" fs- w-full h-12 text-lg font-normal border-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Log In
              </Button>
              <Button 
                onClick={() => navigate("/input")}
                className="w-full h-12 text-lg font-normal bg-dark hover:bg-dark/90 rounded-full  transition-colors cursor-pointer"
              >
                Try for free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
