import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, List, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CatalogFilters from '@/components/CatalogFilters';
import SidebarCatalogNavigation from '@/components/SidebarCatalogNavigation';
import Breadcrumb from '@/components/Breadcrumb';
import { useFilters } from '@/contexts/FiltersContext';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  isNew?: boolean;
  isHit?: boolean;
  discount?: number;
}

const Catalog = () => {
  const { category } = useParams();
  const { showFilters, setShowFilters } = useFilters();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  // Product images
  const productImages = [
    'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24833/24833.970.webp',
    'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24834/24834.970.webp',
    'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24835/24835.970.webp'
  ];

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Чемодан SAMSONITE S\'Cure Spinner 55cm',
      price: 8900,
      originalPrice: 9800,
  // images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'SAMSONITE',
      isHit: true,
      discount: 9
    },
    {
      id: '2',
      name: 'Дорожня сумка DELSEY Montrouge 55cm',
      price: 3450,
  // images: productImages,
      image: productImages[0],
      category: 'Дорожні сумки',
      brand: 'DELSEY',
      isNew: true
    },
    {
      id: '3',
      name: 'Чемодан VIP Collection Manhattan 65cm',
      price: 5200,
      originalPrice: 6100,
  // images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'VIP',
      discount: 15
    },
    {
      id: '4',
      name: 'Рюкзак дорожній WINGS TB1007 40L',
      price: 2890,
  // images: productImages,
      image: productImages[0],
      category: 'Рюкзаки',
      brand: 'WINGS'
    },
    {
      id: '5',
      name: 'Чемодан MADISON PP 75cm Great',
      price: 4750,
  // images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'MADISON',
      isNew: true
    },
    {
      id: '6',
      name: 'Косметичка SAMSONITE Karissa Cosmetic',
      price: 1650,
      originalPrice: 1900,
  // images: productImages,
      image: productImages[0],
      category: 'Косметички',
      brand: 'SAMSONITE',
      discount: 13
    },
    {
      id: '7',
      name: 'Чемодан DELSEY Chatelet Air 67cm',
      price: 12500,
  // images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'DELSEY',
      isHit: true
    },
    {
      id: '8',
      name: 'Дорожня сумка VIP Travel Bag Pro',
      price: 2980,
      originalPrice: 3400,
  // images: productImages,
      image: productImages[0],
      category: 'Дорожні сумки',
      brand: 'VIP',
      discount: 12
    }
  ];

  const getCategoryName = (categorySlug?: string) => {
    const categoryMap: Record<string, string> = {
      'sumky': 'Сумки',
      'sumky-cholovichi': 'Чоловічі сумки',
      'sumky-zhinochi': 'Жіночі сумки',
      'akcii': 'Промоакції',
      'ryukzaky': 'Рюкзаки',
      'koshelky': 'Кошельки',
      'portmone': 'Портмоне',
      'portfeli': 'Портфелі',
      'papky': 'Папки',
      'dorozhni-sumky': 'Дорожні сумки',
      'chemodany': 'Чемодани',
      'barsetky': 'Барсетки',
      'remeni': 'Ремені',
      'kosmetychky': 'Косметички',
      'obkladynky-dokumentiv': 'Обкладинки для документів',
      'vizytnyci': 'Візитниці',
      'klyuchnyci': 'Ключниці',
      'aksesuary': 'Аксесуари'
    };
    return categoryMap[categorySlug || ''] || 'Каталог товарів';
  };

  const breadcrumbItems = [
    { label: 'Головна', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    ...(category ? [{ label: getCategoryName(category) }] : [])
  ];

  useEffect(() => {
    // Initialize with first page of products
    setProducts(mockProducts.slice(0, 4));
    setPage(1);
  }, [category]);

  const loadMoreProducts = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const nextProducts = mockProducts.slice(page * 4, (page + 1) * 4);
      if (nextProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...nextProducts]);
        setPage(prev => prev + 1);
      }
      setLoading(false);
    }, 1000);
  };

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Here you would typically update the products based on filters
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">
              {products.length} {hasMore ? '+' : ''} товарів
            </p>
          </div>

          {/* View controls removed */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden border-gray-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              Фільтри
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="border-r border-gray-100 pr-6 pb-6 sticky top-6">
              <SidebarCatalogNavigation />
              <h2 className="text-lg font-semibold mb-4">Фільтри</h2>
              <CatalogFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          {/* Mobile Filters */}
          <CatalogFilters
            isMobile={true}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onFiltersChange={handleFiltersChange}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className={cn(
              "gap-x-6 gap-y-10",
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid grid-cols-1"
            )}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 text-center">
              {hasMore ? (
                <Button
                  onClick={loadMoreProducts}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                  className="px-8 border-gray-200 hover:bg-gray-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Завантаження...
                    </>
                  ) : (
                    'Завантажити ще'
                  )}
                </Button>
              ) : products.length > 0 ? (
                <p className="text-gray-400 text-sm">
                  Всі товари завантажені
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Catalog;
