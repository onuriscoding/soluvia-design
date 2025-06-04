"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookingIframe } from "@/components/ui/booking-iframe";
import GradientText from "@/app/animations/gradient-text";
import { useLocalizedUrl } from "@/app/hooks/use-localized-url";

// Custom X (formerly Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Instagram icon component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Custom WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export function RedesignedContactSection({ dictionary }: { dictionary: any }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "web-design",
    budget: "",
    timeframe: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Get the current pathname to extract locale
  const pathname = usePathname();
  // Extract locale from pathname (e.g., "/fr/contact" -> "fr")
  const locale = pathname?.split("/")[1]?.match(/^(en|fr)$/)
    ? pathname.split("/")[1]
    : "en";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const localizeUrl = useLocalizedUrl();

  const resetForm = () => {
    setIsSubmitted(false);
    setStatus("idle");
    setMessage("");
    setFormState({
      name: "",
      email: "",
      phone: "",
      message: "",
      service: "web-design",
      budget: "",
      timeframe: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      setMessage(
        dictionary.contact.contactForm.requiredFieldsMessage ||
          "Please fill out all required fields"
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("loading");

    try {
      // Prepare data format to match the API expectations
      const apiData = {
        name: formState.name,
        contactPreference: formState.phone ? "phone" : "email", // Set based on whether phone is provided
        email: formState.email,
        phone: formState.phone,
        description: formState.message,
        // Additional fields from the contact form
        service: formState.service,
        budget: formState.budget,
        timeframe: formState.timeframe,
        locale, // Add the locale to the request body
      };

      // Call the API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      setIsSubmitted(true);
      setStatus("success");
      setMessage(
        dictionary.contact.contactForm.confirmationThanks ||
          "Thank you for your message! We'll get back to you soon."
      );
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
        service: "web-design",
        budget: "",
        timeframe: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Failed to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-6xl font-bold tracking-tight sm:text-4xl md:text-8xl">
            <GradientText
              colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
              animationSpeed={12}
              showBorder={false}
              className="inline-block"
            >
              {dictionary.contact.contactTitle1}
            </GradientText>

            {dictionary.contact.contactTitle2}
          </h2>
          <p className="mt-4 text-lg md:text-2xl text-ivory/70">
            {dictionary.contact.contactSubTitle}
          </p>
        </motion.div>

        {/* Full-width Booking Frame */}
        <motion.div
          className="w-full mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <BookingIframe height={700} />
        </motion.div>
        {/* Elegant divider with gradient effect */}
        <div className="relative h-24 overflow-hidden bg-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-rose/30 to-transparent"></div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* Contact Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="transition-all duration-500 h-full"
          >
            <div className="relative overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal/50 p-10 backdrop-blur-sm shadow-lg hover:shadow-rose/5 transition-all duration-300 group h-full">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-sapphire/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
              </div>

              <div className="relative z-10 h-full">
                {isSubmitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rose/20 to-sapphire/20">
                      <CheckCircle className="h-10 w-10 text-rose" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-ivory">
                      {status === "success"
                        ? dictionary.contact.contactForm.confirmationThanks ||
                          "Message Sent!"
                        : dictionary.contact.contactForm.errorTitle || "Error"}
                    </h3>
                    <p className="mb-6 text-ivory/70">
                      {status === "success"
                        ? dictionary.contact.contactForm
                            .confirmationDescription ||
                          "Thank you for reaching out. We'll get back to you as soon as possible."
                        : dictionary.contact.contactForm.errorMessage ||
                          "Failed to send message. Please try again."}
                    </p>
                    <Button
                      onClick={() => resetForm()}
                      className="bg-ivory/90 text-rose hover:text-charcoal font-bold tracking-tighter transition-all duration-300"
                    >
                      {dictionary.contact.contactForm.anotherMessage}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-ivory/80">
                          {dictionary.contact.contactForm.name}{" "}
                          <span className="text-rose">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={dictionary.contact.contactForm.nameText}
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-ivory/80">
                          {dictionary.contact.contactForm.email}{" "}
                          <span className="text-rose">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={dictionary.contact.contactForm.emailText}
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-ivory/80">
                          {dictionary.contact.contactForm.phone}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder={dictionary.contact.contactForm.phoneText}
                          value={formState.phone}
                          onChange={handleChange}
                          className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-ivory/80">
                          {dictionary.contact.contactForm.servicesInterestedIn}
                        </Label>
                        <select
                          id="service"
                          name="service"
                          value={formState.service}
                          onChange={handleChange}
                          className="w-full rounded-md border border-ivory/10 bg-charcoal/50 px-3 py-2 text-ivory focus:border-rose/50 focus:outline-none"
                        >
                          <option value="web-design">
                            {dictionary.contact.contactForm.servicesOption1}
                          </option>
                          <option value="ai">
                            {dictionary.contact.contactForm.servicesOption2}
                          </option>
                          <option value="seo">
                            {dictionary.contact.contactForm.servicesOption3}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-ivory/80">
                        {dictionary.contact.contactForm.budgetRange}{" "}
                        <span className="text-rose">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <input
                            type="radio"
                            id="budget-1"
                            name="budget"
                            value="Under $1,000"
                            className="sr-only peer"
                            checked={formState.budget === "Under $1,000"}
                            onChange={handleChange}
                            required
                          />
                          <label
                            htmlFor="budget-1"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {dictionary.contact.contactForm.budgetOption1}
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="budget-2"
                            name="budget"
                            value="$1,000 - $5,000"
                            className="sr-only peer"
                            checked={formState.budget === "$1,000 - $5,000"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="budget-2"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {dictionary.contact.contactForm.budgetOption2}
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="budget-3"
                            name="budget"
                            value="$5,000 - $10,000"
                            className="sr-only peer"
                            checked={formState.budget === "$5,000 - $10,000"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="budget-3"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {dictionary.contact.contactForm.budgetOption3}
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="budget-4"
                            name="budget"
                            value="Over $10,000"
                            className="sr-only peer"
                            checked={formState.budget === "Over $10,000"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="budget-4"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {dictionary.contact.contactForm.budgetOption4}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeframe" className="text-ivory/80">
                        {dictionary.contact.contactForm.projectTimeframe}
                      </Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <input
                            type="radio"
                            id="timeframe-1"
                            name="timeframe"
                            value="ASAP"
                            className="sr-only peer"
                            checked={formState.timeframe === "ASAP"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="timeframe-1"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {
                              dictionary.contact.contactForm
                                .projectTimeframeOption1
                            }
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="timeframe-2"
                            name="timeframe"
                            value="1-3 Months"
                            className="sr-only peer"
                            checked={formState.timeframe === "1-3 Months"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="timeframe-2"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {
                              dictionary.contact.contactForm
                                .projectTimeframeOption2
                            }
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="timeframe-3"
                            name="timeframe"
                            value="3+ Months"
                            className="sr-only peer"
                            checked={formState.timeframe === "3+ Months"}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="timeframe-3"
                            className="flex cursor-pointer justify-center rounded-md border border-ivory/10 bg-charcoal/30 p-3 text-sm peer-checked:border-rose peer-checked:bg-rose/10 hover:bg-charcoal/50"
                          >
                            {
                              dictionary.contact.contactForm
                                .projectTimeframeOption3
                            }
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-ivory/80">
                        {dictionary.contact.contactForm.message}{" "}
                        <span className="text-rose">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={dictionary.contact.contactForm.messageText}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="min-h-32 border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                      />
                    </div>

                    {status === "error" && (
                      <motion.div
                        className="text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <span>
                            {dictionary.contact.contactForm.errorMessage ||
                              message}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="default"
                      className="mt-4 w-full bg-ivory/90 text-rose hover:text-charcoal font-bold tracking-tighter transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? dictionary.contact.contactForm.sending
                        : dictionary.contact.contactForm.sendMessage}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <div className="space-y-8 p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm h-full flex flex-col justify-between">
              <div className="space-y-6">
                <motion.h3
                  className="text-2xl font-semibold tracking-tight text-ivory relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {dictionary.contact.contactInformation}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-rose to-sapphire"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.h3>
                <p className="text-ivory/70">
                  {dictionary.contact.contactDescription}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-ivory mb-1">
                      {dictionary.contact.contactEmail}
                    </h4>
                    <a
                      href="mailto:info@soluvia.co"
                      className="text-ivory/70 hover:text-rose transition-colors"
                    >
                      info@soluvia.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sapphire/10 text-sapphire mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-ivory mb-1">
                      {dictionary.contact.contactPhone}
                    </h4>
                    <a
                      href={localizeUrl("/contact")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory/70 hover:text-sapphire transition-colors font-semibold"
                    >
                      {dictionary.navigation?.bookADiscoveryCallSmall ||
                        "Book a Discovery Call"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sapphire/10 text-sapphire mr-4">
                    <WhatsAppIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-ivory mb-1">
                      WhatsApp
                    </h4>
                    <a
                      href="https://wa.me/447438799482"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory/70 hover:text-sapphire transition-colors"
                    >
                      +44 (74) 3879 9482
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <motion.h3
                  className="text-2xl font-semibold tracking-tight text-ivory relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {dictionary.contact.businessHours}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-rose to-sapphire"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ivory/70">
                      {dictionary.contact.monday} - {dictionary.contact.friday}
                    </span>
                    <span className="text-ivory">9:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">
                      {dictionary.contact.saturday}
                    </span>
                    <span className="text-ivory">10:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">
                      {dictionary.contact.sunday}
                    </span>
                    <span className="text-ivory">
                      {dictionary.contact.closed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <motion.h3
                  className="text-2xl font-semibold tracking-tight text-ivory relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {dictionary.contact.connectwithUs}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-rose to-sapphire"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.h3>
                <div className="flex gap-4">
                  {/*}
                  <motion.a
                    href="https://x.com/soluviaco"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory/80 hover:text-ivory hover:shadow-md hover:shadow-rose/10 transition-all duration-300 border border-ivory/10"
                    aria-label="X (formerly Twitter)"
                  >
                    <XIcon className="h-5 w-5" />
                  </motion.a>
                  

                  <motion.a
                    href="https://www.facebook.com/profile.php?id=61574853640937"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory/80 hover:text-ivory hover:shadow-md hover:shadow-rose/10 transition-all duration-300 border border-ivory/10"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </motion.a>
                  */}
                  <motion.a
                    href="https://www.instagram.com/soluviaco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory/80 hover:text-ivory hover:shadow-md hover:shadow-rose/10 transition-all duration-300 border border-ivory/10"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/company/soluviaco"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory/80 hover:text-ivory hover:shadow-md hover:shadow-rose/10 transition-all duration-300 border border-ivory/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
