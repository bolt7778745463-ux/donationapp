import React, { useState, useEffect, useRef } from 'react';
import { User, Phone, MapPin, Package, Check, Shield } from 'lucide-react';
import { useButtonVisibility } from '../context/ButtonVisibilityContext';
import axios from 'axios';

interface FormData {
  name: string;
  phone: string;
  neighborhood: string;
  items: string[];
}

const DonationForm: React.FC = () => {
  const { setIsVisible } = useButtonVisibility();
  const formRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    neighborhood: '',
    items: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // md breakpoint

    if (!isMobile) {
      return; // Don't set up observer on desktop
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, [setIsVisible]);

  const donationItems = [
    { id: 'shoes', label: 'أحذية', icon: '👟' },
    { id: 'clothes', label: 'ملابس', icon: '👔' },
    { id: 'furniture', label: 'أثاث', icon: '🪑' },
    { id: 'electronics', label: 'إلكترونيات', icon: '📱' },
    { id: 'other', label: 'أخرى', icon: '📦' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب';
    } else if (!/^5\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الجوال يجب أن يبدأ بـ 5 ويتكون من 9 أرقام';
    }
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'الحي مطلوب';
    }
    if (formData.items.length === 0) {
      newErrors.items = 'يرجى اختيار نوع التبرع';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Map item IDs to Arabic labels
        const selectedLabels = formData.items.map(itemId => {
          const item = donationItems.find(i => i.id === itemId);
          return item ? item.label : itemId;
        });
        await axios.post('http://localhost:5000/api/donations', {
          full_name: formData.name,
          phone: formData.phone,
          region: 'الرياض',
          district: formData.neighborhood,
          category: selectedLabels.join(', ')
        });
        setIsVisible(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsVisible(true);
          setFormData({
            name: '',
            phone: '',
            neighborhood: '',
            items: [],
          });
        }, 3000);
      } catch (error) {
        console.error('Error submitting donation:', error);
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.includes(itemId)
        ? prev.items.filter(id => id !== itemId)
        : [...prev.items, itemId]
    }));
    if (errors.items) {
      setErrors(prev => ({ ...prev, items: '' }));
    }
  };

  if (showSuccess) {
    setIsVisible(false);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            تم استلام طلبك بنجاح
          </h3>
          <p className="text-gray-600 dark:text-gray-300 font-bold">
            شكراً لك على مساهمتك الكريمة. سنتواصل معك قريباً
          </p>
        </div>
      </div>
    );
  }

  return (
    <section id="donation-form" ref={formRef} className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              طلب تبرع جديد
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-bold">
              أدخل بياناتك لإنشاء طلب تبرع
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  رقم الجوال *
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="5xxxxxxxx"
                    maxLength={9}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1 font-bold">{errors.phone}</p>}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  المنطقة
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value="الرياض"
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled
                  >
                    <option value="الرياض">الرياض</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-bold">
                  نعمل حالياً في منطقة الرياض فقط
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  الحي *
                </label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => updateField('neighborhood', e.target.value)}
                  className={`w-full pl-3 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.neighborhood ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="أدخل اسم الحي"
                />
                {errors.neighborhood && <p className="text-red-500 text-sm mt-1 font-bold">{errors.neighborhood}</p>}
              </div>
            </div>

            {/* Donation Items */}
            <div className="space-y-4">

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {donationItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`p-2 border-2 rounded-lg transition-all flex items-center gap-3 ${
                      formData.items.includes(item.id)
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-300 hover:border-green-400 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <div className="text-sm font-medium">{item.label}</div>
                  </button>
                ))}
              </div>
              {errors.items && <p className="text-red-500 text-sm font-bold">{errors.items}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-[#BFAA2A] to-[#1FA84E] hover:from-[#1FA84E] hover:to-[#357445] text-white font-bold py-4 px-8 rounded-xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                إرسال طلب التبرع
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
