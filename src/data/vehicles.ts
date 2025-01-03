export interface Vehicle {
  id: string;
  category: string;
  name: string;
  description: string;
  capacity: number;
  luggage: number;
  imageUrl: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'standard',
    category: 'StandardDrive',
    name: 'Toyota CHR / Corolla Touring',
    description: 'Véhicules standards offrant un excellent rapport qualité-prix, parfaits pour les trajets quotidiens et professionnels.',
    capacity: 3,
    luggage: 3,
    imageUrl: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735444541/Design_sans_titre_5_jy77nq.png',
  },
  {
    id: 'green',
    category: 'GreenDrive',
    name: 'Tesla Model 3, Y / Hyundai IONIQ',
    description: 'Véhicules 100% électriques alliant performance et respect de l\'environnement, pour une expérience de transport éco-responsable.',
    capacity: 3,
    luggage: 3,
    imageUrl: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735444541/t%C3%A9l%C3%A9chargement_2_hwvwet.jpg',
  },
  {
    id: 'elite',
    category: 'EliteDrive',
    name: 'Mercedes Classe C, E / Tesla Model S',
    description: 'Véhicules premium combinant luxe et technologie, idéaux pour les déplacements d\'affaires et les occasions spéciales.',
    capacity: 3,
    luggage: 4,
    imageUrl: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735444541/Design_sans_titre_6_hw4khv.png',
  },
  {
    id: 'vip',
    category: 'VipDrive',
    name: 'Mercedes Classe S / Tesla Model X',
    description: 'L\'excellence du transport VIP avec des véhicules haut de gamme offrant un confort exceptionnel et des prestations exclusives.',
    capacity: 3,
    luggage: 4,
    imageUrl: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735444541/2022-Mercedes-Benz-S-Class-color-Cirrus-Silver-metallic_gb9kk0.png',
  },
  {
    id: 'van',
    category: 'VanDrive',
    name: 'Mercedes Classe V / Vito / Caravelle',
    description: 'Véhicules spacieux et confortables, parfaits pour les groupes et les familles, avec un grand espace pour les bagages.',
    capacity: 7,
    luggage: 8,
    imageUrl: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735444541/imgbin-mercedes-v-class-mercedes-benz-viano-mercedes-benz-e-class-mercedes-benz-vito-mercedes-uw6d1kFPk3WM5CWU3FQtFs95M_auaexz.jpg',
  }
];