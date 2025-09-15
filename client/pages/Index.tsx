import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Users, Award, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';

// Promotional products data
const productImages = [
  'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24833/24833.970.webp',
  'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24834/24834.970.webp',
  'https://skladonline.com.ua/wa-data/public/shop/products/01/webp/13/81/8113/images/24835/24835.970.webp'
];

const promotionalProducts = [
  {
    id: 'promo1',
    name: 'Чоловіча сумка LUXON Business Elite',
    price: 3450,
    originalPrice: 4200,
    images: productImages,
    image: productImages[0],
    category: 'Чоловічі сумки',
    brand: 'LUXON',
    isHit: true,
    discount: 18
  },
  {
    id: 'promo2',
    name: 'Жіноча сумка DAVID JONES Elegance',
    price: 2890,
    originalPrice: 3600,
    images: productImages,
    image: productImages[0],
    category: 'Жіночі сумки',
    brand: 'DAVID JONES',
    discount: 20
  },
  {
    id: 'promo3',
    name: 'Портфель TIGER NU Executive',
    price: 5200,
    originalPrice: 6500,
    images: productImages,
    image: productImages[0],
    category: 'Портфелі',
    brand: 'TIGER NU',
    discount: 20
  },
  {
    id: 'promo4',
    name: 'Рюкзак NOBO Urban Style',
    price: 1950,
    originalPrice: 2400,
    images: productImages,
    image: productImages[0],
    category: 'Рюкзаки',
    brand: 'NOBO',
    discount: 19,
    isNew: true
  },
  {
    id: 'promo5',
    name: 'Гаманець FABIANO Premium',
    price: 1200,
    originalPrice: 1600,
    images: productImages,
    image: productImages[0],
    category: 'Гаманці',
    brand: 'FABIANO',
    discount: 25
  },
  {
    id: 'promo6',
    name: 'Косметичка LUXON Travel Glam',
    price: 890,
    originalPrice: 1200,
    images: productImages,
    image: productImages[0],
    category: 'Косметички',
    brand: 'LUXON',
    discount: 26
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Slider */}
      <BannerSlider />

      {/* Company Info Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Оптовий склад ділової шкіряної галантереї
            </h2>
            <p className="text-gray-600">
              Офіційний дистриб'ютор торгових марок: <span className="font-medium">Luxon, Tiger NU, David Jones, Nobo, Fabiano</span> в Україні
            </p>
          </div>
        </div>
      </section>

      {/* Promotional Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Промоакції</h2>
              <p className="text-gray-600">Спеціальні пропозиції та знижки на популярні товари</p>
            </div>
            <Link to="/catalog/akcii">
              <Button variant="outline">
                Всі акції
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
            {promotionalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Для перегляду цін та оформлення замовлень необхідна реєстрація
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Зареєструйтесь як оптовий клієнт та отримайте доступ до спеціальних цін та умов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="px-8">
                  Реєстрація / Вхід
                </Button>
              </Link>
              <a href="tel:+380973072887">
                <Button size="lg" variant="secondary" className="px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Зателефонувати
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Переваги співпраці з нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Лояльні умови</h3>
              <p className="text-gray-600">Індивідуальний підхід до кожного оптового клієнта з гнучкими умовами співпраці</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Оптимальні ціни</h3>
              <p className="text-gray-600">Конкурентні оптові ціни безпосередньо від офіційного дистриб'ютора</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Якісне обслуговування</h3>
              <p className="text-gray-600">Професійна підтримка та консультації на всіх етапах співпраці</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Швидка доставка</h3>
              <p className="text-gray-600">Оперативна доставка замовлень по всій території України</p>
            </div>
          </div>
        </div>
      </section>


      {/* About Company Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Про SKLADONLINE</h2>
            <div className="text-lg text-gray-600 space-y-4 leading-relaxed">
              <p>
                <strong>SKLADONLINE</strong> - провідна оптова торгова площадка шкіряних виробів в Україні. 
                Ми спеціалізуємося на якісних товарах з натуральної та екошкіри від провідних світових виробників.
              </p>
              <p>
                Як офіційний дистриб'ютор торгових марок <strong>Luxon, Tiger NU, David Jones, Nobo</strong> та 
                <strong> Fabiano</strong>, ми гарантуємо автентичність та високу якість кожного виробу в нашому асортименті.
              </p>
              <p>
                Наша мета - забезпечити партнерів найкращими товарами за оптимальними цінами з неперевершеним 
                рівнем обслуговування та швидкою доставкою по всій Україні.
              </p>
            </div>
            
            <div className="mt-8">
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Детальніше про компанію
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Готові до співпраці?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Зв'яжіться з нами для отримання консультації та обговорення умов партнерства
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">(097) 307-28-87</p>
                  <p className="font-semibold">(066) 055-99-61</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">i@skladonline.com.ua</p>
                  <p className="text-sm text-gray-400">Пн-Пт: 09:00-18:00</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts">
                <Button variant="secondary" size="lg">
                  Контактна інформація
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Зареєструватися
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
