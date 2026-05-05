import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { DollarSign, Gift, Percent, CircleDollarSign } from "lucide-react";

export const PartnerWhy: React.FC = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: DollarSign,
      title: t("partner.w1_title"),
      desc: t("partner.w1_desc"),
    },
    {
      icon: Gift,
      title: t("partner.w2_title"),
      desc: t("partner.w2_desc"),
    },
    {
      icon: Percent,
      title: t("partner.w3_title"),
      desc: t("partner.w3_desc"),
    },
    {
      icon: CircleDollarSign, 
      title: t("partner.w4_title"),
      desc: t("partner.w4_desc"),
    },
  ];

  return (
    <section id="why" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark font-cairo mb-4">
            {t("partner.whyTitle")}
          </h2>
          <p className="text-xl text-gray-400 font-cairo">
            {t("partner.whySubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
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
                className="bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-md border-2 border-gray-200 hover:border-[#D38842]/40 transition-all duration-500 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#D38842] transition-all duration-500 shadow-sm">
                  <Icon className="w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark font-cairo mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 font-cairo text-lg leading-relaxed max-w-[280px]">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
