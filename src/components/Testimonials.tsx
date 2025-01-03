import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Directrice Marketing",
    content: "Un service exceptionnel ! Mon chauffeur était ponctuel, professionnel et très courtois. La voiture était impeccable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Thomas Dubois",
    role: "Entrepreneur",
    content: "Je fais appel à leurs services régulièrement pour mes déplacements professionnels. La qualité est constante et le service est irréprochable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Marie Lambert",
    role: "Avocate",
    content: "Une expérience de transport haut de gamme. Je recommande vivement pour la fiabilité et le professionnalisme.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits qui nous font confiance pour leurs déplacements quotidiens.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}