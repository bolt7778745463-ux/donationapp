import React from 'react';
import { Target, Eye } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="/src/resources/images/aboutsec-1.png"
                alt="متطوعون يجمعون التبرعات"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-[#357445]/20 rounded-lg"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  من نحن؟
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  زوائد الخير منصة سعودية تهدف إلى جمع وتوزيع تبرعات الملابس والأدوات المنزلية 
                  لمساعدة المحتاجين في جميع أنحاء المملكة. نؤمن بأن كل قطعة ملابس يمكن أن تصنع الفرق 
                  في حياة شخص آخر.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  منذ تأسيسنا، ساعدنا آلاف في الحصول على احتياجاتهم الأساسية 
                  من خلال تبرعات أفراد المجتمع الكرام.
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-gradient-to-r from-[#357445]/10 to-[#1FA84E]/10 rounded-lg dark:from-[#357445]/20 dark:to-[#1FA84E]/20">
                  <Target className="w-8 h-8 text-[#357445] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">رسالتنا</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      توفير منصة سهلة وآمنة لجمع وتوزيع التبرعات، مع ضمان وصولها 
                      لمن يستحقها في المجتمع السعودي.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gradient-to-r from-[#BFAA2A]/10 to-[#357445]/10 rounded-lg dark:from-[#BFAA2A]/20 dark:to-[#357445]/20">
                  <Eye className="w-8 h-8 text-[#BFAA2A] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">رؤيتنا</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      أن نكون الخيار الأول في المملكة لجمع وتوزيع التبرعات، 
                      ونساهم في بناء مجتمع متكافل ومترابط.
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;