import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Shield, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface NavigationItem {
  label: string;
  href: string;
}

interface Logo {
  src: string;
  alt: string;
  href: string;
}

interface HeaderProps {
  logo: Logo;
  menu: NavigationItem[];
}

interface LoginState {
  step: 'role' | 'mobile' | 'otp';
  mobileNumber: string;
  otp: string;
  role: 'Student' | 'Teacher' | 'Admin' | null;
  error?: string;
}

export function Header({ logo, menu }: HeaderProps) {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const [loginState, setLoginState] = useState<LoginState>({
    step: 'role',
    mobileNumber: '',
    otp: '',
    role: null,
    error: ''
  });

  const DUMMY_MOBILE = "9876543210";
  const DUMMY_OTP = "123456";

  const resetLoginState = () => {
    setLoginState({
      step: 'role',
      mobileNumber: '',
      otp: '',
      role: null,
      error: ''
    });
  };

  const updateLoginState = (updates: Partial<LoginState>) => {
    setLoginState(prev => ({ ...prev, ...updates }));
  };

  const handleRoleSelection = (role: 'Student' | 'Teacher' | 'Admin') => {
    updateLoginState({ role, step: 'mobile', error: '' });
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mobile = loginState.mobileNumber;

    if (mobile.length !== 10) {
      updateLoginState({ error: 'Please enter a valid 10-digit mobile number' });
      return;
    }

    if (mobile !== DUMMY_MOBILE) {
      updateLoginState({ error: 'Mobile number not found. Please use 9876543210' });
      return;
    }

    updateLoginState({ step: 'otp', error: '' });

    toast({
      title: "OTP Sent!",
      description: `OTP sent to ${mobile}`,
    });
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = loginState.otp;

    if (otp.length !== 6) {
      updateLoginState({ error: 'Please enter a valid 6-digit OTP' });
      return;
    }

    if (otp !== DUMMY_OTP) {
      updateLoginState({ error: 'Invalid OTP. Please use 123456' });
      return;
    }

    setIsDialogOpen(false);
    setIsMobileDrawerOpen(false);
    setIsSheetOpen(false);

    resetLoginState();

    navigate(loginState.role === 'Admin' ? '/admin/dashboard' : '/user/dashboard');
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setIsMobileDrawerOpen(false);
      resetLoginState();
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetLoginState();
    }
  };

  const isAdmin = loginState.role === 'Admin';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:container md:px-6">
        {/* Logo */}
        <a href={logo.href} className="flex items-center space-x-2">
          <img src={logo.src} alt={logo.alt} className="h-12 w-12" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Login Dialog */}
        <div className="hidden md:flex">
          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={resetLoginState}>
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {loginState.step === 'role' ? 'Select Your Role' : 
                   loginState.step === 'mobile' ? 'Enter Mobile Number' : 'Enter OTP'}
                </DialogTitle>
                <DialogDescription>
                  {loginState.step === 'role'
                    ? 'Please select your role to proceed with login.'
                    : loginState.step === 'mobile'
                    ? `Enter your 10-digit mobile number (Demo: ${DUMMY_MOBILE})`
                    : `OTP sent to ${loginState.mobileNumber}. (Demo: ${DUMMY_OTP})`}
                </DialogDescription>
              </DialogHeader>
              {loginState.step === 'role' ? (
                <div className="grid grid-cols-3 gap-4 py-4">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => handleRoleSelection('Student')}
                  >
                    <User className="h-6 w-6" />
                    Student
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => handleRoleSelection('Teacher')}
                  >
                    <BookOpen className="h-6 w-6" />
                    Teacher
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => handleRoleSelection('Admin')}
                  >
                    <Shield className="h-6 w-6" />
                    Admin
                  </Button>
                </div>
              ) : (
                <form onSubmit={loginState.step === 'mobile' ? handleMobileSubmit : handleOtpSubmit} className="flex flex-col">
                  <div className="grid gap-4 py-4">
                    {loginState.error && (
                      <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
                        {loginState.error}
                      </div>
                    )}
                    {loginState.step === 'mobile' ? (
                      <div className="grid gap-2">
                        <Label htmlFor="mobile-desktop">Mobile Number</Label>
                        <div className="relative">
                          {isAdmin && (
                            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          )}
                          <Input
                            id="mobile-desktop"
                            type="tel"
                            placeholder="10 digit mobile number"
                            value={loginState.mobileNumber}
                            onChange={(e) => updateLoginState({
                              mobileNumber: e.target.value.replace(/\D/g, ''),
                              error: ''
                            })}
                            maxLength={10}
                            className={`text-lg ${isAdmin ? 'pl-10 border-primary' : ''}`}
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        <Label htmlFor="otp-desktop">One-Time Password</Label>
                        <div className="relative">
                          {isAdmin && (
                            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          )}
                          <Input
                            id="otp-desktop"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={loginState.otp}
                            onChange={(e) => updateLoginState({
                              otp: e.target.value.replace(/\D/g, ''),
                              error: ''
                            })}
                            maxLength={6}
                            className={`text-center text-lg tracking-widest ${isAdmin ? 'pl-10 border-primary' : ''}`}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter className="gap-2 sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className={`w-full sm:w-auto ${isAdmin ? 'bg-primary text-primary-foreground' : ''}`}
                      disabled={
                        loginState.step === 'mobile'
                          ? loginState.mobileNumber.length !== 10
                          : loginState.otp.length !== 6
                      }
                    >
                      {loginState.step === 'mobile' ? 'Send OTP' : 'Verify & Login'}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Menu Sheet */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {menu.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4">
                  <Drawer open={isMobileDrawerOpen} onOpenChange={(open) => {
                    setIsMobileDrawerOpen(open);
                    if (!open) resetLoginState();
                  }}>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full" onClick={resetLoginState}>
                        Login
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>
                          {loginState.step === 'role' ? 'Select Your Role' : 
                           loginState.step === 'mobile' ? 'Enter Mobile Number' : 'Enter OTP'}
                        </DrawerTitle>
                        <DrawerDescription>
                          {loginState.step === 'role'
                            ? 'Please select your role to proceed with login.'
                            : loginState.step === 'mobile'
                            ? `Enter your 10-digit mobile number (Demo: ${DUMMY_MOBILE})`
                            : `OTP sent to ${loginState.mobileNumber}. (Demo: ${DUMMY_OTP})`}
                        </DrawerDescription>
                      </DrawerHeader>
                      {loginState.step === 'role' ? (
                        <div className="grid grid-cols-3 gap-4 px-4 py-4">
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-2 h-auto py-4"
                            onClick={() => handleRoleSelection('Student')}
                          >
                            <User className="h-6 w-6" />
                            Student
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-2 h-auto py-4"
                            onClick={() => handleRoleSelection('Teacher')}
                          >
                            <BookOpen className="h-6 w-6" />
                            Teacher
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-2 h-auto py-4"
                            onClick={() => handleRoleSelection('Admin')}
                          >
                            <Shield className="h-6 w-6" />
                            Admin
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={loginState.step === 'mobile' ? handleMobileSubmit : handleOtpSubmit} className="flex flex-col">
                          <div className="px-4 py-4">
                            <div className="grid gap-4">
                              {loginState.error && (
                                <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
                                  {loginState.error}
                                </div>
                              )}
                              {loginState.step === 'mobile' ? (
                                <div className="grid gap-2">
                                  <Label htmlFor="mobile-mobile">Mobile Number</Label>
                                  <div className="relative">
                                    {isAdmin && (
                                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    )}
                                    <Input
                                      id="mobile-mobile"
                                      type="tel"
                                      placeholder="10 digit mobile number"
                                      value={loginState.mobileNumber}
                                      onChange={(e) => updateLoginState({
                                        mobileNumber: e.target.value.replace(/\D/g, ''),
                                        error: ''
                                      })}
                                      maxLength={10}
                                      className={`text-lg ${isAdmin ? 'pl-10 border-primary' : ''}`}
                                      required
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="grid gap-2">
                                  <Label htmlFor="otp-mobile">One-Time Password</Label>
                                  <div className="relative">
                                    {isAdmin && (
                                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    )}
                                    <Input
                                      id="otp-mobile"
                                      type="text"
                                      placeholder="Enter 6-digit OTP"
                                      value={loginState.otp}
                                      onChange={(e) => updateLoginState({
                                        otp: e.target.value.replace(/\D/g, ''),
                                        error: ''
                                      })}
                                      maxLength={6}
                                      className={`text-center text-lg tracking-widest ${isAdmin ? 'pl-10 border-primary' : ''}`}
                                      required
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <DrawerFooter className="gap-2">
                            <Button
                              type="submit"
                              className={`w-full ${isAdmin ? 'bg-primary text-primary-foreground' : ''}`}
                              disabled={
                                loginState.step === 'mobile'
                                  ? loginState.mobileNumber.length !== 10
                                  : loginState.otp.length !== 6
                              }
                            >
                              {loginState.step === 'mobile' ? 'Send OTP' : 'Verify & Login'}
                            </Button>
                            <DrawerClose asChild>
                              <Button type="button" variant="outline" className="w-full">
                                Cancel
                              </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </form>
                      )}
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}