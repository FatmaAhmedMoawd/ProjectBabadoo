import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Route, SearchCheck, Shield, Box, Search, Ticket } from "lucide-react";
import { Button } from "@/shared/ui/Common";

export const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Connecting Section */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-20 text-brand-dark leading-[1.4] md:leading-[1.3] px-2"
            dangerouslySetInnerHTML={{ __html: t("reasons.title") }}
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 max-w-6xl mx-auto">
            {(
              t("reasons.items", { returnObjects: true }) as Array<{
                title: string;
                desc: string;
              }>
            ).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-[40px] bg-white border border-[#6a7282]/40 shadow-md hover:shadow-2xl hover:shadow-brand-brown/5 transition-all duration-500 group cursor-default"
              >
                <div className="p-10 h-full flex flex-col items-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-gray-50 text-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:bg-[#D38842]/10 group-hover:text-[#D38842] group-hover:scale-110 transition-all duration-500">
                    {idx === 0 && <Route className="w-10 h-10" />}
                    {idx === 1 && <SearchCheck className="w-10 h-10" />}
                    {idx === 2 && <Shield className="w-10 h-10" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-brand-dark tracking-tight font-cairo leading-[1.4] md:leading-[1.3]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-[1.8] md:leading-[1.7] text-lg font-light text-center">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section id="features" className="py-32 bg-[#F9F9FA] text-center">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-20 text-brand-dark"
          >
            {t("features.title")}
          </motion.h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 max-w-6xl mx-auto mb-20">
            {(
              t("features.items", { returnObjects: true }) as Array<{
                title: string;
                desc: string;
              }>
            ).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative rounded-[40px] bg-white border border-[#6a7282]/40 shadow-md hover:shadow-2xl hover:shadow-brand-brown/5 transition-all duration-500 group cursor-default"
              >
                <div className="p-10 h-full flex flex-col items-center relative overflow-hidden">
                  <div className="w-16 h-16 bg-gray-50 text-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all group-hover:rotate-12 group-hover:bg-[#D38842]/10 group-hover:text-[#D38842]">
                    {idx === 0 && <Box className="w-8 h-8" />}
                    {idx === 1 && <Search className="w-8 h-8" />}
                    {idx === 2 && <Ticket className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-brand-dark font-cairo">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-light text-center">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button
            variant="primary"
            size="lg"
            className="rounded-xl px-16 py-5 bg-brand-brown hover:scale-105 shadow-xl transition-all font-bold tracking-wide"
          >
            {t("features.getStarted")}
          </Button>
        </div>
      </section>
    </>
  );
};
