import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Common";

export const PartnerHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-[100svh] flex items-center pt-32 pb-20 overflow-hidden bg-brand-dark">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://i.postimg.cc/SQG0pT2R/hero-image.png)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/5" />

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white space-y-8 w-full max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.4] md:leading-[1.3] tracking-wide font-cairo drop-shadow-lg">
            {t("partner.heroTitle_1")}{" "}
            <span className="text-[#D38842] block">
              {t("partner.heroTitle_2")}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-[1.8] md:leading-[1.7] font-medium font-cairo">
            {t("partner.heroSubtitle")}
          </p>

          <div className="pt-8 flex justify-center">
            <Button
              variant="secondary"
              onClick={() =>
                document
                  .getElementById("registration")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative overflow-hidden group w-full sm:w-auto px-8 py-4 text-lg md:text-xl font-bold bg-[#D38842] text-white hover:bg-[#b07032] border-none font-cairo justify-center rounded-lg shadow-xl shadow-[#D38842]/20 hover:shadow-2xl hover:shadow-[#D38842]/40 transition-all hover:-translate-y-1"
            >
              <span className="relative z-10">{t("partner.heroCta")}</span>

              {/* Floating particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, i % 2 === 0 ? 10 : -10, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute w-2 h-2 bg-white/40 rounded-full z-0"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                />
              ))}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
