"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, Phone, Mail, AlertCircle } from "lucide-react";
import { usePathname } from "next/navigation";

interface ContactStepperProps {
  onSubmit?: (data: {
    name: string;
    contactPreference: string;
    phone?: string;
    email?: string;
    description: string;
  }) => void;
  dictionary?: any;
}

export function RedesignedContactStepper({
  onSubmit,
  dictionary,
}: ContactStepperProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    contactPreference: "",
    phone: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  // Get the current pathname to extract locale
  const pathname = usePathname();
  // Extract locale from pathname (e.g., "/fr/contact" -> "fr")
  const locale = pathname?.split('/')[1]?.match(/^(en|fr)$/) ? pathname.split('/')[1] : 'en';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setContactPreference = (preference: string) => {
    setFormData((prev) => ({ ...prev, contactPreference: preference }));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // Call the API to send the email
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          locale, // Add the locale to the request body
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      setIsSubmitted(true);

      // Still call the onSubmit callback if provided (for compatibility)
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send your information. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (step === 0 && !formData.name) return false;
    if (step === 1 && !formData.contactPreference) return false;
    if (step === 2 && formData.contactPreference === "phone" && !formData.phone)
      return false;
    if (step === 2 && formData.contactPreference === "email" && !formData.email)
      return false;
    if (step === 3 && !formData.description) return false;
    return true;
  };

  // Animation variants for the container
  const containerVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        y: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        },
      },
    },
  };

  const resetForm = () => {
    setFormData({
      name: "",
      contactPreference: "",
      phone: "",
      email: "",
      description: "",
    });
    setStep(0);
    setIsSubmitted(false);
    setError("");
  };

  return (
    <motion.div
      className="rounded-2xl backdrop-blur-md bg-charcoal/50 p-8 max-w-2xl mx-auto"
      variants={containerVariants}
      animate="animate"
    >
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ivory/90 text-rose mb-6">
            <Send className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {dictionary?.form?.confirmationThanks || "Thank You!"}
          </h3>
          <p className="text-white/80">
            {dictionary?.form?.confirmationDescription ||
              `We've received your information and will contact you within 24 hours to discuss your project${
                formData.contactPreference === "phone"
                  ? " via phone"
                  : " via email"
              }.`}
          </p>
          <button
            onClick={resetForm}
            className="mt-8 px-6 py-2 rounded-full bg-charcoal/20 text-ivory border border-ivory/10 hover:bg-charcoal/40 transition-colors"
          >
            {dictionary?.form?.anotherMessage || "Send another message"}
          </button>
        </div>
      ) : (
        <>
          {/* Step indicators with lines between them but not behind them */}
          <div className="flex justify-center mb-12">
            <div className="relative w-[400px] flex items-center justify-between">
              {/* Step 1 */}
              <div className={`relative z-10 flex h-8 w-8 rounded-full items-center justify-center border-2 ${step === 0 ? 'bg-ivory/90 text-rose border-rose shadow-lg' : 'bg-charcoal/50 text-ivory/70 border-ivory/10'}`}>1</div>

              {/* Line between step 1 and 2 */}
              <div className="relative flex-grow mx-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2"></div>
                <motion.div
                  className="absolute top-1/2 left-0 h-0.5 bg-ivory/90 -translate-y-1/2"
                  initial={{ width: "0%" }}
                  animate={{ width: step >= 1 ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </div>

              {/* Step 2 */}
              <motion.div
                className={`relative z-10 flex h-8 w-8 rounded-full items-center justify-center border-2 ${step === 1 ? 'bg-ivory/90 text-rose border-rose shadow-lg' : 'bg-charcoal/50 text-ivory/70 border-ivory/10'}`}
                initial={false}
                animate={{
                  scale: step === 1 ? [1, 1.1, 1] : 1,
                  opacity: step >= 1 ? 1 : 0.6,
                  boxShadow: step === 1 ? '0 0 15px rgba(183, 110, 121, 0.5)' : 'none',
                }}
                transition={{
                  scale: {
                    repeat: step === 1 ? Number.POSITIVE_INFINITY : 0,
                    duration: 2,
                    ease: 'easeInOut',
                  },
                  opacity: { duration: 0.3 },
                  boxShadow: { duration: 0.3 },
                }}
              >
                2
              </motion.div>

              {/* Line between step 2 and 3 */}
              <div className="relative flex-grow mx-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2"></div>
                <motion.div
                  className="absolute top-1/2 left-0 h-0.5 bg-ivory/90 -translate-y-1/2"
                  initial={{ width: "0%" }}
                  animate={{ width: step >= 2 ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </div>

              {/* Step 3 */}
              <motion.div
                className={`relative z-10 flex h-8 w-8 rounded-full items-center justify-center border-2 ${step === 2 ? 'bg-ivory/90 text-rose border-rose shadow-lg' : 'bg-charcoal/50 text-ivory/70 border-ivory/10'}`}
                initial={false}
                animate={{
                  scale: step === 2 ? [1, 1.1, 1] : 1,
                  opacity: step >= 2 ? 1 : 0.6,
                  boxShadow: step === 2 ? '0 0 15px rgba(183, 110, 121, 0.5)' : 'none',
                }}
                transition={{
                  scale: {
                    repeat: step === 2 ? Number.POSITIVE_INFINITY : 0,
                    duration: 2,
                    ease: 'easeInOut',
                  },
                  opacity: { duration: 0.3 },
                  boxShadow: { duration: 0.3 },
                }}
              >
                3
              </motion.div>

              {/* Line between step 3 and 4 */}
              <div className="relative flex-grow mx-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2"></div>
                <motion.div
                  className="absolute top-1/2 left-0 h-0.5 bg-ivory/90 -translate-y-1/2"
                  initial={{ width: "0%" }}
                  animate={{ width: step >= 3 ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                ></motion.div>
              </div>

              {/* Step 4 */}
              <motion.div
                className={`relative z-10 flex h-8 w-8 rounded-full items-center justify-center border-2 ${step === 3 ? 'bg-ivory/90 text-rose border-rose shadow-lg' : 'bg-charcoal/50 text-ivory/70 border-ivory/10'}`}
                initial={false}
                animate={{
                  scale: step === 3 ? [1, 1.1, 1] : 1,
                  opacity: step >= 3 ? 1 : 0.6,
                  boxShadow: step === 3 ? '0 0 15px rgba(183, 110, 121, 0.5)' : 'none',
                }}
                transition={{
                  scale: {
                    repeat: step === 3 ? Number.POSITIVE_INFINITY : 0,
                    duration: 2,
                    ease: 'easeInOut',
                  },
                  opacity: { duration: 0.3 },
                  boxShadow: { duration: 0.3 },
                }}
              >
                4
              </motion.div>
            </div>
          </div>

          {/* Form content */}
          <div className="min-h-[250px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full"
              >
                {step === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">
                      {dictionary?.form?.name || "What's your name?"}
                    </h3>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={
                        dictionary?.form?.nameText || "Enter your full name"
                      }
                      className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    />
                    <p className="text-sm text-white/70">
                      {dictionary?.form?.nameDescription ||
                        "We'll use your name to personalize our communication with you."}
                    </p>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">
                      {dictionary?.form?.contact ||
                        "How would you like to be contacted?"}
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setContactPreference("phone")}
                        className={`flex-1 p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border-2 ${formData.contactPreference === "phone" ? "bg-ivory/90 text-rose border-rose font-bold" : "bg-charcoal/20 text-ivory border-ivory/10 hover:bg-charcoal/40"}`}
                      >
                        <Phone className="h-8 w-8" />
                        <span className="font-medium">
                          {dictionary?.form?.contactOption1 || "Phone"}
                        </span>
                      </button>
                      <button
                        onClick={() => setContactPreference("email")}
                        className={`flex-1 p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border-2 ${formData.contactPreference === "email" ? "bg-ivory/90 text-rose border-rose font-bold" : "bg-charcoal/20 text-ivory border-ivory/10 hover:bg-charcoal/40"}`}
                      >
                        <Mail className="h-8 w-8" />
                        <span className="font-medium">
                          {dictionary?.form?.contactOption2 || "Email"}
                        </span>
                      </button>
                    </div>
                    <p className="text-sm text-white/70">
                      {dictionary?.form?.contactDescription ||
                        "Select your preferred method of communication for discussing your project."}
                    </p>
                  </div>
                )}

                {step === 2 && formData.contactPreference === "phone" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">
                      {dictionary?.form?.phone || "What's your phone number?"}
                    </h3>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={
                        dictionary?.form?.phoneText || "Enter your phone number"
                      }
                      className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    />
                    <p className="text-sm text-white/70">
                      {dictionary?.form?.phoneDescription ||
                        "We'll call you within 24 hours to discuss your project needs."}
                    </p>
                  </div>
                )}

                {step === 2 && formData.contactPreference === "email" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">
                      {dictionary?.form?.email || "What's your email address?"}
                    </h3>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={
                        dictionary?.form?.emailText ||
                        "Enter your email address"
                      }
                      className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    />
                    <p className="text-sm text-white/70">
                      {dictionary?.form?.emailDescription ||
                        "We'll email you within 24 hours to discuss your project needs."}
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">
                      {dictionary?.form?.tellUs || "Tell us about your project"}
                    </h3>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={
                        dictionary?.form?.tellUsText ||
                        "Briefly describe your project"
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 min-h-[120px]"
                    />
                    <p className="text-sm text-white/70">
                      {dictionary?.form?.tellUsDescription ||
                        "This helps us prepare for our conversation with you."}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">
                  {dictionary?.form?.errorTitle || "Failed to send message"}
                </p>
                <p className="text-white/80 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Navigation buttons with gradient animation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={prevStep}
                className="px-6 py-2 rounded-full bg-charcoal/20 text-ivory border border-ivory/10 hover:bg-charcoal/40 transition-colors"
              >
                {dictionary?.navigation?.back || "Back"}
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={nextStep}
              disabled={!isStepValid() || isSubmitting}
              className="group relative inline-flex items-center justify-center rounded-full px-6 py-3 font-bold tracking-tighter transition-all hover:text-charcoal duration-300 bg-ivory/90 text-rose overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group-hover:text-charcoal"
            >
              <span className="relative z-10 flex items-center">
                {isSubmitting ? (
                  dictionary?.navigation?.submitting || "Submitting..."
                ) : step < 3 ? (
                  <>
                    {dictionary?.navigation?.continue || "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    {dictionary?.navigation?.submit || "Submit"}
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </span>
            </button>
          </div>
        </>
      )}

      {/* Add the necessary styles for the Soluvia gradient */}
      <style jsx global>{`
        .bg-gradient-soluvia {
          background: linear-gradient(135deg, #b76e79 0%, #3d5a80 100%);
        }
      `}</style>
    </motion.div>
  );
}
