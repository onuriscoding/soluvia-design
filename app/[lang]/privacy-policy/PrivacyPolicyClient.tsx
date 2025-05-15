"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GradientText from "@/app/animations/gradient-text";

interface PrivacyPolicyClientProps {
  dictionary: any;
  lang: string;
}

export default function PrivacyPolicyClient({ dictionary, lang }: PrivacyPolicyClientProps) {
  const t = (key: string) => {
    const keys = key.split(".");
    let result = dictionary;
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return result;
  };

  const isEn = lang === "en";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <main className="flex min-h-screen flex-col py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-2"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center text-ivory/70 hover:text-rose transition-colors mb-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>{isEn ? "Back to Home" : "Retour à l'accueil"}</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ivory mb-2">
              {isEn ? "Privacy " : "Politique de "}
              <GradientText
                colors={[
                  "#b76e79",
                  "#e0d5c0",
                  "#b76e79",
                  "#e0d5c0",
                ]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                {isEn ? "Policy" : "Confidentialité"}
              </GradientText>
            </h1>
            <p className="text-lg text-ivory/70 mt-1">
              {isEn 
                ? "Last updated: April 6, 2025" 
                : "Dernière mise à jour: 6 avril 2025"}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="prose prose-lg max-w-none text-ivory/90 mb-2">
            <p>
              {isEn 
                ? "At Soluvia, we are committed to your privacy. This Privacy Policy explains our practices regarding your information when you visit our website or use our services." 
                : "Chez Soluvia, nous nous engageons à respecter votre vie privée. Cette Politique de Confidentialité explique nos pratiques concernant vos informations lorsque vous visitez notre site web ou utilisez nos services."}
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div variants={itemVariants} className="bg-charcoal/30 p-4 rounded-xl border border-ivory/10 my-3">
            <h2 className="text-xl font-semibold mb-2 text-ivory">
              {isEn ? "Table of Contents" : "Table des matières"}
            </h2>
            <ul className="space-y-0.5 list-decimal pl-5 text-ivory/80">
              <li><a href="#limited-information-collection" className="hover:text-rose transition-colors">{isEn ? "Limited Information Collection" : "Collecte limitée d'informations"}</a></li>
              <li><a href="#use-of-information" className="hover:text-rose transition-colors">{isEn ? "Use of Information" : "Utilisation des informations"}</a></li>
              <li><a href="#cookies" className="hover:text-rose transition-colors">{isEn ? "Cookies and Tracking" : "Cookies et suivi"}</a></li>
              <li><a href="#third-party-websites" className="hover:text-rose transition-colors">{isEn ? "Third-Party Websites" : "Sites web tiers"}</a></li>
              <li><a href="#data-security" className="hover:text-rose transition-colors">{isEn ? "Data Security" : "Sécurité des données"}</a></li>
              <li><a href="#changes-to-policy" className="hover:text-rose transition-colors">{isEn ? "Changes to This Privacy Policy" : "Modifications de cette politique"}</a></li>
              <li><a href="#contact-us" className="hover:text-rose transition-colors">{isEn ? "Contact Us" : "Nous contacter"}</a></li>
            </ul>
          </motion.div>

          {/* Limited Information Collection */}
          <motion.section 
            id="limited-information-collection" 
            variants={itemVariants} 
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "1. Limited Information Collection" : "1. Collecte limitée d'informations"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "Soluvia only collects personal information that you voluntarily provide when you contact us through our website forms. This information may include your name, email address, phone number, and details about your project or inquiry." 
                  : "Soluvia collecte uniquement les informations personnelles que vous fournissez volontairement lorsque vous nous contactez via les formulaires de notre site web. Ces informations peuvent inclure votre nom, adresse e-mail, numéro de téléphone et les détails concernant votre projet ou demande."}
              </p>
              <p>
                {isEn 
                  ? "We do not use analytics tools, cookies, or any tracking technologies to monitor your browsing behavior or collect additional information about you or your activities on our site." 
                  : "Nous n'utilisons pas d'outils d'analyse, de cookies ou de technologies de suivi pour surveiller votre comportement de navigation ou collecter des informations supplémentaires sur vous ou vos activités sur notre site."}
              </p>
            </div>
          </motion.section>

          {/* Use of Information */}
          <motion.section 
            id="use-of-information" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "2. Use of Information" : "2. Utilisation des informations"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "We use the contact information you provide solely for the purpose of responding to your inquiries and communicating with you about our services. We do not use this information for marketing purposes or share it with third parties unless required by law." 
                  : "Nous utilisons les informations de contact que vous fournissez uniquement dans le but de répondre à vos demandes et de communiquer avec vous concernant nos services. Nous n'utilisons pas ces informations à des fins de marketing et ne les partageons pas avec des tiers, sauf si la loi l'exige."}
              </p>
              <p>
                {isEn 
                  ? "Your contact information is retained only for as long as necessary to respond to your inquiry or to provide our services to you if you become a client." 
                  : "Vos informations de contact ne sont conservées que pendant le temps nécessaire pour répondre à votre demande ou pour vous fournir nos services si vous devenez client."}
              </p>
            </div>
          </motion.section>

          {/* Cookies and Tracking */}
          <motion.section 
            id="cookies" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "3. Cookies and Tracking" : "3. Cookies et suivi"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "Our website does not use cookies or any other tracking technologies to monitor browsing behavior or collect information about you." 
                  : "Notre site web n'utilise pas de cookies ou d'autres technologies de suivi pour surveiller le comportement de navigation ou collecter des informations vous concernant."}
              </p>
            </div>
          </motion.section>

          {/* Third-Party Websites */}
          <motion.section 
            id="third-party-websites" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "4. Third-Party Websites" : "4. Sites web tiers"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit. Please note that these external sites may collect information about you according to their own privacy practices." 
                  : "Notre site web peut contenir des liens vers des sites web tiers. Nous ne sommes pas responsables des pratiques de confidentialité ou du contenu de ces sites web. Nous vous encourageons à consulter les politiques de confidentialité de tout site tiers que vous visitez. Veuillez noter que ces sites externes peuvent collecter des informations vous concernant selon leurs propres pratiques de confidentialité."}
              </p>
            </div>
          </motion.section>

          {/* Data Security */}
          <motion.section 
            id="data-security" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "5. Data Security" : "5. Sécurité des données"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "We take appropriate measures to protect any personal information you provide through our contact forms. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security." 
                  : "Nous prenons des mesures appropriées pour protéger toutes les informations personnelles que vous fournissez via nos formulaires de contact. Cependant, veuillez noter qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est sécurisée à 100%, et nous ne pouvons pas garantir une sécurité absolue."}
              </p>
            </div>
          </motion.section>

          {/* Changes to Policy */}
          <motion.section 
            id="changes-to-policy" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "6. Changes to This Privacy Policy" : "6. Modifications de cette politique"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page with a new effective date." 
                  : "Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre pour refléter des changements dans nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires. Nous vous informerons de tout changement important en publiant la politique mise à jour sur cette page avec une nouvelle date d'entrée en vigueur."}
              </p>
            </div>
          </motion.section>

          {/* Contact Us */}
          <motion.section 
            id="contact-us" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "7. Contact Us" : "7. Nous contacter"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:" 
                  : "Si vous avez des questions ou des préoccupations concernant cette Politique de Confidentialité ou la façon dont nous traitons vos informations personnelles, veuillez nous contacter à :"}
              </p>
              <div className="p-3 bg-charcoal/50 rounded-lg border border-ivory/10 mt-2">
                <p className="font-medium">Soluvia</p>
                <p>Email: <a href="mailto:info@soluvia.co" className="text-rose hover:text-rose/80 transition-colors">info@soluvia.co</a></p>
                <p>{isEn ? "Phone: +44 (20) 3318 6185" : "Téléphone: +44 (20) 3318 6185"}</p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
} 