"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GradientText from "@/app/animations/gradient-text";

interface TermsOfServiceClientProps {
  dictionary: any;
  lang: string;
}

export default function TermsOfServiceClient({ dictionary, lang }: TermsOfServiceClientProps) {
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
          className="space-y-4"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center text-ivory/70 hover:text-rose transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>{isEn ? "Back to Home" : "Retour à l'accueil"}</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ivory mb-3">
              {isEn ? "Terms of " : "Conditions "}
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
                {isEn ? "Service" : "d'utilisation"}
              </GradientText>
            </h1>
            <p className="text-lg text-ivory/70 mt-2">
              {isEn 
                ? "Last updated: April 6, 2025" 
                : "Dernière mise à jour: 6 avril 2025"}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="prose prose-lg max-w-none text-ivory/90 mb-4">
            <p>
              {isEn 
                ? "These Terms of Service ('Terms') govern your use of the Soluvia website and services. By accessing our website or using our services, you agree to be bound by these Terms. Please read them carefully." 
                : "Ces Conditions d'utilisation ('Conditions') régissent votre utilisation du site web et des services de Soluvia. En accédant à notre site web ou en utilisant nos services, vous acceptez d'être lié par ces Conditions. Veuillez les lire attentivement."}
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div variants={itemVariants} className="bg-charcoal/30 p-5 rounded-xl border border-ivory/10 my-5">
            <h2 className="text-xl font-semibold mb-3 text-ivory">
              {isEn ? "Table of Contents" : "Table des matières"}
            </h2>
            <ul className="space-y-1 list-decimal pl-5 text-ivory/80">
              <li><a href="#acceptance" className="hover:text-rose transition-colors">{isEn ? "Acceptance of Terms" : "Acceptation des conditions"}</a></li>
              <li><a href="#services" className="hover:text-rose transition-colors">{isEn ? "Description of Services" : "Description des services"}</a></li>
              <li><a href="#user-obligations" className="hover:text-rose transition-colors">{isEn ? "User Obligations" : "Obligations de l'utilisateur"}</a></li>
              <li><a href="#intellectual-property" className="hover:text-rose transition-colors">{isEn ? "Intellectual Property" : "Propriété intellectuelle"}</a></li>
              <li><a href="#payment-terms" className="hover:text-rose transition-colors">{isEn ? "Payment Terms" : "Conditions de paiement"}</a></li>
              <li><a href="#limitation-liability" className="hover:text-rose transition-colors">{isEn ? "Limitation of Liability" : "Limitation de responsabilité"}</a></li>
              <li><a href="#indemnification" className="hover:text-rose transition-colors">{isEn ? "Indemnification" : "Indemnisation"}</a></li>
              <li><a href="#termination" className="hover:text-rose transition-colors">{isEn ? "Termination" : "Résiliation"}</a></li>
              <li><a href="#governing-law" className="hover:text-rose transition-colors">{isEn ? "Governing Law" : "Loi applicable"}</a></li>
              <li><a href="#changes-to-terms" className="hover:text-rose transition-colors">{isEn ? "Changes to Terms" : "Modifications des conditions"}</a></li>
              <li><a href="#contact-us" className="hover:text-rose transition-colors">{isEn ? "Contact Us" : "Nous contacter"}</a></li>
            </ul>
          </motion.div>

          {/* Acceptance of Terms */}
          <motion.section 
            id="acceptance" 
            variants={itemVariants} 
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "1. Acceptance of Terms" : "1. Acceptation des conditions"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "By accessing or using the Soluvia website ('Site') and services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Site or services." 
                  : "En accédant ou en utilisant le site web de Soluvia ('Site') et ses services, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser notre Site ou nos services."}
              </p>
              <p>
                {isEn 
                  ? "These Terms constitute a legally binding agreement between you and Soluvia, whether you are a client, visitor, or user of the Site." 
                  : "Ces Conditions constituent un accord juridiquement contraignant entre vous et Soluvia, que vous soyez un client, un visiteur ou un utilisateur du Site."}
              </p>
            </div>
          </motion.section>

          {/* Description of Services */}
          <motion.section 
            id="services" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "2. Description of Services" : "2. Description des services"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "Soluvia provides web design, development, SEO optimization, and AI automation services ('Services') to clients. The specific deliverables, timeline, and pricing for the Services will be outlined in a separate agreement or statement of work between Soluvia and the client." 
                  : "Soluvia fournit des services de conception web, développement, optimisation SEO et automatisation par IA ('Services') aux clients. Les livrables spécifiques, le calendrier et les tarifs des Services seront décrits dans un accord distinct ou un énoncé des travaux entre Soluvia et le client."}
              </p>
              <p>
                {isEn 
                  ? "Soluvia reserves the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. We will not be liable to you or any third party should we exercise this right." 
                  : "Soluvia se réserve le droit de modifier, suspendre ou interrompre toute partie des Services à tout moment, avec ou sans préavis. Nous ne serons pas responsables envers vous ou envers un tiers si nous exerçons ce droit."}
              </p>
            </div>
          </motion.section>

          {/* User Obligations */}
          <motion.section 
            id="user-obligations" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "3. User Obligations" : "3. Obligations de l'utilisateur"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "By using our Services, you agree to:" 
                  : "En utilisant nos Services, vous acceptez de :"}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  {isEn 
                    ? "Comply with all applicable laws and regulations" 
                    : "Respecter toutes les lois et réglementations applicables"}
                </li>
                <li>
                  {isEn 
                    ? "Not use the Services for any illegal or unauthorized purpose" 
                    : "Ne pas utiliser les Services à des fins illégales ou non autorisées"}
                </li>
              </ul>
              <p>
                {isEn 
                  ? "You are solely responsible for any content you provide in direct communications with us. By providing such content, you represent and warrant that you own all rights to such content or have obtained all necessary permissions to use it, and that the content does not infringe upon any third-party rights." 
                  : "Vous êtes seul responsable de tout contenu que vous fournissez dans vos communications directes avec nous. En fournissant un tel contenu, vous déclarez et garantissez que vous possédez tous les droits sur ce contenu ou que vous avez obtenu toutes les autorisations nécessaires pour l'utiliser, et que le contenu ne porte pas atteinte aux droits de tiers."}
              </p>
            </div>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section 
            id="intellectual-property" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "4. Intellectual Property" : "4. Propriété intellectuelle"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "All content, features, and functionality of the Site, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Soluvia or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws." 
                  : "Tout le contenu, les fonctionnalités et les fonctions du Site, y compris, mais sans s'y limiter, les textes, graphiques, logos, icônes, images, clips audio, téléchargements numériques, compilations de données et logiciels, sont la propriété exclusive de Soluvia ou de ses concédants de licence et sont protégés par les lois internationales sur le droit d'auteur, les marques de commerce, les brevets, les secrets commerciaux et autres lois sur la propriété intellectuelle."}
              </p>
              <p>
                {isEn 
                  ? "Upon full payment of all invoices, clients will receive ownership rights to the final deliverables as specified in their service agreement, except for third-party elements (such as stock photos, plugins, or fonts) which remain subject to their respective licenses. Soluvia retains ownership of all preliminary designs and unused concepts." 
                  : "Après paiement intégral de toutes les factures, les clients recevront les droits de propriété sur les livrables finaux comme spécifié dans leur accord de service, à l'exception des éléments tiers (comme les photos de stock, les plugins ou les polices) qui restent soumis à leurs licences respectives. Soluvia conserve la propriété de tous les designs préliminaires et concepts non utilisés."}
              </p>
              <p>
                {isEn 
                  ? "Soluvia reserves the right to display and link to your completed project as part of our portfolio and to write about the project on websites, in magazine articles, books, or for any other promotional purpose, unless explicitly agreed otherwise in writing." 
                  : "Soluvia se réserve le droit d'afficher et de créer un lien vers votre projet terminé dans le cadre de notre portfolio et d'écrire à propos du projet sur des sites Web, dans des articles de magazines, des livres ou à toute autre fin promotionnelle, sauf accord contraire explicite par écrit."}
              </p>
            </div>
          </motion.section>

          {/* Payment Terms */}
          <motion.section 
            id="payment-terms" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "5. Payment Terms" : "5. Conditions de paiement"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "Payment terms will be outlined in the project proposal or service agreement provided to you. Unless otherwise specified, Soluvia typically requires:" 
                  : "Les conditions de paiement seront décrites dans la proposition de projet ou l'accord de service qui vous est fourni. Sauf indication contraire, Soluvia exige généralement :"}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  {isEn 
                    ? "A 50% non-refundable deposit to begin work" 
                    : "Un acompte non remboursable de 50 % pour commencer le travail"}
                </li>
                <li>
                  {isEn 
                    ? "The remaining balance due upon project completion before final files are delivered or the website is launched" 
                    : "Le solde restant dû à l'achèvement du projet avant que les fichiers finaux ne soient livrés ou que le site web ne soit lancé"}
                </li>
              </ul>
              <p>
                {isEn 
                  ? "Late payments may incur interest charges. Non-payment may result in the suspension of services or the removal of work completed until outstanding balances are paid." 
                  : "Les paiements tardifs peuvent entraîner des frais d'intérêt. Le non-paiement peut entraîner la suspension des services ou le retrait du travail effectué jusqu'à ce que les soldes impayés soient réglés."}
              </p>
            </div>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section 
            id="limitation-liability" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "6. Limitation of Liability" : "6. Limitation de responsabilité"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "To the maximum extent permitted by law, Soluvia and its directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:" 
                  : "Dans toute la mesure permise par la loi, Soluvia et ses administrateurs, employés et agents ne seront pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, sans limitation, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes incorporelles, résultant de :"}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  {isEn 
                    ? "Your use or inability to use the Services" 
                    : "Votre utilisation ou incapacité à utiliser les Services"}
                </li>
                <li>
                  {isEn 
                    ? "Any changes made to the Services" 
                    : "Tout changement apporté aux Services"}
                </li>
                <li>
                  {isEn 
                    ? "Statements or conduct of any third party on the Service" 
                    : "Déclarations ou comportement de tout tiers sur le Service"}
                </li>
              </ul>
              <p>
                {isEn 
                  ? "In no event shall our total liability to you for all claims exceed the amount you paid us for the Services during the twelve (12) months preceding the date of any claim." 
                  : "En aucun cas notre responsabilité totale envers vous pour toutes les réclamations ne dépassera le montant que vous nous avez payé pour les Services au cours des douze (12) mois précédant la date de toute réclamation."}
              </p>
            </div>
          </motion.section>

          {/* Indemnification */}
          <motion.section 
            id="indemnification" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "7. Indemnification" : "7. Indemnisation"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "You agree to indemnify, defend, and hold harmless Soluvia and its officers, directors, employees, agents, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services, including but not limited to your User Content, any use of the Services' content, services, and products other than as expressly authorized in these Terms." 
                  : "Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Soluvia et ses dirigeants, administrateurs, employés, agents et fournisseurs contre toute réclamation, responsabilité, dommage, jugement, récompense, perte, coût, dépense ou frais (y compris les honoraires raisonnables d'avocat) découlant de ou liés à votre violation de ces Conditions ou à votre utilisation des Services, y compris, mais sans s'y limiter, votre Contenu Utilisateur, toute utilisation du contenu, des services et des produits des Services autre que celle expressément autorisée dans ces Conditions."}
              </p>
            </div>
          </motion.section>

          {/* Termination */}
          <motion.section 
            id="termination" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "8. Termination" : "8. Résiliation"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "Soluvia may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease." 
                  : "Soluvia peut résilier ou suspendre votre accès aux Services immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous enfreignez les Conditions. Après la résiliation, votre droit d'utiliser les Services cessera immédiatement."}
              </p>
              <p>
                {isEn 
                  ? "All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability." 
                  : "Toutes les dispositions des Conditions qui, par leur nature, devraient survivre à la résiliation survivront à la résiliation, y compris, sans limitation, les dispositions de propriété, les exclusions de garantie, l'indemnité et les limitations de responsabilité."}
              </p>
              <p>
                {isEn 
                  ? "If you wish to terminate your agreement with us, you may discontinue using our Services and notify us of your intention to cancel. Specific cancellation terms for ongoing services will be outlined in your service agreement." 
                  : "Si vous souhaitez résilier votre accord avec nous, vous pouvez cesser d'utiliser nos Services et nous informer de votre intention d'annuler. Les conditions d'annulation spécifiques pour les services continus seront décrites dans votre accord de service."}
              </p>
            </div>
          </motion.section>

          {/* Governing Law */}
          <motion.section 
            id="governing-law" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "9. Governing Law" : "9. Loi applicable"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "These Terms shall be governed and construed in accordance with the laws of Belgium, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights." 
                  : "Ces Conditions seront régies et interprétées conformément aux lois de la Belgique, sans égard à ses dispositions relatives aux conflits de lois. Notre incapacité à appliquer tout droit ou disposition de ces Conditions ne sera pas considérée comme une renonciation à ces droits."}
              </p>
            </div>
          </motion.section>

          {/* Changes to Terms */}
          <motion.section 
            id="changes-to-terms" 
            variants={itemVariants}
            className="mt-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-ivory mb-1">
              {isEn ? "10. Changes to Terms" : "10. Modifications des conditions"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion." 
                  : "Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant l'entrée en vigueur de nouvelles conditions. Ce qui constitue un changement important sera déterminé à notre seule discrétion."}
              </p>
              <p>
                {isEn 
                  ? "By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services." 
                  : "En continuant à accéder ou à utiliser nos Services après l'entrée en vigueur de toute révision, vous acceptez d'être lié par les conditions révisées. Si vous n'acceptez pas les nouvelles conditions, vous n'êtes plus autorisé à utiliser les Services."}
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
              {isEn ? "11. Contact Us" : "11. Nous contacter"}
            </h2>
            <div className="space-y-2 text-ivory/80">
              <p>
                {isEn 
                  ? "If you have any questions about these Terms, please contact us at:" 
                  : "Si vous avez des questions concernant ces Conditions, veuillez nous contacter à :"}
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