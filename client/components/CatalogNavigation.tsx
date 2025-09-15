import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  slug: string;
  href: string;
}

const categories: Category[] = [
  { name: 'Всі товари', slug: '', href: '/catalog' },
  { name: 'Сумки', slug: 'sumky', href: '/catalog/sumky' },
  { name: 'Рюкзаки', slug: 'ryukzaky', href: '/catalog/ryukzaky' },
  { name: 'Кошельки', slug: 'koshelky', href: '/catalog/koshelky' },
  { name: 'Портмоне', slug: 'portmone', href: '/catalog/portmone' },
  { name: 'Портфелі', slug: 'portfeli', href: '/catalog/portfeli' },
  { name: 'Папки', slug: 'papky', href: '/catalog/papky' },
  { name: 'Дорожні сумки', slug: 'dorozhni-sumky', href: '/catalog/dorozhni-sumky' },
  { name: 'Чемодани', slug: 'chemodany', href: '/catalog/chemodany' },
  { name: 'Барсетки', slug: 'barsetky', href: '/catalog/barsetky' },
  { name: 'Ремені', slug: 'remeni', href: '/catalog/remeni' },
  { name: 'Косметички', slug: 'kosmetychky', href: '/catalog/kosmetychky' },
  { name: 'Обкладинки для документів', slug: 'obkladynky-dokumentiv', href: '/catalog/obkladynky-dokumentiv' },
  { name: 'Візитниці', slug: 'vizytnyci', href: '/catalog/vizytnyci' },
  { name: 'Ключниці', slug: 'klyuchnyci', href: '/catalog/klyuchnyci' },
  { name: 'Аксесуари', slug: 'aksesuary', href: '/catalog/aksesuary' }
];

const CatalogNavigation: React.FC = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const currentCategory = location.pathname.split('/catalog/')[1] || '';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    setScrollLeft(scrollLeft);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 1);
  };

  return (
    <div className={cn(
      "bg-white border-b border-gray-200 transition-all duration-200 z-40",
      isSticky ? "fixed top-0 left-0 right-0 shadow-md" : "relative"
    )}>
      <div className="container mx-auto px-4">
        <div className="relative flex items-center">
          {/* Left scroll button */}
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm"
              onClick={() => scrollContainer('left')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Categories scroll container */}
          <div
            id="category-scroll"
            className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-3 px-8"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={category.href}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  currentCategory === category.slug
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right scroll button */}
          {canScrollRight && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm"
              onClick={() => scrollContainer('right')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Spacer when sticky */}
      {isSticky && <div className="h-16" />}
    </div>
  );
};

export default CatalogNavigation;
