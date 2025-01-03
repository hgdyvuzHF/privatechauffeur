import React from 'react';
import {
  Car, Calendar, UserCheck, Plane, Briefcase, Shield,
  ShoppingBag, Users, Map, Leaf, Lock, Wine
} from 'lucide-react';
import { ServiceCategoryType } from '../types/services';

export const serviceCategories: ServiceCategoryType[] = [
  {
    title: "Location de VTC pour Événements",
    description: "Des solutions de transport premium pour tous vos événements importants",
    services: [
      {
        icon: <Calendar className="h-6 w-6 text-primary-600" />,
        title: "Événements Privés et Professionnels",
        description: "Location de véhicules pour mariages, anniversaires, séminaires et conférences, avec ou sans chauffeur."
      },
      {
        icon: <Car className="h-6 w-6 text-primary-600" />,
        title: "Soirées de Gala et Événements VIP",
        description: "Service haut de gamme avec véhicules de luxe pour vos soirées prestigieuses."
      }
    ]
  },
  {
    title: "Chauffeur Privé avec Service Personnalisé",
    description: "Un service sur mesure pour répondre à tous vos besoins de transport",
    services: [
      {
        icon: <UserCheck className="h-6 w-6 text-primary-600" />,
        title: "Chauffeur à Disposition",
        description: "Forfaits journée complète avec chauffeur privé pour tous vos déplacements."
      },
      {
        icon: <Plane className="h-6 w-6 text-primary-600" />,
        title: "Service d'Accueil VIP",
        description: "Accueil personnalisé à l'aéroport ou à la gare avec assistance bagages."
      }
    ]
  },
  {
    title: "Services de Bagages et Transport",
    description: "Solutions complètes pour la gestion de vos bagages",
    services: [
      {
        icon: <Briefcase className="h-6 w-6 text-primary-600" />,
        title: "Gestion des Bagages",
        description: "Service de prise en charge et livraison de bagages porte-à-porte."
      },
      {
        icon: <Lock className="h-6 w-6 text-primary-600" />,
        title: "Stockage Temporaire",
        description: "Solutions sécurisées de stockage temporaire pour vos effets personnels."
      }
    ]
  },
  {
    title: "Service VIP et Concierge",
    description: "Une expérience exclusive et personnalisée",
    services: [
      {
        icon: <Shield className="h-6 w-6 text-primary-600" />,
        title: "Accès Privilégié",
        description: "Service VIP pour accès exclusif aux événements et zones réservées."
      },
      {
        icon: <UserCheck className="h-6 w-6 text-primary-600" />,
        title: "Concierge Privé",
        description: "Assistant personnel pour gérer tous vos besoins pendant votre séjour."
      }
    ]
  },
  {
    title: "Expérience Shopping avec Sécurité",
    description: "Shopping de luxe en toute sérénité",
    services: [
      {
        icon: <ShoppingBag className="h-6 w-6 text-primary-600" />,
        title: "Shopping Personnalisé",
        description: "Expérience shopping exclusive avec chauffeur dédié."
      },
      {
        icon: <Shield className="h-6 w-6 text-primary-600" />,
        title: "Sécurité Privée Shopping",
        description: "Services de sécurité professionnelle pour vos achats de luxe."
      }
    ]
  },
  {
    title: "Services de Transfert Spécialisés",
    description: "Solutions de transport adaptées à chaque situation",
    services: [
      {
        icon: <Users className="h-6 w-6 text-primary-600" />,
        title: "Transferts de Groupe",
        description: "Transport pour groupes lors d'événements de grande envergure."
      },
      {
        icon: <Shield className="h-6 w-6 text-primary-600" />,
        title: "Transfert VIP",
        description: "Service premium pour célébrités et clients exigeants."
      }
    ]
  },
  {
    title: "Expériences à Thème et Tourisme Privé",
    description: "Découvrez la ville autrement",
    services: [
      {
        icon: <Map className="h-6 w-6 text-primary-600" />,
        title: "Visites Guidées Privées",
        description: "Circuits personnalisés avec chauffeur et guide privé en option."
      },
      {
        icon: <Wine className="h-6 w-6 text-primary-600" />,
        title: "Expérience Gastronomique",
        description: "Transport privé pour vos expériences gastronomiques."
      }
    ]
  },
  {
    title: "Transports Écologiques",
    description: "Des solutions respectueuses de l'environnement",
    services: [
      {
        icon: <Leaf className="h-6 w-6 text-primary-600" />,
        title: "VTC Écologique",
        description: "Flotte de véhicules électriques et hybrides."
      },
      {
        icon: <Shield className="h-6 w-6 text-primary-600" />,
        title: "Événements Éco-responsables",
        description: "Partenariats et forfaits spéciaux pour événements écologiques."
      }
    ]
  }
];