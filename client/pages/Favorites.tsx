import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const Favorites: React.FC = () => {
  const { items, remove, clear, count } = useFavorites();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Обране</h1>
          <div className="bg-white rounded-lg p-8">
            <p className="text-muted-foreground mb-6">Список обраних товарів порожній</p>
            <Link to="/catalog"><Button>Перейти до каталогу</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Обране ({count})</h1>
          <Button variant="outline" onClick={clear}>Очистити</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {items.map((p) => (
            <div key={p.id} className="bg-white rounded-lg px-5 py-4 h-full flex flex-col">
              <Link to={`/product/${p.id}`} className="block flex-1 flex flex-col">
                <img src={p.image} alt={p.name} className="w-full h-48 object-contain mb-3" />
                <div className="font-medium line-clamp-2 mb-1">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.brand}</div>
                <div className="font-semibold mt-auto pt-2">{p.price.toLocaleString()} грн</div>
              </Link>
              <div className="mt-3 flex gap-2">
                <Button className="flex-1" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image, brand: p.brand })}>
                  <ShoppingCart className="w-4 h-4 mr-2" />До кошика
                </Button>
                <Button variant="ghost" onClick={() => remove(p.id)} aria-label="Видалити">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
