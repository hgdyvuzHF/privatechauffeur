import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppBadge() {
  const phoneNumber = "+33666205982";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline">Contactez-nous</span>
    </a>
  );
}