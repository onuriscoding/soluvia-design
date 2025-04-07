"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import GradientText from "@/app/animations/gradient-text";

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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      setMessage(dictionary.contact.contactForm.requiredFieldsMessage || "Please fill out all required fields");
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
      setMessage(dictionary.contact.contactForm.confirmationThanks || "Thank you for your message! We'll get back to you soon.");
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
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-6xl font-bold tracking-tight sm:text-4xl md:text-8xl">
            <GradientText
              colors={[
                "#3d5a80",
                "#b76e79",
                "#e0d5c0",
                "#3d5a80",
                "#b76e79",
                "#3d5a80",
              ]}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
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
                        ? dictionary.contact.contactForm.confirmationThanks || "Message Sent!" 
                        : dictionary.contact.contactForm.errorTitle || "Error"}
                    </h3>
                    <p className="mb-6 text-ivory/70">
                      {status === "success" 
                        ? dictionary.contact.contactForm.confirmationDescription || "Thank you for reaching out. We'll get back to you as soon as possible."
                        : dictionary.contact.contactForm.errorMessage || "Failed to send message. Please try again."}
                    </p>
                    <Button
                      onClick={() => resetForm()}
                      className="bg-gradient-to-r from-rose to-sapphire hover:shadow-lg hover:shadow-rose/20"
                    >
                      {dictionary.contact.contactForm.anotherMessage}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-ivory/80">
                          {dictionary.contact.contactForm.name} <span className="text-rose">*</span>
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
                          {dictionary.contact.contactForm.email} <span className="text-rose">*</span>
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
                          <option value="web-design">{dictionary.contact.contactForm.servicesOption1}</option>
                          <option value="ai">{dictionary.contact.contactForm.servicesOption2}</option>
                          <option value="seo">{dictionary.contact.contactForm.servicesOption3}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-ivory/80">
                        {dictionary.contact.contactForm.budgetRange} <span className="text-rose">*</span>
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
                            {dictionary.contact.contactForm.projectTimeframeOption1}
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
                            {dictionary.contact.contactForm.projectTimeframeOption2}
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
                            {dictionary.contact.contactForm.projectTimeframeOption3}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-ivory/80">
                        {dictionary.contact.contactForm.message} <span className="text-rose">*</span>
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
                          <span>{dictionary.contact.contactForm.errorMessage || message}</span>
                        </div>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="default"
                      className="mt-4 w-full bg-gradient-to-r from-rose to-sapphire hover:shadow-lg hover:shadow-rose/20"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? dictionary.contact.contactForm.sending : dictionary.contact.contactForm.sendMessage}
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
                      href="tel:+32499242951"
                      className="text-ivory/70 hover:text-sapphire transition-colors"
                    >
                      +32 499 24 29 51
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
                    <span className="text-ivory/70">{dictionary.contact.monday} - {dictionary.contact.friday}</span>
                    <span className="text-ivory">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">{dictionary.contact.saturday}</span>
                    <span className="text-ivory">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/70">{dictionary.contact.sunday}</span>
                    <span className="text-ivory">{dictionary.contact.closed}</span>
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
                  {["facebook", "twitter", "instagram", "linkedin"].map(
                    (platform, index) => (
                      <motion.a
                        key={platform}
                        href="#"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/50 text-ivory/80 hover:text-ivory hover:shadow-md hover:shadow-rose/10 transition-all duration-300 border border-ivory/10"
                        aria-label={platform}
                      >
                        {platform === "facebook" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        )}
                        {platform === "twitter" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                          </svg>
                        )}
                        {platform === "instagram" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        )}
                        {platform === "linkedin" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        )}
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
