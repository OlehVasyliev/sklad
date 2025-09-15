import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Clock, Filter } from 'lucide-react';
import Icon from './Icon';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useFilters } from '../contexts/FiltersContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  
  // Safely use filters context - it might not be available on all pages
  let toggleFilters: (() => void) | undefined;
  try {
    const filtersContext = useFilters();
    toggleFilters = filtersContext.toggleFilters;
  } catch (error) {
    // FiltersProvider not available on this page
    toggleFilters = undefined;
  }
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const location = useLocation();

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

  const categories = [
    { name: 'Всі товари', href: '/catalog' },
    { name: 'Промоакції', href: '/catalog/akcii' },
    { name: 'Чоловічі сумки', href: '/catalog/sumky-cholovichi' },
    { name: 'Жіночі сумки', href: '/catalog/sumky-zhinochi' },
    { name: 'Сумки', href: '/catalog/sumky' },
    { name: 'Рюкзаки', href: '/catalog/ryukzaky' },
    { name: 'Кошельки', href: '/catalog/koshelky' },
    { name: 'Портмоне', href: '/catalog/portmone' },
    { name: 'Портфелі', href: '/catalog/portfeli' },
    { name: 'Папки', href: '/catalog/papky' },
    { name: 'Дорожні сумки', href: '/catalog/dorozhni-sumky' },
    { name: 'Чемодани', href: '/catalog/chemodany' },
    { name: 'Барсетки', href: '/catalog/barsetky' },
    { name: 'Ремені', href: '/catalog/remeni' },
    { name: 'Косметички', href: '/catalog/kosmetychky' },
    { name: 'Обкладинки для документів', href: '/catalog/obkladynky-dokumentiv' },
    { name: 'Візитниці', href: '/catalog/vizytnyci' },
    { name: 'Ключниці', href: '/catalog/klyuchnyci' },
    { name: 'Аксесуари', href: '/catalog/aksesuary' }
  ];

  const currentCategory = categories.find(cat => cat.href === location.pathname);
  const isOnCategoryPage = currentCategory !== undefined;
  const isOnCatalogPage = location.pathname.startsWith('/catalog');

  return (
    <>
      {/* Main header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="https://skladonline.com.ua//wa-data/public/shop/products/14/webp/data/public/site/themes/dsvpro/img/mylogo.webp?v1622625305?v1.8.1.1754323574"
                alt="SKLADONLINE"
                className="h-5 object-contain"
              />
            </Link>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form action="/search" className="relative w-full">
                <Input
                  name="q"
                  type="text"
                  placeholder="Пошук товарів..."
                  className="w-full pr-10"
                />
                <Button
                  size="sm"
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Icon name="search" className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* User actions */}
            <div className="flex items-center space-x-4">
              <Link to="/comparison"><Button id="compare-icon" variant="ghost" size="sm" className="hidden lg:flex items-center space-x-1">
                <Icon name="compare" className="w-4 h-4" />
                <span className="text-sm">Порівняння</span>
              </Button></Link>
              
              <Link to="/favorites"><Button id="favorites-icon" variant="ghost" size="sm" className="hidden lg:flex items-center space-x-1">
                <Icon name="favorites" className="w-4 h-4" />
                <span className="text-sm">Улюблені</span>
              </Button></Link>
              
              <Link to="/viewed"><Button variant="ghost" size="sm" className="hidden lg:flex items-center space-x-1">
                <Icon name="viewed" className="w-4 h-4" />
                <span className="text-sm">Переглянуті</span>
              </Button></Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <Icon name="user" className="w-4 h-4" />
                    <span className="text-sm hidden lg:block">{user?.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">Мої замовлення</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Вийти</button>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <Icon name="user" className="w-4 h-4" />
                    <span className="text-sm hidden lg:block">Кабінет</span>
                  </Button>
                </Link>
              )}

              <Link to="/cart">
                <Button id="cart-icon" variant="ghost" size="sm" className="flex items-center space-x-1 relative">
                  <Icon name="cart" className="w-4 h-4" />
                  <span className="text-sm hidden lg:block">Кошик</span>
                  {isAuthenticated && totalItems > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 absolute -top-1 right-0 min-w-[20px] flex items-center justify-center -mr-[10px] ml-3">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>


            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-4">
            <form action="/search" className="relative">
              <Input
                name="q"
                type="text"
                placeholder="Пошук товарів..."
                className="w-full pr-10"
              />
              <Button
                size="sm"
                type="submit"
                className="absolute right-1 top-1 h-8 w-8 p-0"
              >
                <Icon name="search" className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="relative flex items-center justify-between">
              {isOnCategoryPage ? (
                <div className="py-3 px-0">
                  <span className="text-primary-foreground font-medium">
                    {currentCategory.name}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                  className="flex items-center space-x-2 py-3 hover:bg-primary/90 px-4 rounded"
                >
                  <Icon name="menu" className="w-4 h-4" />
                  <span>Каталог товарів</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {/* Mobile Filter Button - only on catalog pages */}
              {isOnCatalogPage && toggleFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFilters}
                  className="md:hidden text-primary-foreground hover:bg-primary/90 py-3"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              )}

              {/* Catalog dropdown */}
              {!isOnCategoryPage && isCatalogOpen && (
                <div className="absolute left-0 top-full bg-white text-foreground border shadow-lg rounded-md w-64 z-50">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={category.href}
                      className="block px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsCatalogOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
