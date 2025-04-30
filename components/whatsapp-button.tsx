"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/447438799482"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center transition-all duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Contact us on WhatsApp"
    >
      <Image
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        width={56}
        height={56}
        priority
      />
    </motion.a>
  );
} 