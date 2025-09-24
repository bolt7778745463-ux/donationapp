import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface CarouselProps {
  images: string[];
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className={`relative ${className} mx-8 w-full max-w-[95%] md:max-w-[63%] mt-4 md:mt-12`} {...handlers}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`صورة خيرية ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 bottom-auto transform -translate-y-1/2 z-20 p-2 md:p-3 bg-[#357445]/80 hover:bg-[#357445] hover:scale-110 text-white rounded-full transition-all duration-300"
        aria-label="الصورة السابقة"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 bottom-auto transform -translate-y-1/2 z-20 p-2 md:p-3 bg-[#357445]/80 hover:bg-[#357445] hover:scale-110 text-white rounded-full transition-all duration-300"
        aria-label="الصورة التالية"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 backdrop-blur-sm ${
              index === currentImageIndex
                ? 'bg-[#BFAA2A] scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60 border border-white/30'
            }`}
            aria-label={`الانتقال إلى الصورة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
