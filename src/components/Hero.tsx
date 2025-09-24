import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Users, Package, Star, ArrowDown } from 'lucide-react';
import Carousel from './Carousel';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    '/src/resources/images/imagecarousel-4.jpg',
    '/src/resources/images/imagecarousel-1.png',
    '/src/resources/images/imagecarousel-2.jpg',
    '/src/resources/images/imagecarousel-3.jpg',
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToDonationForm = () => {
    const element = document.getElementById('donation-form');
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementTop + 85, behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-start overflow-hidden">
      {/* Carousel */}
      <Carousel images={heroImages} className="w-full max-w-lg aspect-video rounded-xl overflow-hidden mb-8" />
      <div className="relative z-10 mx-8 w-full max-w-[95%] md:max-w-[70%]">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} bg-gradient-to-br from-[#357445]/90 via-[#1FA84E]/80 to-[#BFAA2A]/70 dark:from-[#2a5a37]/95 dark:via-[#1a8240]/85 dark:to-[#8f7a1a]/75 p-2 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm`}>
            <div className="mb-2">
              
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold md:font-bold mb-4 leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-white via-[#BFAA2A] to-white bg-clip-text text-transparent">
                قطعة منك…حياة لغيرك
              </span>
              <br />
            </h1>

            <p className="text-2xl md:text-xl lg:text-2xl text-white/95 font-semibold md:font-normal mb-6 leading-relaxed max-w-4xl mx-auto drop-shadow-md">
              زوائدك ... خير ينتفع بة
              <br />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={scrollToDonationForm}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#BFAA2A] to-[#1FA84E] hover:from-[#1FA84E] hover:to-[#357445] text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white animate-border-blink neon-button bg-white/10"
              >
                ابدأ التبرع الآن
                <ArrowLeft className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;