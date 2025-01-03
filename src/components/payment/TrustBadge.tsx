import React from 'react';

export default function TrustBadge() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Paiement 100% Sécurisé</h3>
      <div className="flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dinbxrql6/image/upload/v1735809567/67-678566_trust-badges-shopify-png_prh0lr.jpg"
          alt="Trust Badge"
          className="max-w-full h-auto mb-4"
        />
        <p className="text-sm text-gray-600 text-center">
          Vos paiements sont sécurisés par un système de cryptage SSL 256-bits.
          Nous ne stockons jamais vos informations de carte bancaire.
        </p>
      </div>
    </div>
  );
}