import React from 'react';

const Partners: React.FC = () => {
  const partners = [
    { name: 'وزارة العمل والتنمية الاجتماعية', logo: '/src/resources/images/logo-1.png' },
    { name: 'الهلال الأحمر السعودي', logo: '/src/resources/images/logo-2.png' },
    { name: 'بنك الطعام السعودي', logo: '/src/resources/images/logo-3.png' },
 
  ];

  return (
    <section id="partners" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            شركاؤنا في الخير
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            نفتخر بشراكتنا مع أفضل المؤسسات والشركات في المملكة لتحقيق أهدافنا الخيرية
          </p>
        </div>

        {/* Partners Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-[#357445]/30"
            >
              <div className="mb-4 group-hover:scale-150 transition-transform duration-150">
                {typeof partner.logo === 'string' && partner.logo.startsWith('/') ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                ) : (
                  <div className="text-8xl">{partner.logo}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;