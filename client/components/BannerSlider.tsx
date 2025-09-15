import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  desktopImage: string;
  mobileImage: string;
  backgroundColor: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: 'Чоловічі сумки',
    subtitle: 'Преміум колекція 2025',
    description: 'Стильні та функціональні сумки для сучасних чоловіків від провідних світових брендів',
    buttonText: 'Переглянути колекцію',
    buttonLink: '/catalog/sumky-cholovichi',
    desktopImage: 'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/25/00/25/25.1400x0.webp',
    mobileImage: 'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/25/00/25/25.1400x0.webp',
    backgroundColor: 'from-blue-900 to-blue-700'
  },
  {
    id: 2,
    title: 'Жіночі сумки',
    subtitle: 'Елегантність та стиль',
    description: 'Витончені сумки для жінок, які цінують якість та неперевершений дизайн',
    buttonText: 'Дивитися каталог',
    buttonLink: '/catalog/sumky-zhinochi',
    desktopImage: 'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/23/00/23/23.1400x0.webp',
    mobileImage: 'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/23/00/23/23.1400x0.webp',
    backgroundColor: 'from-pink-900 to-pink-700'
  },
  {
    id: 3,
    title: 'Спецпропозиція',
    subtitle: 'Знижки до 30%',
    description: 'Не пропустіть можливість придбати якісні шкіряні вироби за вигідними цінами',
    buttonText: 'Акційні товари',
    buttonLink: '/catalog/akcii',
    desktopImage: '/placeholder.svg',
    mobileImage: '/placeholder.svg',
    backgroundColor: 'from-green-900 to-green-700'
  }
];

const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="relative h-[645px] md:h-[720px] overflow-hidden">
      <div 
        className={`relative h-full bg-gradient-to-r ${currentBanner.backgroundColor} transition-all duration-1000`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={currentBanner.desktopImage} />
            <img 
              src={currentBanner.mobileImage}
              alt={currentBanner.title}
              className="w-full h-full object-cover"
              sizes="(min-width: 768px) 1440px, 430px"
            />
          </picture>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* No text or buttons on top of banner */}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
