import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronRight, Download, LogIn, Users } from "lucide-react";
import { Button, Logo } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";
import { useRTL } from "@/shared/hooks/useRTL";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isPartnerPage = location.pathname === "/partner";
  const { offset, isRTL } = useRTL();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Additional fixes for iOS Safari
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/20 backdrop-blur-md z-[100] lg:hidden touch-none"
          />
          <motion.div
            initial={{ x: offset(100) + "%" }}
            animate={{ x: 0 }}
            exit={{ x: offset(100) + "%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 end-0 w-[300px] bg-white/95 backdrop-blur-xl z-[101] lg:hidden flex flex-col p-8 shadow-2xl rounded-s-[40px] border-s border-white/20"
          >
            <div
              className="flex items-center justify-between mb-12 w-full"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <button
                onClick={onClose}
                aria-label={t("nav.closeMenu", "Close menu")}
                className="w-10 h-10 flex flex-col items-center justify-center text-brand-dark bg-gray-100 hover:bg-gray-200 rounded-xl transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 shrink-0 gap-[4px]"
              >
                <span className="w-5 h-[2px] bg-brand-dark rotate-45 translate-y-[3px] rounded-full" />
                <span className="w-5 h-[2px] bg-brand-dark -rotate-45 -translate-y-[3px] rounded-full" />
              </button>
              <Logo
                variant="horizontal"
                className="brightness-0 opacity-90 [&>img]:!h-[32px] sm:[&>img]:!h-[38px] [&>img]:!scale-100 shrink-0 object-right rtl:object-left"
              />
            </div>
            <nav className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2 pb-12 custom-scrollbar">
              {(isPartnerPage
                ? [
                    { label: t("nav.howItWorks"), id: "how-it-works" },
                    { label: t("nav.partnerRegister"), id: "registration" },
                    { label: t("nav.faq"), id: "faq" },
                    { label: t("nav.features"), id: "why" },
                  ]
                : [
                    { label: t("nav.features"), id: "features" },
                    { label: t("nav.howItWorks"), id: "how-it-works" },
                    { label: t("nav.contact"), id: "contact" },
                  ]
              ).map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, x: offset(30) }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, ease: "easeOut" }}
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-brand-dark text-lg font-bold font-cairo text-start bg-white border border-gray-200 shadow-sm rounded-2xl p-4 hover:border-[#D38842]/30 hover:bg-gray-50/50 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38842]"
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-[#D38842] transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 group-hover:-translate-x-1",
                    )}
                  />
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-auto space-y-4"
            >
              <Button
                variant="secondary"
                className="w-full h-16 rounded-2xl bg-white border border-gray-200 text-brand-dark font-bold font-cairo text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-gray-50 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown/5 to-transparent" />
                <Download className="w-6 h-6 text-brand-brown transition-transform group-hover:scale-110 group-hover:rotate-6" />
                <span className="relative z-10">{t("nav.download")}</span>
              </Button>
              {isPartnerPage ? (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full h-16 rounded-2xl border-2 border-brand-brown/10 text-brand-brown font-bold font-cairo text-lg active:scale-[0.98] transition-all hover:bg-brand-brown/5 flex items-center justify-center gap-3"
                  >
                    <LogIn
                      className={cn("w-6 h-6", isRTL && "rotate-180")}
                    />
                    {t("nav.login")}
                  </Button>
                </Link>
              ) : (
                <Link to="/partner" onClick={onClose} className="block w-full group">
                  <Button
                    variant="outline"
                    className="w-full h-16 rounded-2xl border-2 border-brand-brown/20 text-brand-brown font-bold font-cairo text-lg active:scale-[0.98] transition-all hover:border-brand-brown/40 hover:bg-brand-brown/5 flex items-center justify-center gap-3"
                  >
                    <Users className="w-6 h-6 transition-transform group-hover:scale-110 group-hover:-rotate-6" />
                    {t("nav.join")}
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
