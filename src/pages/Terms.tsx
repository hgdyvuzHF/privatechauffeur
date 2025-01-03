import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Conditions Générales</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Services</h2>
              <p className="text-gray-600">
                Private Chauffeur propose des services de transport privé avec chauffeur. Nos services 
                incluent les transferts aéroport, les trajets urbains et interurbains.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Réservations</h2>
              <p className="text-gray-600">
                Les réservations doivent être effectuées à l'avance via notre site web ou par téléphone. 
                Une confirmation de réservation vous sera envoyée par email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Tarifs et Paiement</h2>
              <ul className="list-disc ml-6 text-gray-600">
                <li>Les tarifs sont indiqués en euros TTC</li>
                <li>Le paiement peut être effectué par carte bancaire ou en espèces</li>
                <li>Des frais supplémentaires peuvent s'appliquer pour les retards ou modifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Annulations</h2>
              <p className="text-gray-600">
                Les conditions d'annulation sont les suivantes :
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Plus de 24h avant : remboursement intégral</li>
                <li>Entre 24h et 12h : 50% de frais</li>
                <li>Moins de 12h : aucun remboursement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Responsabilités</h2>
              <p className="text-gray-600">
                Private Chauffeur s'engage à fournir un service professionnel et ponctuel. Nous ne sommes 
                pas responsables des retards dus à des circonstances indépendantes de notre volonté 
                (conditions météorologiques, trafic exceptionnel, etc.).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant nos conditions générales :<br />
                Email : contact@privatechauffeur.fr<br />
                Téléphone : +33 6 66 20 59 82
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}