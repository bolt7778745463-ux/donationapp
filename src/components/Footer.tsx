import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Clock, Award, Users, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gradient-to-br from-[#357445] via-[#2a5a37] to-[#1FA84E] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
             <div className="mb-6">
              <img
                src="/src/resources/images/logo1.png"
                alt="زوائد الخير"
                className="h-16 rounded-xl overflow-hidden object-cover"
              />
            </div>
              <p className="text-gray-100 leading-relaxed mb-8 text-lg">
                منصة سعودية رائدة في جمع وتوزيع التبرعات لخدمة المجتمع
                وتحقيق التكافل الاجتماعي في الرياض.
              </p>

              {/* Social Media */}
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/zawayidksa/"
                  className="p-3 bg-white/10 hover:bg-[#BFAA2A] rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="فيسبوك"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/zawayidksa?lang=ar"
                  className="p-3 bg-white/10 hover:bg-[#BFAA2A] rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="تويتر"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/zawayidksa1/?hl=ar"
                  className="p-3 bg-white/10 hover:bg-[#BFAA2A] rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  aria-label="إنستغرام"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#BFAA2A]" />
                روابط سريعة
              </h4>
              <ul className="space-y-4">
                {[
                  { label: 'الرئيسية', id: 'home' },
                  { label: 'من نحن', id: 'about' },
                  { label: 'طريقة العمل', id: 'how-it-works' },
                  { label: 'شركاؤنا', id: 'partners' },
                  { label: 'الأسئلة الشائعة', id: 'faq' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.id);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-100 hover:text-[#BFAA2A] transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-2 h-2 bg-[#BFAA2A] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-[#BFAA2A]" />
                معلومات التواصل
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                   <MessageCircle className="w-5 h-5 text-[#BFAA2A] flex-shrink-0 mt-0.5" />
                  <a
                    href="https://wa.me/+966505368436"
                    className="text-gray-100 hover:text-[#BFAA2A] transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <span dir="ltr">+966 50 53 68436</span>

                  </a>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-[#BFAA2A] flex-shrink-0" />
                  <span dir='ltr' className="text-gray-100">+966 50 53 55436</span>
                </div>
                <div className="flex items-start gap-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-[#BFAA2A] flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@zawaid-alkhayr.org"
                    className="text-gray-100 hover:text-[#BFAA2A] transition-colors duration-300"
                  >
                    info@zawayidksa.org
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#BFAA2A]" />
                موقعنا
              </h4>
              <div className="embed-map-fixed">
                <div className="embed-map-container">
                  <iframe
                    className="embed-map-frame"
                    frameBorder={0}
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://maps.google.com/maps?width=400&height=400&hl=en&q=riyadh&t=p&z=9&ie=UTF8&iwloc=B&output=embed"
                    style={{ width: '100%', height: '200px' }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-200 text-center md:text-right">
                © {currentYear} زوائد الخير. جميع الحقوق محفوظة.
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
