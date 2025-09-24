import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'how-it-works', label: 'طريقة العمل' },
    { id: 'donation-form', label: 'تبرع الآن' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'partners', label: 'شركاؤنا' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#357445] dark:bg-[#2a5a37] shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
           <img
                src="/src/resources/images/logo1.png"
                alt="زوائد الخير"
                className="h-12 rounded-xl overflow-hidden object-cover"
              />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-[#1FA84E] transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-white hover:text-[#BFAA2A] transition-colors duration-200"
              aria-label="تبديل الوضع المظلم"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#BFAA2A] transition-colors duration-200"
              aria-label="القائمة"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#357445] dark:bg-[#2a5a37] pb-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-right text-white hover:text-[#1FA84E] py-2 px-4 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
