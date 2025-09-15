import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from './ui/button';
import { flyToCart, bumpCart, flyToFavorites, flyToCompare } from '@/lib/cart-anim';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  brand: string;
  isNew?: boolean;
  isHit?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { toggle: toggleFav, has: hasFav } = useFavorites();
  const { toggle: toggleComp, has: hasComp } = useComparison();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = product.images || [product.image];
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand
    });
    if (imgRef.current) {
      flyToCart(imgRef.current);
    } else {
      bumpCart();
    }
  };

  return (
    <div className="group relative h-full flex flex-col px-4">
      {/* Product Image */}
      <div className="relative aspect-square mb-3 overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            ref={imgRef}
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>

        {/* Image Gallery Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? 'bg-white'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">НОВИНКА</span>
          )}
          {product.isHit && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">ХІТ</span>
          )}
          {product.discount && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium">-{product.discount}%</span>
          )}
        </div>

        {/* Quick actions - Always visible on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            onClick={() => {
              toggleFav({ id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand });
              if (imgRef.current) flyToFavorites(imgRef.current);
            }}
            size="sm" variant="secondary" className="w-9 h-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
            aria-pressed={hasFav(product.id)}
          >
            <Icon name="heart" className={`w-4 h-4 ${hasFav(product.id) ? 'text-red-500' : ''}`} />
          </Button>
          <Button
            onClick={() => {
              toggleComp({ id: product.id, name: product.name, price: product.price, image: product.image, brand: product.brand, category: product.category });
              if (imgRef.current) flyToCompare(imgRef.current);
            }}
            size="sm" variant="secondary" className="w-9 h-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
            aria-pressed={hasComp(product.id)}
          >
            <span className="text-sm">⚖️</span>
          </Button>
        </div>

        {/* Add to cart overlay */}
        {isAuthenticated && (
          <div className="absolute bottom-3 left-0 right-0 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
              onClick={handleAddToCart}
              size="sm" 
              className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
            >
              <Icon name="cart" className="w-4 h-4 mr-1" />
              До кошика
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 flex-1 flex flex-col">
        {/* Brand */}
        <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">
          {product.brand}
        </div>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm leading-tight hover:text-primary transition-colors line-clamp-2 font-medium">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="pt-1 mt-auto">
          {isAuthenticated ? (
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  {product.price.toLocaleString()} грн
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()} грн
                  </span>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login" className="inline-block">
              <span className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                Увійти для перегляду цін →
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
