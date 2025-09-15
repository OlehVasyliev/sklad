import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw, Scale, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

interface ProductDetails {
  id: string;
  name: string;
  articleCode: string;
  price: number;
  originalPrice?: number;
  brand: string;
  category: string;
  description: string;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  isNew?: boolean;
  isHit?: boolean;
  discount?: number;
  inStock: boolean;
  // rating: number;
  // reviewsCount: number;
}

const Product = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { toggle: toggleFav, has: hasFav } = useFavorites();
  const { toggle: toggleComp, has: hasComp } = useComparison();
  const [quantity, setQuantity] = useState(1);

  // Show unregistered user experience
  const forceAuthenticated = false;
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProduct: ProductDetails = {
    id: '1',
    name: 'Чемодан SAMSONITE S\'Cure Spinner 55cm',
    articleCode: 'SM8113',
    price: 8900,
    originalPrice: 9800,
    brand: 'SAMSONITE',
    category: 'Чемодани',
    description: 'Легкий та міцний чемодан з полікарбонату з системою 4 коліс для максимального комфорту під час подорожі. Оснащений TSA замком для безпеки ваших речей.',
    images: [
      'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24833/24833.970.webp',
      'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24834/24834.970.webp',
      'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24835/24835.970.webp'
    ],
    specifications: {
      'Бренд': 'SAMSONITE',
      'Колір': 'Чорний',
      'Матеріал': 'Полікарбонат',
      'Країна виробник': 'Бельгія',
      'Вид застібки': 'TSA замок',
      'Розміри': '55 x 40 x 20 см',
      'Вага': '2.6 кг',
      'Об\'єм': '34 л',
      'Тип': 'Ручна поклажа',
      'Гарантія': '2 роки'
    },
    features: [
      'Міцний корпус з полікарбонату',
      'Система 4 коліс для легкого пересування',
      'TSA замок для безпеки',
      'Телескопічна ручка з алюмінію',
      'Внутрішні відділення з сіткою',
      'Розширювальна конструкція (+25%)'
    ],
    isHit: true,
    discount: 9,
    inStock: true,
  // rating: 4.8,
  // reviewsCount: 127
  };

  // Product images
  const productImages = [
    'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24833/24833.970.webp',
    'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24834/24834.970.webp',
    'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24835/24835.970.webp'
  ];

  const mockSimilarProducts = [
    {
      id: '2',
      name: 'Чемодан DELSEY Chatelet Air 67cm',
      price: 12500,
      images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'DELSEY',
      isHit: true
    },
    {
      id: '3',
      name: 'Чемодан VIP Collection Manhattan 65cm',
      price: 5200,
      originalPrice: 6100,
      images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'VIP',
      discount: 15
    },
    {
      id: '4',
      name: 'Чемодан MADISON PP 75cm Great',
      price: 4750,
      images: productImages,
      image: productImages[0],
      category: 'Чемодани',
      brand: 'MADISON',
      isNew: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
      setSimilarProducts(mockSimilarProducts);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        brand: product.brand
      });
    }
    import('@/lib/cart-anim').then((m) => m.bumpCart()).catch(() => {});
  };

  const breadcrumbItems = [
    { label: 'Головна', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: 'Чемодани', href: '/catalog/chemodany' }
  ];

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Завантаження товару...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Link
                  to={`/catalog?brand=${encodeURIComponent(product.brand)}`}
                  className="text-sm text-primary hover:underline font-medium cursor-pointer"
                >
                  {product.brand}
                </Link>
                {product.isHit && <Badge variant="destructive">ХІТ</Badge>}
                {product.isNew && <Badge className="bg-green-500">НОВИНКА</Badge>}
                {product.discount && <Badge variant="secondary">-{product.discount}%</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">Код артикула: {product.articleCode}</p>
              
              {/* Rating and reviews removed */}
            </div>

            {/* Price */}
            <div className="space-y-2">
              {(isAuthenticated || forceAuthenticated) ? (
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-primary">
                    {product.price.toLocaleString()} грн
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString()} грн
                    </span>
                  )}
                  {/* Экономия убрана по требованию */}
                </div>
              ) : (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-medium text-blue-900 mb-2">
                    Увійдіть, щоб переглянути ціни
                  </p>
                  <Link to="/login">
                    <Button>Увійти в кабінет</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'В наявності' : 'Немає в наявності'}
              </span>
            </div>

            {/* Action Buttons */}
            {(isAuthenticated || forceAuthenticated) && product.inStock && (
              <div className="space-y-4">
                {/* Quick Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant={product && hasFav(product.id) ? "default" : "outline"}
                    size="lg"
                    className="flex-1"
                    onClick={() => {
                      if (!product) return;
                      toggleFav({ id: product.id, name: product.name, price: product.price, image: product.images[0], brand: product.brand });
                      import('@/lib/cart-anim').then((m) => m.bumpFavorites()).catch(() => {});
                    }}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${product && hasFav(product.id) ? 'fill-current' : ''}`} />
                    {product && hasFav(product.id) ? 'В обраному' : 'До обраного'}
                  </Button>
                  <Button
                    variant={product && hasComp(product.id) ? "default" : "outline"}
                    size="lg"
                    className="flex-1"
                    onClick={() => {
                      if (!product) return;
                      toggleComp({ id: product.id, name: product.name, price: product.price, image: product.images[0], brand: product.brand, category: product.category, specifications: product.specifications, features: product.features });
                      import('@/lib/cart-anim').then((m) => m.bumpCompare()).catch(() => {});
                    }}
                  >
                    <Scale className={`w-5 h-5 mr-2 ${product && hasComp(product.id) ? 'fill-current' : ''}`} />
                    {product && hasComp(product.id) ? 'В порівнянні' : 'До порівняння'}
                  </Button>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Кількість:</label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Додати в кошик
                  </Button>
                </div>
              </div>
            )}

            {/* Registration CTA for unregistered users */}
            {!(isAuthenticated || forceAuthenticated) && (
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  Зареєструйтесь для оптових покупок
                </h3>
                <p className="text-gray-600 mb-4">
                  Отримайте доступ до спеціальних цін, можливості додавання в кошик,
                  збереження в обране та порівняння товарів
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/login">
                    <Button size="lg" className="px-8">
                      Увійти в кабінет
                    </Button>
                  </Link>
                  <a href="tel:+380973072887">
                    <Button variant="outline" size="lg" className="px-8">
                      <Phone className="w-5 h-5 mr-2" />
                      Зателефонувати
                    </Button>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg p-6 mb-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Опис</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                
                <div>
                  <h3 className="font-semibold mb-3">Особливості:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Reviews tab removed */}
          </Tabs>
        </div>

        {/* Similar Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Схожі товари</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
