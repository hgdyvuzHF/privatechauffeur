import React, { useEffect, useState } from 'react';

export default function ContactForm() {
  // Load saved form data from localStorage or set default values
  const getInitialFormData = () => {
    const savedData = localStorage.getItem('ContactForm');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  // Save form data to localStorage on every change
  useEffect(() => {
    localStorage.setItem('ContactForm', JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            required
            className="w-full rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            className="w-full rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            required
            rows={4}
            className="w-full rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
