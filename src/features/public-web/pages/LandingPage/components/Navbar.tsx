import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button, Logo } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  isScrolled: boolean;
  onMenuOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, onMenuOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isPartnerPage = location.pathname === "/partner";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[60] px-4 sm:px-6 md:px-12 transition-all duration-500 ease-in-out flex items-center justify-between gap-4",
        isScrolled
          ? "bg-brand-dark/70 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5"
          : "bg-transparent py-4 sm:py-8",
      )}
    >
      <Logo />

      {!isPartnerPage && (
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-white font-bold uppercase tracking-[0.15em] font-cairo text-[20px]">
          <button
            onClick={() => scrollTo("features")}
            className="px-4 py-3 min-h-[44px] hover:text-brand-light transition-all hover:scale-110 active:scale-95 drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-xl"
          >
            {t("nav.features")}
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-4 py-3 min-h-[44px] hover:text-brand-light transition-all hover:scale-110 active:scale-95 drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-xl"
          >
            {t("nav.howItWorks")}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-3 min-h-[44px] hover:text-brand-light transition-all hover:scale-110 active:scale-95 drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-xl"
          >
            {t("nav.contact")}
          </button>
        </nav>
      )}

      <div className="flex items-center gap-4">
        <LanguageSwitcher className="hidden lg:flex" />
        {isPartnerPage ? (
          <Link to="/app/login">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-md px-6 border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white transition-all bg-white font-bold"
            >
              {t("nav.login")}
            </Button>
          </Link>
        ) : (
          <Link to="/partner">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-md px-6 border-white/40 hover:bg-white hover:text-brand-dark transition-all text-white"
            >
              {t("nav.join")}
            </Button>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
          <LanguageSwitcher className="scale-90 origin-right rtl:origin-left sm:scale-100" />
          <button
            aria-label={t("nav.openMenu", "Open menu")}
            onClick={onMenuOpen}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 active:scale-90 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
