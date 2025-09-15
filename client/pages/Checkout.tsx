import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const DELIVERY_FREE_FROM = 1000;
const DELIVERY_COST = 150;

const Checkout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState<'cash' | 'bank'>('cash');
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const delivery = useMemo(() => (totalPrice >= DELIVERY_FREE_FROM ? 0 : DELIVERY_COST), [totalPrice]);
  const grandTotal = useMemo(() => totalPrice + delivery, [totalPrice, delivery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Imitate order creation
    alert('Замовлення прийнято. Менеджер зв\'яжеться з вами.');
    clearCart();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Оформлення замовлення</h1>
            <p className="text-muted-foreground mb-6">Щоб оформити замовлення, увійдіть у свій кабінет</p>
            <Link to="/login">
              <Button size="lg">Увійти</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Оформлення замовлення</h1>
            <p className="text-muted-foreground mb-6">Ваш кошик порожній</p>
            <Link to="/catalog">
              <Button size="lg">До каталогу</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Кошик</h1>
          <div className="text-sm text-muted-foreground">Ви замовляєте {totalItems} товарів на суму {totalPrice.toLocaleString()} грн</div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded-md p-4 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate hover:whitespace-normal">{item.name}</div>
                  <button type="button" onClick={() => removeItem(item.id)} className="text-xs text-red-500 hover:underline">Видалити</button>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                    className="w-14 text-center border rounded-md py-1"
                    min={1}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="w-24 text-right font-semibold">{(item.price * item.quantity).toLocaleString()} грн</div>
              </div>
            ))}
          </div>

          {/* Right: Buyer info, payment, summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-md p-4 mb-4">
              <div className="font-semibold mb-3">Покупець</div>
              <div className="grid grid-cols-1 gap-3">
                <Input placeholder="Ім'я" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <Input placeholder="Прізвище" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <Input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="border rounded-md p-4 mb-4">
              <div className="font-semibold mb-3">Оплата</div>
              <RadioGroup value={payment} onValueChange={(v) => setPayment(v as 'cash' | 'bank')} className="grid grid-cols-1 gap-3">
                <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer">
                  <RadioGroupItem value="cash" id="pay-cash" />
                  <div>
                    <div className="font-medium">Готівковий</div>
                    <div className="text-xs text-muted-foreground">Оплата накладеним платежем</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer">
                  <RadioGroupItem value="bank" id="pay-bank" />
                  <div>
                    <div className="font-medium">Безготівковий</div>
                    <div className="text-xs text-muted-foreground">Оплата безготівковим способом</div>
                  </div>
                </label>
              </RadioGroup>

              <button type="button" onClick={() => setShowComment((s) => !s)} className="text-sm text-primary mt-3">
                {showComment ? 'Сховати коментар' : 'Коментар до замовлення'}
              </button>
              {showComment && (
                <div className="mt-3">
                  <Textarea placeholder="Ваш коментар" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
              )}
            </div>

            <div className="border rounded-md p-4 mb-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Вартість товарів</span><span>{totalPrice.toLocaleString()} грн</span></div>
                <div className="flex justify-between"><span>Доставка</span><span className={delivery === 0 ? 'text-green-600' : ''}>{delivery === 0 ? 'Безкоштовно' : `${DELIVERY_COST} грн`}</span></div>
                <div className="border-t pt-2 font-semibold flex justify-between text-base"><span>Разом</span><span>{grandTotal.toLocaleString()} грн</span></div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Вибрати оплату
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
