import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Collecte des Informations</h2>
              <p className="text-gray-600">
                Nous collectons les informations que vous nous fournissez directement lors de la réservation de nos services, 
                notamment : nom, prénom, adresse email, numéro de téléphone, et détails du trajet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Utilisation des Informations</h2>
              <p className="text-gray-600">
                Les informations collectées sont utilisées pour :
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Fournir et améliorer nos services de transport</li>
                <li>Communiquer avec vous concernant votre réservation</li>
                <li>Envoyer des confirmations et rappels de trajet</li>
                <li>Traiter les paiements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Protection des Données</h2>
              <p className="text-gray-600">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles 
                contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Vos Droits</h2>
              <p className="text-gray-600">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant notre politique de confidentialité, contactez-nous à :<br />
                Email : privacy@privatechauffeur.fr<br />
                Téléphone : +33 6 66 20 59 82
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}