import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Common";
import { Upload, ChevronDown, Phone, Check } from "lucide-react";

import { useRTL } from "@/shared/hooks/useRTL";

export const PartnerRegistration: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    brandName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bizType: "",
    storeType: "",
    branchCount: 1,
    role: "",
    bizPhone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = "";
    const val = value.trim();

    const isGibberish = (str: string) => {
      const lower = str.toLowerCase();
      // Keyboard walks
      const walks = ["asdf", "sdfg", "dfgh", "fghj", "ghjk", "hjkl", "qwerty", "werty", "ertyu", "rtyui", "zxcv", "xcvb", "cvbn"];
      if (walks.some(walk => lower.includes(walk))) return true;
      
      // Repetitive characters
      if (/(.)\1\1/.test(lower)) return true;

      // English-specific: No vowels in a long enough string
      if (/^[a-zA-Z]+$/.test(str) && str.length >= 4) {
        if (!/[aeiouy]/.test(lower)) return true;
        // Too many consecutive consonants
        if (/[bcdfghjklmnpqrstvwxz]{4,}/.test(lower)) return true;
      }

      return false;
    };

    if (name === "brandName") {
      const brandRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
      if (val.length < 3 || val.length > 15) {
        error = "يجب أن يكون اسم النشاط بين 3 و 15 حرفاً";
      } else if (!brandRegex.test(val)) {
        error = "يسمح بالحروف والمسافات فقط";
      } else if (isGibberish(val)) {
        error = "اسم النشاط غير صالح (يرجى إدخال اسم حقيقي)";
      }
    }

    if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[\u0600-\u06FFa-zA-Z]+$/;
      const label = name === "firstName" ? "الاسم الأول" : "الاسم الأخير";
      if (val.length < 3 || val.length > 15) {
        error = `يجب أن يكون ${label} بين 3 و 15 حرفاً`;
      } else if (!nameRegex.test(val)) {
        error = "يسمح بالحروف فقط (بدون أرقام أو رموز)";
      } else if (isGibberish(val)) {
        error = "الاسم غير صالح (يرجى إدخال اسم حقيقي)";
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const endsWithValid = val.toLowerCase().endsWith("@gmail.com") || val.toLowerCase().endsWith("@yahoo.com");
      if (!emailRegex.test(val)) {
        error = "يرجى إدخال بريد إلكتروني صحيح";
      } else if (!endsWithValid) {
        error = "يجب أن ينتهي بـ @gmail.com أو @yahoo.com";
      }
    }

    if (name === "phone") {
      const phoneRegex = /^01[0125]\d{8}$/;
      if (!phoneRegex.test(val)) {
        error = "يرجى إدخال رقم موبايل صحيح مكون من 11 رقم، يبدأ بـ 010 أو 011 أو 012 أو 015 بدون مسافات";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // If field was already touched, validate on change too
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const isFormValid = () => {
    return (
      formData.brandName.trim().length >= 3 &&
      formData.brandName.trim().length <= 15 &&
      formData.firstName.trim().length >= 3 &&
      formData.firstName.trim().length <= 15 &&
      formData.lastName.trim().length >= 3 &&
      formData.lastName.trim().length <= 15 &&
      !errors.brandName &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.phone &&
      formData.email !== "" &&
      formData.phone !== ""
    );
  };

  const handleNextStep = () => {
    if (isFormValid()) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <section id="registration" className="py-24 bg-white relative scroll-mt-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-cairo">
            {t("partner.registrationTitle")}
          </h2>
          <p className="text-xl text-gray-600 font-cairo">
            {t("partner.registrationSubtitle")}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative px-4">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0">
            <div
              className="h-full bg-[#D38842] transition-all"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 1 ? "bg-[#D38842]" : "bg-gray-300"}`}
            >
              1
            </div>
            <span className="text-sm md:text-base font-bold text-brand-dark text-center">
              {t("partner.step1")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 2 ? "bg-[#D38842]" : "bg-gray-300"}`}
            >
              2
            </div>
            <span className="text-sm md:text-base font-bold text-gray-500 text-center">
              {t("partner.step2")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 3 ? "bg-[#D38842]" : "bg-gray-300"}`}
            >
              3
            </div>
            <span className="text-sm md:text-base font-bold text-gray-500 text-center">
              {t("partner.step3")}
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="relative rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="p-8 md:p-12 h-full w-full relative overflow-hidden">

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-start"
              >
                <div className="space-y-2">
                  <label className="block font-bold text-sm">
                    {t("partner.brandName")}
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder={t("partner.brandNamePlaceholder")}
                    className={`w-full border rounded-lg p-3 outline-none focus:border-[#D38842] transition-colors ${errors.brandName ? "border-red-500 bg-red-50/5" : "border-gray-300"}`}
                  />
                  {errors.brandName && <p className="text-red-500 text-xs font-cairo mt-1 font-medium">{errors.brandName}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-bold text-sm">
                      {t("partner.firstName")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t("partner.firstNamePlaceholder")}
                      className={`w-full border rounded-lg p-3 outline-none focus:border-[#D38842] transition-colors ${errors.firstName ? "border-red-500 bg-red-50/5" : "border-gray-300"}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs font-cairo mt-1 font-medium">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="block font-bold text-sm">
                      {t("partner.lastName")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t("partner.lastNamePlaceholder")}
                      className={`w-full border rounded-lg p-3 outline-none focus:border-[#D38842] transition-colors ${errors.lastName ? "border-red-500 bg-red-50/5" : "border-gray-300"}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs font-cairo mt-1 font-medium">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-bold text-sm">
                    {t("partner.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="example@gmail.com"
                    className={`w-full border rounded-lg p-3 outline-none focus:border-[#D38842] transition-colors ${isRTL ? "text-right" : "text-left"} ${errors.email ? "border-red-500 bg-red-50/5" : "border-gray-300"}`}
                    dir="ltr"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-cairo mt-1 font-medium">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block font-bold text-sm">
                    {t("partner.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="01012345678"
                    className={`w-full border rounded-lg p-3 outline-none focus:border-[#D38842] transition-colors ${isRTL ? "text-right" : "text-left"} ${errors.phone ? "border-red-500 bg-red-50/5" : "border-gray-300"}`}
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-cairo mt-1 font-medium leading-relaxed">{errors.phone}</p>}
                </div>

                <div className="pt-6 flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={handleNextStep}
                    disabled={!isFormValid()}
                    className={`px-12 py-3.5 text-lg font-bold w-full md:w-auto mt-4 rounded-lg border-none shadow-md font-cairo transition-all ${isFormValid() ? "bg-[#C48033] hover:bg-[#A36A29] text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    {t("partner.nextStep")}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-start"
              >
                <div className="space-y-2">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.bizType")}
                  </label>
                  <div className="relative">
                    <select
                      name="bizType"
                      value={formData.bizType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3.5 outline-none focus:border-[#D38842] appearance-none bg-white text-gray-800 font-medium"
                    >
                      <option value="">{t("partner.bizTypeSelect")}</option>
                      <option value="restaurant">مطعم</option>
                      <option value="shops">محلات</option>
                    </select>
                    <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {formData.bizType && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2"
                  >
                    <label className="block font-bold text-sm text-gray-800">
                      نوع المتجر
                    </label>
                    <div className="relative">
                      <select
                        name="storeType"
                        value={formData.storeType}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3.5 outline-none focus:border-[#D38842] appearance-none bg-white text-gray-800 font-medium"
                      >
                        <option value="">اختر نوع المتجر</option>
                        {formData.bizType === "restaurant" ? (
                          <>
                            <option value="regular">مطعم عادي</option>
                            <option value="home">مطبخ منزلي</option>
                            <option value="street">طعام شارع</option>
                          </>
                        ) : (
                          <>
                            <option value="electronics">إلكترونيات</option>
                            <option value="pharmacy">صيدلية</option>
                            <option value="pets">حيوانات أليفة</option>
                            <option value="flowers">زهور</option>
                          </>
                        )}
                      </select>
                      <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.branchCount")} (بحد أقصى 5)
                  </label>
                  <input
                    type="number"
                    name="branchCount"
                    value={formData.branchCount}
                    onChange={(e) => {
                      const val = e.target.value === "" ? "" : parseInt(e.target.value);
                      if (val === "" || (val >= 1 && val <= 5)) {
                        setFormData(prev => ({ ...prev, branchCount: val as number }));
                      }
                    }}
                    min="1"
                    max="5"
                    placeholder="1"
                    className="w-full border border-gray-300 rounded-lg p-3.5 outline-none focus:border-[#D38842]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.role")}
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3.5 outline-none focus:border-[#D38842] appearance-none bg-white text-gray-800 font-medium"
                    >
                      <option value="">{t("partner.roleSelect")}</option>
                      <option value="owner">المالك أو الشريك</option>
                      <option value="manager">المدير أو الممثل القانوني</option>
                    </select>
                    <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.bizPhone")}
                  </label>
                  <div className="relative">
                    <Phone className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="tel"
                      name="bizPhone"
                      value={formData.bizPhone}
                      onChange={handleInputChange}
                      placeholder={t("partner.bizPhonePlaceholder")}
                      className={`w-full border border-gray-300 rounded-lg p-3.5 outline-none focus:border-[#D38842] ${isRTL ? "pr-11 text-right" : "pl-11 text-left"}`}
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg flex items-center gap-3 w-fit pr-6">
                  <input
                    type="checkbox"
                    id="samePhone"
                    checked={formData.bizPhone === formData.phone && formData.phone !== ""}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({ ...prev, bizPhone: prev.phone }));
                      } else {
                        setFormData(prev => ({ ...prev, bizPhone: "" }));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-[#D38842] focus:ring-[#D38842]"
                  />
                  <label
                    htmlFor="samePhone"
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    {t("partner.sameAsPersonal")}
                  </label>
                </div>

                <div className="pt-6 flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 w-full border border-[#C48033] text-[#C48033] hover:bg-[#C48033] hover:text-white font-bold rounded-lg py-3.5 font-cairo transition-all"
                  >
                    {t("partner.back")}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setStep(3)}
                    className="flex-1 w-full bg-[#C48033] hover:bg-[#A36A29] text-white py-3.5 font-bold rounded-lg border-none shadow-md font-cairo transition-all"
                  >
                    {t("partner.nextStep")}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 text-start"
              >
                <div className="space-y-3">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.bizLocation")}
                  </label>
                  <div className="h-[220px] w-full bg-gray-200 rounded-2xl overflow-hidden relative border border-gray-200 shadow-sm">
                    <img
                      src="https://i.postimg.cc/3Nhd0SY0/Google-map-svg.jpg"
                      alt="Map Placeholder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.fullAddress")}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t("partner.fullAddressPlaceholder")}
                    className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-[#D38842] resize-none"
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="block font-bold text-sm text-gray-800">
                    {t("partner.storeImageOptional")}
                  </label>
                  <div className="border border-gray-300 p-10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#D38842] transition-colors cursor-pointer text-gray-500 bg-white shadow-sm">
                    <Upload className="w-8 h-8 text-[#D38842]" />
                    <span className="font-bold font-cairo text-gray-800 text-lg">
                      {t("partner.uploadPhotoTitle")}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {t("partner.uploadPhotoDesc")}
                    </span>
                  </div>
                </div>

                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4 flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#166534] text-sm mb-1">
                      {t("partner.almostDoneTitle")}
                    </h4>
                    <p className="text-[#15803d] text-xs font-medium leading-relaxed">
                      {t("partner.almostDoneDesc")}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 w-full border-2 border-[#C48033] text-[#C48033] hover:text-white hover:bg-[#C48033] font-bold rounded-xl py-3.5 font-cairo transition-all"
                  >
                    {t("partner.back")}
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 w-full bg-[#C48033] hover:bg-[#A36A29] text-white py-3.5 font-bold rounded-xl border-none shadow-lg shadow-[#C48033]/20 font-cairo transition-all"
                  >
                    {t("partner.submit")}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
