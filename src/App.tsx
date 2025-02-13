import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import CompanyLogos from './components/CompanyLogos';
import ChauffeurSection from './components/ChaufferSection';
import BookingConfirmation from './pages/BookingConfirmation';
import VehicleSelection from './pages/VehicleSelection';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Rates from './pages/Rates';
import GuidedTours from './pages/GuidedTours';
import WhatsAppBadge from './components/WhatsAppBadge';
import Breadcrumb from './components/Breadcrumb';
import Footer from './components/Footer';
import GoogleReviews from './components/GoogleReviews';

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ThankYou from './pages/TankYou';

export default function App() {
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [initialBookingData, setInitialBookingData] = useState<any>(null);

  const handleInitialBookingSubmit = (bookingData: any) => {
    setInitialBookingData(bookingData);
    setShowVehicleSelection(true);
  };

  const handleVehicleSelectionSubmit = (vehicleData: any) => {
    setCurrentBooking({
      ...initialBookingData,
      ...vehicleData
    });
    setShowVehicleSelection(false);
  };

  const handleBackToHome = () => {
    setCurrentBooking(null);
    setShowVehicleSelection(false);
    setInitialBookingData(null);
  };

  const getBreadcrumbSteps = () => {
    const steps = [
      {
        label: 'Détails du trajet',
        isCompleted: !!initialBookingData,
        isActive: !showVehicleSelection && !currentBooking,
        onClick: initialBookingData ? handleBackToHome : undefined
      },
      {
        label: 'Choix du véhicule',
        isCompleted: !!currentBooking,
        isActive: showVehicleSelection,
        onClick: currentBooking ? () => {
          setCurrentBooking(null);
          setShowVehicleSelection(true);
        } : undefined
      },
      {
        label: 'Confirmation',
        isCompleted: false,
        isActive: !!currentBooking,
        onClick: undefined
      }
    ];
    return steps;
  };

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Routes>
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/rates" element={<Rates />} />
                <Route path="/guided-tours" element={<GuidedTours />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route
                  path="/"
                  element={
                    <>
                      {(showVehicleSelection || currentBooking) && (
                        <Breadcrumb steps={getBreadcrumbSteps()} />
                      )}
                      {currentBooking ? (
                        <BookingConfirmation
                          booking={currentBooking}
                          onBack={handleBackToHome}
                        />
                      ) : showVehicleSelection ? (
                        <VehicleSelection
                          onSubmit={handleVehicleSelectionSubmit}
                          onBack={() => setShowVehicleSelection(false)}
                        />
                      ) : (
                        <>
                          <Hero onBookingSubmit={handleInitialBookingSubmit} />
                          <TrustBadges />
                          <CompanyLogos />
                          <ChauffeurSection />
                          <GoogleReviews />
                        </>
                      )}
                    </>
                  }
                />
              </Routes>
              <WhatsAppBadge />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}