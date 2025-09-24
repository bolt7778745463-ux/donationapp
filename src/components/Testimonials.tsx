import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      text: 'تجربة رائعة مع زوائد الخير. الفريق محترف ومنظم، وتم استلام التبرعات في الوقت المحدد. أشعر بالفخر للمساهمة في هذا العمل الخيري.',
      avatar: '👨',
    },
    {
      id: 2,
      name: 'فاطمة  علي',
      text: 'منصة سهلة الاستخدام وفريق عمل متعاون. تبرعت بكمية كبيرة من الملابس وتم التعامل معها بطريقة احترافية. بالتأكيد سأتبرع مرة أخرى.',
      avatar: '👩',
    },
    {
      id: 3,
      name: 'خالد السعدي',
      text: 'شكراً لكم على الجهود المبذولة. التطبيق سهل جداً والخدمة سريعة. من الرائع رؤية التبرعات تصل لمن يحتاجها فعلاً.',
      avatar: '👨',
    },
    {
      id: 4,
      name: 'نورا أحمد',
      text: 'تجربة مميزة! الموقع واضح والفريق متجاوب. تم تحديد موعد الاستلام بسرعة وتم التعامل مع التبرعات باحترام كبير.',
      avatar: '👩',
    },
    {
      id: 5,
      name: 'سعد الزهراني',
      text: 'أنصح الجميع بالتبرع من خلال زوائد الخير. عملية منظمة وشفافة، وأشعر بالثقة في أن تبرعاتي ستصل لمستحقيها.',
      avatar: '👨',
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Touch event handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section
      className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            آراء المتبرعين
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            اكتشف تجارب المتبرعين الذين ساهموا معنا في خدمة المجتمع
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Simple Testimonial Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden border border-gray-100 dark:border-gray-700">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#BFAA2A] opacity-30" />

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-[#357445] to-[#1FA84E] rounded-full flex items-center justify-center text-6xl mx-auto mb-6 shadow-lg">
                {testimonials[currentIndex].avatar}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {testimonials[currentIndex].name}
              </h3>

              <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>
            </div>
          </div>

          {/* Simple Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#357445] scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`الانتقال إلى الشهادة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;