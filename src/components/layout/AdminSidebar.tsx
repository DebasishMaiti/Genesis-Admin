import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home, LogOut, Menu, X, BookOpen, GraduationCap,
  Landmark, Briefcase, ListChecks, ChevronUp, ChevronDown, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

type ExpandedItemsType = {
  Courses: boolean;
  GovtExams: boolean;
  ProfCourses: boolean;
  MCQSeries: boolean;
  Books: boolean;
  MockTests: boolean;
};

export function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<ExpandedItemsType>({
    Courses: false,
    GovtExams: false,
    ProfCourses: false,
    MCQSeries: false,
    Books: false,
    MockTests: false,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      icon: Home,
      to: "/dashboard",
    },
    {
      label: "Courses",
      icon: GraduationCap,
      to: "/admin/courses",
      submenu: [
        { label: "Course List", to: "/course", icon: ListChecks },
        { label: "Add Course", to: "/course-add", icon: Plus },
      ],
    },
    {
      label: "Govt. Exams",
      icon: Landmark,
      to: "/admin/gov-exams",
      submenu: [    
        { label: "Exam List", to: "/gov-exam", icon: ListChecks },
        { label: "Add Exam", to: "/gov-exam-add", icon: Plus },
        { label: "Create Subject", to: "/create-subject", icon: Plus },
      ],
    },
    {
      label: "Academics",
      icon: Briefcase,
      to: "/admin/prof-courses",
      submenu: [
        { label: "Academics List", to: "/academics", icon: ListChecks },
        { label: "Add Academics", to: "/academics-add", icon: Plus },
      ],
    },
    {
      label: "MCQ Series",
      icon: ListChecks,
      to: "/admin/mcq-series",
      submenu: [
        { label: "MCQ Series List", to: "/mcq", icon: ListChecks },
        { label: "Add MCQ Series", to: "/mcq-add", icon: Plus },
      ],
    },
    {
      label: "Books",
      icon: BookOpen,
      to: "/admin/books",
      submenu: [
        { label: "Book List", to: "/book", icon: ListChecks },
        { label: "Add Book", to: "/book-add", icon: Plus },
      ],
    },
    // {
    //   label: "Mock Tests",
    //   icon: ClipboardList,
    //   to: "/mock-tests",
    //   submenu: [
    //     { label: "Mock Test List", to: "/mock", icon: ListChecks },
    //     { label: "Add Mock Test", to: "/mock-add", icon: Plus },
    //   ],
    // },
  ];

  const adminUser = {
    name: "Admin Master",
    email: "admin@platform.com",
    avatar: null,
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedItems({
      Courses: false,
      GovtExams: false,
      ProfCourses: false,
      MCQSeries: false,
      Books: false,
      MockTests: false,
    });
  };

  const toggleSubmenu = (label: string) => {
    const key = label.replace(/\./g, '').replace(/\s+/g, '') as keyof ExpandedItemsType;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
                                                                                                                                                                                                                        
  useEffect(() => {                                                                                                                                                                                                                        
    function handleClickOutside(event: MouseEvent) {                                                                                                                                                                                                                        
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {                                                                                                                                                                                                                        
        setIsProfileDropdownOpen(false);                                                                                                                                                                                                                        
      }                                                                                                                                                                                                                        
    }                                                                                                                                                                                                                        
                                                                                                                                                                                                                        
    document.addEventListener("mousedown", handleClickOutside);                                                                                                                                                                                                                        
    return () => document.removeEventListener("mousedown", handleClickOutside);                                                                                                                                                                                                                        
  }, []);                                                                                                                                                                                                                        
                                                                                                                                                                                                                        
  return (                                                                                                                                                                                                                        
    <>                                                                                                                                                                                                                        
      {/* Mobile Header */}                                                                                                                                                                                                                        
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">                                                                                                                                                                                                                        
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={adminUser.avatar || undefined} alt={adminUser.name} />
              <AvatarFallback className="bg-destructive text-destructive-foreground text-sm">
                {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {adminUser.name}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-80 bg-background border-r border-border shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Header Inside Sidebar */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={adminUser.avatar || undefined} alt={adminUser.name} />
                <AvatarFallback className="bg-destructive text-destructive-foreground">
                  {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {adminUser.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {adminUser.email}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedItems[item.label.replace(/\./g, '').replace(/\s+/g, '') as keyof ExpandedItemsType];

              return (
                <div key={item.label} className="space-y-1">
                  {item.submenu ? (
                    <>
                      {/* Parent Menu Item with Submenu */}
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                          window.location.pathname.startsWith(item.to)
                            ? "bg-destructive text-destructive-foreground shadow-md"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>                
                      {/* Submenu Items */}
                      {isExpanded && (
                        <div className="ml-8 space-y-1">
                          {item.submenu.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <NavLink
                                key={subItem.label}
                                to={subItem.to}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                  `group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                                    isActive
                                      ? "bg-destructive/80 text-destructive-foreground font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                  }`
                                }
                              >
                                <SubIcon className="w-4 h-4" />
                                <span>{subItem.label}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `group w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-destructive text-destructive-foreground shadow-md"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Logout */}
          <div className="border-t border-border bg-muted/20 p-4">
            <Button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              variant="outline"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:border-destructive/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
        
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-72 bg-background border-r border-border flex-col justify-between shadow-lg">
        {/* Top Section */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedItems[item.label.replace(/\./g, '').replace(/\s+/g, '') as keyof ExpandedItemsType];

              return (
                <div key={item.label} className="space-y-1">
                  {item.submenu ? (
                    <>
                      {/* Parent Menu Item with Submenu */}
                      <button
                        onClick={() => toggleSubmenu(item.label)}
                        className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                          window.location.pathname.startsWith(item.to)
                            ? "bg-destructive text-destructive-foreground shadow-md"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {/* Submenu Items */}
                      {isExpanded && (
                        <div className="ml-6 space-y-1 overflow-hidden">
                          {item.submenu.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <NavLink
                                key={subItem.label}
                                to={subItem.to}
                                className={({ isActive }) =>
                                  `group flex items-center gap-3 px-6 py-2 rounded-lg transition-all duration-200 text-sm ${
                                    isActive
                                      ? "bg-destructive/80 text-destructive-foreground font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                  }`
                                }
                              >
                                <SubIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{subItem.label}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `group w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-destructive text-destructive-foreground shadow-md"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section - User Profile & Dropdown */}
        <div className="border-t border-border bg-background p-4">
          <div className="relative" ref={dropdownRef}>
            {/* User Profile Button */}
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 hover:bg-muted/50 rounded-lg p-2 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={adminUser.avatar || undefined} alt={adminUser.name} />
                  <AvatarFallback className="bg-destructive text-destructive-foreground">
                    {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {adminUser.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {adminUser.email}
                  </p>
                </div>
              </div>
              <ChevronUp
                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute bottom-full right-0 left-0 mb-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={adminUser.avatar || undefined} alt={adminUser.name} />
                      <AvatarFallback className="bg-destructive text-destructive-foreground">
                        {adminUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {adminUser.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {adminUser.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}