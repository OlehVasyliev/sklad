import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Кошик</h1>
            <div className="bg-white rounded-lg p-8">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Увійдіть в особистий кабінет</h2>
              <p className="text-muted-foreground mb-6">
                Для використання кошика необхідно увійти в особистий кабінет
              </p>
              <Link to="/login">
                <Button>Увійти в кабінет</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Кошик</h1>
            <div className="bg-white rounded-lg p-8">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Ваш кошик порожній</h2>
              <p className="text-muted-foreground mb-6">
                Додайте товари з каталогу, щоб продовжити покупки
              </p>
              <Link to="/catalog">
                <Button>Перейти до каталогу</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Кошик ({totalItems})</h1>
            <Button variant="outline" onClick={clearCart}>
              Очистити кошик
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-0 flex h-32">
                  {/* Изображение прижато к левому краю от верха до низа */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-l-lg flex-shrink-0"
                  />

                  {/* Контент справа от изображения */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    {/* Верхняя часть: название товара слева, цена справа */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.brand}</p>
                      </div>

                      {/* Цена прижата к правому верхнему краю */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-medium text-primary text-lg">
                          {item.price.toLocaleString()} грн
                        </p>
                        {item.quantity > 1 && (
                          <p className="font-semibold text-sm text-gray-600">
                            Всього: {(item.price * item.quantity).toLocaleString()} грн
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Нижняя часть: элементы управления и удаление справа внизу */}
                    <div className="flex justify-end items-end">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 h-fit sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Разом</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Товари ({totalItems})</span>
                  <span>{totalPrice.toLocaleString()} грн</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-600">
                    {totalPrice >= 1000 ? 'Безкоштовно' : '150 грн'}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>До сплати</span>
                    <span>
                      {(totalPrice + (totalPrice >= 1000 ? 0 : 150)).toLocaleString()} грн
                    </span>
                  </div>
                </div>
              </div>

              {totalPrice < 1000 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Додайте товарів на {(1000 - totalPrice).toLocaleString()} грн для безкоштовної доставки
                </p>
              )}

              <Link to="/checkout">
                <Button className="w-full" size="lg">
                  Оформити замовлення
                </Button>
              </Link>

              <Link to="/catalog" className="block mt-4">
                <Button variant="outline" className="w-full">
                  Продовжити покупки
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
