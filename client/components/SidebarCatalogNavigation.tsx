import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  slug: string;
  href: string;
}

const categories: Category[] = [
  { name: 'Всі товари', slug: '', href: '/catalog' },
  { name: 'Промоакції', slug: 'akcii', href: '/catalog/akcii' },
  { name: 'Сумки', slug: 'sumky', href: '/catalog/sumky' },
  { name: 'Чоловічі сумки', slug: 'sumky-cholovichi', href: '/catalog/sumky-cholovichi' },
  { name: 'Жіночі сумки', slug: 'sumky-zhinochi', href: '/catalog/sumky-zhinochi' },
  { name: 'Рюкзаки', slug: 'ryukzaky', href: '/catalog/ryukzaky' },
  { name: 'Гаманці', slug: 'gamanci', href: '/catalog/gamanci' },
  { name: 'Портмоне', slug: 'portmone', href: '/catalog/portmone' },
  { name: 'Портфелі', slug: 'portfeli', href: '/catalog/portfeli' },
  { name: 'Папки', slug: 'papky', href: '/catalog/papky' },
  { name: 'Дорожні сумки', slug: 'dorozhni-sumky', href: '/catalog/dorozhni-sumky' },
  { name: 'Валізи', slug: 'valizy', href: '/catalog/valizy' },
  { name: 'Барсетки', slug: 'barsetky', href: '/catalog/barsetky' },
  { name: 'Ремені', slug: 'remeni', href: '/catalog/remeni' },
  { name: 'Косметички', slug: 'kosmetychky', href: '/catalog/kosmetychky' },
  { name: 'Обкладинки для документів', slug: 'obkladynky-dokumentiv', href: '/catalog/obkladynky-dokumentiv' },
  { name: 'Візитниці', slug: 'vizytnyci', href: '/catalog/vizytnyci' },
  { name: 'Ключниці', slug: 'klyuchnyci', href: '/catalog/klyuchnyci' },
  { name: 'Аксесуари', slug: 'aksesuary', href: '/catalog/aksesuary' }
];

const SidebarCatalogNavigation: React.FC = () => {
  const location = useLocation();
  const currentCategory = location.pathname.split('/catalog/')[1] || '';
  // Мобильный аккордеон
  const [isOpen, setIsOpen] = useState(false);
  // Определяем мобильную версию через ширину экрана
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="mb-8">
      <button
        type="button"
        className="flex items-center justify-between w-full py-2 text-left md:cursor-default"
        onClick={() => isMobile && setIsOpen((prev) => !prev)}
      >
        <h2 className="text-lg font-medium text-gray-900 mb-0">Категорії</h2>
        {isMobile && (
          <ChevronDown className={cn("w-5 h-5 ml-2 transition-transform", isOpen ? "rotate-180" : "")}/>
        )}
      </button>
      {/* Категории: всегда открыты на десктопе, аккордеон на мобиле */}
      {(isOpen || !isMobile) && (
        <nav className={cn(
          "space-y-1",
          isMobile && "max-h-[calc(100vh-var(--header-height))] overflow-y-auto"
        )}>
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={category.href}
              className={cn(
                "block px-3 py-2 text-sm transition-colors rounded-md",
                currentCategory === category.slug
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default SidebarCatalogNavigation;
