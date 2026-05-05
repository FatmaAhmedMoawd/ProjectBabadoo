import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Smartphone, Users } from "lucide-react";
import { Button } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";

const HERO_IMAGES = [
  "https://i.postimg.cc/0yM7747k/hero-2.png",
  "https://i.postimg.cc/vBM9FHks/Browse-Reserve.png",
];

const AnimatedWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-[40%] transform translate-z-0 opacity-10"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 50 C 150 70, 350 30, 500 50 C 650 70, 850 30, 1000 50 L 1000 100 L 0 100 Z"
          fill="rgba(255, 255, 255, 0.4)"
          animate={{
            x: [0, -500],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-48 md:pt-32 pb-20 overflow-hidden bg-brand-brown bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_40%)]">
      <AnimatedWaves />
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-white space-y-10 order-1 lg:col-start-1 w-full text-center flex flex-col items-center"
        >
          <div className="space-y-6 flex flex-col items-center w-full">
            <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.5] md:leading-[1.3] tracking-tight text-center font-cairo w-full max-w-[100vw] overflow-hidden px-4 md:px-2">
              <div className="text-center w-full drop-shadow-xl whitespace-normal break-words">
                <motion.span
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block animate-text-gradient bg-clip-text text-transparent mr-2 pb-2"
                >
                  {t("hero.titleAnimated")}
                </motion.span>
                <span className="text-white"> {t("hero.titleStatic")}</span>
              </div>
            </motion.h1>

            <div className="flex flex-col items-center">
              {[{ text: t("hero.subtitle"), delay: 0.1 }].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.2 + line.delay,
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-center whitespace-normal text-white text-base md:text-xl lg:mt-8 px-8 md:px-0 max-w-2xl font-medium tracking-wide leading-[1.8] md:leading-[1.8] text-white/90 mx-auto"
                >
                  {line.text}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row gap-5 mt-2 lg:mt-8 w-full justify-center order-3 lg:col-start-1 lg:row-start-2 lg:self-start lg:mx-auto px-6 sm:px-0"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto group"
          >
            <Button
              variant="secondary"
              size="lg"
              className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-10 py-6 text-base md:text-xl font-bold font-cairo bg-white text-brand-dark border-none w-full justify-center gap-3 group-hover:shadow-[0_20px_50px_rgba(211,136,66,0.2)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Smartphone className="w-6 h-6 text-brand-brown transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <span className="relative z-10">{t("hero.ctaPrimary")}</span>
              
              {/* Subtle Animated Pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-brand-brown rounded-full pointer-events-none"
              />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto group"
          >
            <Link to="/partner" className="block w-full">
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl border-2 border-white/30 backdrop-blur-md hover:border-white/80 hover:bg-white/10 px-10 py-6 text-base md:text-xl font-bold font-cairo w-full text-white justify-center gap-3 transition-all duration-500 shadow-lg"
              >
                <Users className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <span className="relative z-10">{t("hero.ctaSecondary")}</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative perspective-lg order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full mt-6 lg:mt-0"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 0.5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden z-10">
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentImage}
                  src={HERO_IMAGES[currentImage]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  alt="Babbadoo app preview screenshot"
                />
              </AnimatePresence>
            </div>

            {/* Slider Indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {HERO_IMAGES.map((_, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    width: currentImage === i ? 32 : 8,
                    opacity: currentImage === i ? 1 : 0.4,
                  }}
                  className={cn(
                    "h-2 rounded-full bg-white transition-all duration-300",
                  )}
                />
              ))}
            </div>

            {/* Text under image */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 md:mt-12 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white leading-snug font-cairo tracking-tight">
                {t("hero.discover")}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
