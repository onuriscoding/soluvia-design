"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ExternalLink,
  Globe,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/i18nContext";
import { LanguageSwitcher } from "./language-switcher";

export function RedesignedFooter() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ivory/10 bg-[#1a1c2a]/70 py-20 w-full z-10 mt-auto">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ivory/10 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/soluvia-final-no-bg.png"
                  alt="Soluvia Design Logo"
                  width={150}
                  height={100}
                />
              </Link>

              <p className="mt-6 text-ivory/70 max-w-md translate-x-100px">
                {t("footer.description")}
              </p>

              <div className="mt-8 flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-rose mr-3" />
                  <a
                    href="mailto:hello@soluviadesign.com"
                    className="text-ivory/70 hover:text-rose transition-colors"
                  >
                    info@soluvia.co
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-rose mr-3" />
                  <a
                    href="tel:+15551234567"
                    className="text-ivory/70 hover:text-rose transition-colors"
                  >
                    +32 (499) 24 29 51
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="ml-5 text-lg font-semibold text-ivory">
              {t("services.allServices")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/web-design-development"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>{t("services.web-design")}</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/services/seo-optimization"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>{t("services.seo")}</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/services/ai-automation"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>{t("services.automation")}</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="ml-5 text-lg font-semibold text-ivory">
              {t("footer.company")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>{t("footer.about")}</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/how-it-works"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>{t("footer.how-it-works")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>{t("footer.contact")}</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="ml-5 text-lg font-semibold text-ivory">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/resources/faq"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/support"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-between space-y-6 border-t border-ivory/10 pt-8 text-sm text-ivory/50 md:flex-row md:space-y-0"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>{t("footer.copyright")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              {t("footer.termsOfService")}
            </Link>
            {/* <Link
              href="/cookies-policy"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              Cookies Policy
            </Link> */}
            {/*
            <Link
              href="/sitemap"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              {t("footer.sitemap")}
            </Link>
            */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
