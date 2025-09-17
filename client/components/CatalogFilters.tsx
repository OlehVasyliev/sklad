import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import SidebarCatalogNavigation from './SidebarCatalogNavigation';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

interface FilterSection {
  title: string;
  key: string;
  options: { value: string; label: string; count?: number }[];
  isOpen: boolean;
}

interface CatalogFiltersProps {
  onFiltersChange: (filters: any) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({ 
  onFiltersChange, 
  isMobile = false, 
  isOpen = true, 
  onClose 
}) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchParams] = useSearchParams();
  // Встановлюємо фільтр по бренду з query brand
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      setFilters((prev) => {
        if (prev.brand && prev.brand.includes(brandParam)) return prev;
        const newFilters = { ...prev, brand: [brandParam] };
        onFiltersChange({ ...newFilters, sortBy });
        return newFilters;
      });
    }
    // eslint-disable-next-line
  }, [searchParams]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    color: false,
    material: false,
    size: false,
    country: false,
    closure: false,
    availability: true
  });

  const filterSections: FilterSection[] = [
    {
      title: 'Категорія',
      key: 'category',
      isOpen: expandedSections.category,
      options: [
        { value: 'valizy', label: 'Валізи', count: 45 },
        { value: 'dorozhnie-sumky', label: 'Дорожні сумки', count: 23 },
        { value: 'ryukzaky-dorozhni', label: 'Дорожні рюкзаки', count: 18 },
        { value: 'kosmetychky', label: 'Косметички', count: 12 }
      ]
    },
    {
      title: 'Бренд',
      key: 'brand',
      isOpen: expandedSections.brand,
      options: [
        { value: 'samsonite', label: 'Samsonite', count: 15 },
        { value: 'delsey', label: 'Delsey', count: 12 },
        { value: 'vip', label: 'VIP', count: 10 },
        { value: 'wings', label: 'Wings', count: 8 },
        { value: 'madison', label: 'Madison', count: 6 }
      ]
    },
    {
      title: 'Колір',
      key: 'color',
      isOpen: expandedSections.color,
      options: [
        { value: 'black', label: 'Чорний', count: 25 },
        { value: 'blue', label: 'Синій', count: 18 },
        { value: 'red', label: 'Червоний', count: 12 },
        { value: 'gray', label: 'Сірий', count: 15 },
        { value: 'green', label: 'Зелений', count: 8 }
      ]
    },
    {
      title: 'Матеріал',
      key: 'material',
      isOpen: expandedSections.material,
      options: [
        { value: 'abs', label: 'ABS пластик', count: 20 },
        { value: 'polycarbonate', label: 'Полікарбонат', count: 18 },
        { value: 'polyester', label: 'Поліестер', count: 15 },
        { value: 'nylon', label: 'Нейлон', count: 10 }
      ]
    },
    {
      title: 'Розмір',
      key: 'size',
      isOpen: expandedSections.size,
      options: [
        { value: 'small', label: 'Ручна поклажа (до 55см)', count: 22 },
        { value: 'medium', label: 'Середній (56-69см)', count: 28 },
        { value: 'large', label: 'Великий (70-79см)', count: 18 },
        { value: 'xl', label: 'Дуже великий (80см+)', count: 8 }
      ]
    },
    {
      title: 'Країна виробник',
      key: 'country',
      isOpen: expandedSections.country,
      options: [
        { value: 'france', label: 'Франція', count: 15 },
        { value: 'germany', label: 'Німеччина', count: 12 },
        { value: 'china', label: 'Китай', count: 28 },
        { value: 'poland', label: 'Польща', count: 8 }
      ]
    },
    {
      title: 'Вид застібки',
      key: 'closure',
      isOpen: expandedSections.closure,
      options: [
        { value: 'zip', label: 'Блискавка', count: 35 },
        { value: 'combination', label: 'Кодовий замок', count: 25 },
        { value: 'key', label: 'Замок з ключем', count: 15 },
        { value: 'tsa', label: 'TSA замок', count: 20 }
      ]
    },
    {
      title: 'Наявність',
      key: 'availability',
      isOpen: expandedSections.availability,
      options: [
        { value: 'in-stock', label: 'В наявності', count: 65 },
        { value: 'on-order', label: 'Під замовлення', count: 11 }
      ]
    }
  ];

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFilterChange = (sectionKey: string, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    
    if (!newFilters[sectionKey]) {
      newFilters[sectionKey] = [];
    }
    
    if (checked) {
      newFilters[sectionKey] = [...newFilters[sectionKey], value];
    } else {
      newFilters[sectionKey] = newFilters[sectionKey].filter(v => v !== value);
    }
    
    setFilters(newFilters);
    onFiltersChange({ ...newFilters, sortBy });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFiltersChange({ ...filters, sortBy: value });
  };

  const clearAllFilters = () => {
    setFilters({});
    setSortBy('popular');
    onFiltersChange({ sortBy: 'popular' });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <label className="text-sm font-medium mb-2 block">Сортування</label>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">За популярністю</SelectItem>
            <SelectItem value="price-asc">За ціною: спочатку дешеві</SelectItem>
            <SelectItem value="price-desc">За ціною: спочатку дорогі</SelectItem>
            <SelectItem value="newest">За новизною</SelectItem>
            <SelectItem value="name">За назвою</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <span className="text-sm text-gray-500">
            Активних фільтрів: {getActiveFiltersCount()}
          </span>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
            Очистити все
          </Button>
        </div>
      )}

      {/* Filter sections */}
      {filterSections.map((section) => (
        <div key={section.key} className="border-b border-gray-100 pb-4">
          <button
            onClick={() => toggleSection(section.key)}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">{section.title}</span>
            <ChevronDown 
              className={cn(
                "w-4 h-4 transition-transform",
                section.isOpen ? "rotate-180" : ""
              )} 
            />
          </button>
          
          {section.isOpen && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${section.key}-${option.value}`}
                    checked={filters[section.key]?.includes(option.value) || false}
                    onCheckedChange={(checked) => 
                      handleFilterChange(section.key, option.value, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`${section.key}-${option.value}`}
                    className="text-sm flex-1 cursor-pointer flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {option.count && (
                      <span className="text-muted-foreground">({option.count})</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 bg-background transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Фільтри</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] pb-20">
          <SidebarCatalogNavigation />
          {filterContent}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {filterContent}
    </div>
  );
};

export default CatalogFilters;
