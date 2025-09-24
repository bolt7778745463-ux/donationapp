import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Shield,
  Clock,
  MapPin
} from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'ما هي أنواع التبرعات التي نقبلها؟',
      answer:
        'نقبل الملابس بجميع أنواعها (رجالية، نسائية، أطفال)، الأحذية، الألعاب، البطانيات، مفارش السرير، الحقائب، وأي أدوات منزلية أخرى في حالة جيدة يمكن الاستفادة منها.',
      icon: Shield,
      category: 'التبرعات'
    },
    {
      question: 'كم يستغرق استلام التبرعات؟',
      answer:
        'عادة ما نتواصل معك خلال 24-48 ساعة من تقديم الطلب لتحديد موعد الاستلام. نحاول أن نكون مرنين في المواعيد لتناسب جدولك.',
      icon: Clock,
      category: 'الخدمة'
    },
    {
      question: 'هل توجد رسوم على خدمة الاستلام؟',
      answer:
        'لا، خدمة استلام التبرعات مجانية تماماً. نحن نغطي جميع تكاليف النقل والاستلام من منزلك أو مكان عملك.',
      icon: Shield,
      category: 'التكاليف'
    },
    {
      question: 'في أي المناطق تقدمون خدماتكم؟',
      answer:
        'نقدم خدماتنا حالياً في مدينة الرياض فقط، مع تغطية شاملة لجميع أحيائها ومناطقها، ونعمل على التوسع قريباً لتغطية جميع مناطق المملكة العربية السعودية.',
      icon: MapPin,
      category: 'التغطية'
    },
    {
      question: 'ما هي شروط قبول التبرعات؟',
      answer:
        'نشترط أن تكون التبرعات نظيفة وفي حالة جيدة يمكن استخدامها. نعتذر عن قبول الأغراض التالفة أو المتسخة بشدة أو التي تحتاج إصلاحات كبيرة.',
      icon: Shield,
      category: 'الشروط'
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50
                 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-[#357445] to-[#1FA84E] rounded-2xl shadow-lg">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
              الأسئلة الشائعة
            </h2>
          </div>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا وطريقة عملنا
          </p>
        </div>

        {/* FAQ Items Container (centered and limited width) */}
        <div className="mx-auto max-w-2xl px-4 space-y-6">
          {faqs.map((faq, index) => (
            <div
              id={`faq-${index}`}
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden
                         transition-all duration-300 hover:shadow-2xl
                         border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-right flex items-center justify-between
                           hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent
                           dark:hover:from-gray-800 dark:hover:to-transparent
                           transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#357445] to-[#1FA84E] rounded-xl shadow-lg">
                    <faq.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#BFAA2A] text-white text-xs font-bold rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-6 h-6 text-[#357445] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#357445] flex-shrink-0" />
                  )}
                </div>
              </button>

              {openItems.includes(index) && (
                <div className="px-8 pb-6">
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-right">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
