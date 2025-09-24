import React from 'react';
import { FileText, Truck, Package, Gift } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'تقديم الطلب',
      description: 'أكمل نموذج التبرع بمعلوماتك ونوع التبرعات',
      icon: FileText,
      image: '/src/resources/images/seq-1.png',
      color: 'from-[#357445] to-[#1FA84E]',
    },
    {
      id: 2,
      title: 'استلام الملابس',
      description: 'فريقنا سيتواصل معك لتحديد موعد الاستلام',
      icon: Truck,
      image: '/src/resources/images/seq-2.png',
      color: 'from-[#1FA84E] to-[#BFAA2A]',
    },
    {
      id: 3,
      title: 'الفرز والتصنيف',
      description: 'نقوم بفرز وتصنيف التبرعات حسب النوع والحالة',
      icon: Package,
      image: '/src/resources/images/seq-3.png',
      color: 'from-[#BFAA2A] to-[#357445]',
    },
    {
      id: 4,
      title: 'التوزيع أو إعادة التدوير',
      description: 'توزيع التبرعات على المستحقين أو إعادة تدويرها',
      icon: Gift,
      image: '/src/resources/images/seq-4.png',
      color: 'from-[#357445] to-[#1FA84E]',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#357445]/5 via-white to-[#1FA84E]/5 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            طريقة العمل
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            اكتشف كيف نعمل على جمع وتوزيع تبرعاتك بطريقة مدروسة وفعالة
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#357445] via-[#BFAA2A] to-[#1FA84E] transform -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="group">
                <div className="relative">
                  {/* Step Card */}
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-20`}></div>

                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#357445] to-[#1FA84E] bg-clip-text text-transparent">
                          {step.id}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color} shadow-lg`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#BFAA2A]/10 to-transparent rounded-full blur-xl"></div>
                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-[#357445]/10 to-transparent rounded-full blur-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default HowItWorks;