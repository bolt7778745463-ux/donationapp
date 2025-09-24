import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { ButtonVisibilityProvider, useButtonVisibility } from './context/ButtonVisibilityContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DonationForm from './components/DonationForm';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { Phone, MessageCircle } from 'lucide-react';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  // Check token on app load and redirect if necessary
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/admin' && !token) {
      window.location.href = '/login';
    }
  }, [token]);

  return (
    <DarkModeProvider>
      <ButtonVisibilityProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={token ? <AdminDashboard token={token} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ButtonVisibilityProvider>
    </DarkModeProvider>
  );
}

function AppContent() {
  const { isVisible } = useButtonVisibility();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <DonationForm />
        <About />
        <HowItWorks />
        <Testimonials />
        <Partners />
        <FAQ />
      </main>
      <Footer />

      {/* Floating Action Buttons */}
      {isVisible && (
        <div className="fixed bottom-16 left-4 z-50 flex flex-col gap-3 transition-all duration-500 ease-in-out md:transition-none">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/+966505368436" // Replace with actual WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-3 py-2 rounded-full shadow-xl shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 w-auto h-16 justify-center text-center"
            aria-label="واتساب"
          >
            <MessageCircle className="w-10 h-10 bg-white/20 p-3 rounded-full shadow-lg" />
            <span className="inline md:inline">تواصل واتساب</span>
          </a>

          {/* Call Button */}
          <a
            href="tel:+96650535546" // Replace with actual phone number
            className="group bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-3 py-2 rounded-full shadow-xl shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 w-auto h-16 justify-center text-center"
            aria-label="اتصال"
          >
            <Phone className="w-10 h-10 bg-white/20 p-3 rounded-full shadow-lg" />
            <span className="inline md:inline">اتصل بنا الان</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;