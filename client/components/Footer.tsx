import React, { useEffect, useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const [language, setLanguage] = useState<string>('uk');

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'uk';
    setLanguage(saved);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLanguage(value);
    localStorage.setItem('language', value);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Evenly filled layout using original first-column content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">SKLADONLINE</h3>
            <p className="text-sm">
              Інтернет-магазин шкіряних виробів. Великий вибір сумок, кошельків, ремінів та аксесуарів.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-white mb-4">Контакти</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>+380 (44) 123-45-67</span></div>
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>+380 (67) 123-45-67</span></div>
              <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>info@skladonline.com.ua</span></div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-white mb-4">Інформація</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2"><Clock className="w-4 h-4" /><span>Пн-Пт: 9:00-18:00</span></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-sm text-center">© 2025 SKLADONLINE. Всі права захищені.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
