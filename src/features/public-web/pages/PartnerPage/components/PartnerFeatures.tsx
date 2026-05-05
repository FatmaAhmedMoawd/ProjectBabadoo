import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { TrendingUp, Users, Settings } from "lucide-react";

export const PartnerFeatures: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: TrendingUp,
      title: t("partner.f1_title"),
      desc: t("partner.f1_desc"),
    },
    {
      icon: Users,
      title: t("partner.f2_title"),
      desc: t("partner.f2_desc"),
    },
    {
      icon: Settings,
      title: t("partner.f3_title"),
      desc: t("partner.f3_desc"),
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-cairo leading-[1.4] md:leading-[1.3]">
            {t("partner.featuresTitle")}
          </h2>
          <p className="text-xl text-gray-600 font-cairo leading-[1.8] md:leading-[1.7]">
            {t("partner.featuresSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(211, 136, 66, 0.15)"
                }}
                className="relative rounded-[40px] bg-white border-2 border-gray-200 shadow-md hover:border-[#D38842]/40 transition-all duration-500 group cursor-default"
              >
                <div className="p-10 h-full flex flex-col items-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-3xl bg-gray-50 text-gray-700 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#D38842] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark font-cairo mb-4 leading-[1.4] md:leading-[1.3] text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-[1.8] md:leading-[1.7] font-cairo font-medium text-center text-lg">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
