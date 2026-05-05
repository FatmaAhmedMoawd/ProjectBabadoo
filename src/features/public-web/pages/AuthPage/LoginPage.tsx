import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";
import { useRTL } from "@/shared/hooks/useRTL";
import { Link } from "react-router-dom";
import { ShieldCheck, Info } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const checkCapsLock = (e: React.KeyboardEvent) => {
    if (e.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = isRTL ? "يرجى إدخال البريد الإلكتروني" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = isRTL ? "البريد الإلكتروني غير صحيح" : "Invalid email address";
    }
    
    if (!password) {
      newErrors.password = isRTL ? "يرجى إدخال كلمة المرور" : "Password is required";
    } else if (password.length < 6) {
      newErrors.password = isRTL ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log("Login successful", { email, password });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("auth.goodMorning");
    if (hour < 18) return t("auth.goodAfternoon");
    return t("auth.goodEvening");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-6 relative py-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-brown/10 rounded-full blur-[100px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-brown/10 rounded-full blur-[100px]" 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10 mt-4"
      >
        <div className="bg-white border border-gray-100 rounded-[40px] shadow-2xl shadow-gray-200/50 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-brown/20 via-brand-brown to-brand-brown/20" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-dark font-cairo mb-2">
              {t("nav.login")}
            </h1>
            <p className="text-gray-500 font-cairo font-medium">
              {getGreeting()}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block font-bold text-sm text-gray-800 px-1 font-cairo">
                {isRTL ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={cn(
                    "w-full border rounded-[20px] p-4 ps-14 outline-none transition-all duration-300 shadow-sm font-medium",
                    isRTL && "ps-4 pe-14",
                    errors.email 
                      ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                      : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                  )}
                  dir="ltr"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs font-cairo mt-1 font-medium px-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block font-bold text-sm text-gray-800 font-cairo">
                  {isRTL ? "كلمة المرور" : "Password"}
                </label>
                <button
                  type="button"
                  className="text-xs font-bold text-brand-brown hover:underline font-cairo"
                >
                  {isRTL ? "نسيت كلمة المرور؟" : "Forgot Password?"}
                </button>
              </div>
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-brown transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={checkCapsLock}
                  onKeyDown={checkCapsLock}
                  placeholder="••••••••"
                  className={cn(
                    "w-full border rounded-[20px] p-4 ps-14 pe-12 outline-none transition-all duration-300 shadow-sm font-medium",
                    isRTL && "ps-4 pe-14",
                    errors.password 
                      ? "border-red-200 bg-red-50/30 focus:border-red-400" 
                      : "border-gray-200 bg-white focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5"
                  )}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <AnimatePresence>
                {isCapsLockOn && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1.5 text-amber-600 text-[10px] font-bold font-cairo mt-1 px-1 uppercase tracking-wider"
                  >
                    <Info className="w-3 h-3" />
                    {t("auth.capsLockOn")}
                  </motion.p>
                )}
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-xs font-cairo mt-1 font-medium px-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-[20px] bg-brand-brown text-white font-black text-xl shadow-xl shadow-brand-brown/20 transition-all active:scale-[0.98] group overflow-hidden relative border-none"
            >
              <span className={cn("relative z-10 flex items-center justify-center gap-2", isLoading && "opacity-0")}>
                {isRTL ? "تسجيل الدخول" : "Sign In"}
                {isRTL ? <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
              </span>
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-bold font-cairo">
                {isRTL ? "أو عبر" : "Or continue with"}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full h-14 rounded-[20px] border border-gray-200 bg-white flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 active:scale-[0.98] font-bold font-cairo text-gray-700 shadow-sm group"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <span className="group-hover:text-brand-dark transition-colors">
                {isRTL ? "متابعة باستخدام جوجل" : "Continue with Google"}
              </span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-cairo">
                {t("auth.secureLogin")}
              </span>
            </div>
            <p className="text-gray-500 font-cairo font-medium text-sm">
              {isRTL ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
              <Link to="/partner" className="text-brand-brown font-black hover:underline">
                {isRTL ? "انضم كشريك الآن" : "Join as a partner"}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <Link to="/" className="text-gray-400 hover:text-brand-brown transition-colors text-sm font-bold font-cairo">
            {isRTL ? "الرئيسية" : "Home"}
          </Link>
          <Link to="/partner" className="text-gray-400 hover:text-brand-brown transition-colors text-sm font-bold font-cairo">
            {isRTL ? "انضم إلينا" : "Join Us"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
