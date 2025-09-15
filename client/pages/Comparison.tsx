import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

function valuesEqual(values: (string | number | undefined)[]) {
  const norm = values.map((v) => (v === undefined || v === '' ? '-' : String(v)));
  return new Set(norm).size <= 1;
}

const Comparison: React.FC = () => {
  const { items, remove, clear, count } = useComparison();
  const [onlyDiff, setOnlyDiff] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const it of items) {
      const key = it.category || 'Інше';
      if (!map.has(key)) map.set(key, [] as any);
      map.get(key)!.push(it);
    }
    return map;
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Порівняння</h1>
          <div className="bg-white rounded-lg p-8">
            <p className="text-muted-foreground mb-6">Немає товарів для порівняння</p>
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
          <h1 className="text-3xl font-bold">Порівняння ({count})</h1>
          <div className="flex items-center gap-6 flex-wrap">
            <label className="flex items-center gap-2 text-sm whitespace-nowrap">
              <Checkbox checked={onlyDiff} onCheckedChange={(v) => setOnlyDiff(Boolean(v))} />
              Відображати лише відмінності
            </label>
            <Button variant="outline" onClick={clear}>Очистити</Button>
          </div>
        </div>

        {[...grouped.entries()].map(([category, list]) => {
          // Collect all spec keys
          const specKeys = Array.from(
            new Set(
              list.flatMap((p) => Object.keys(p.specifications || {}))
            )
          );
          const rows: { label: string; values: (string | number | undefined)[] }[] = [];
          // Base rows
          rows.push({ label: 'Ціна', values: list.map((p) => p.price) });
          rows.push({ label: 'Бренд', values: list.map((p) => p.brand) });
          // Features as a single row (comma-separated)
          rows.push({ label: 'Особливості', values: list.map((p) => (p.features && p.features.length ? p.features.join(', ') : undefined)) });
          // Specifications
          for (const key of specKeys) {
            rows.push({ label: key, values: list.map((p) => p.specifications?.[key]) });
          }
          // Apply only differences filter, but always keep price
          const filteredRows = onlyDiff ? rows.filter((r) => r.label === 'Ціна' || !valuesEqual(r.values)) : rows;

          return (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">{category}</h2>
              <div className="overflow-x-auto">
                <table className="bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50" style={{ flexWrap: 'wrap' }}>
                      <th className="p-4 w-[150px] min-w-[150px] text-left"></th>
                      {list.map((p) => (
                        <th key={p.id} className="p-4 text-left w-[250px] min-w-[250px] align-top">
                          <div className="flex items-center justify-between">
                            <Link to={`/product/${p.id}`} className="hover:text-primary font-medium line-clamp-2">
                              {p.name}
                            </Link>
                            <button onClick={() => remove(p.id)} aria-label="Видалити" className="ml-3 text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <img src={p.image} alt={p.name} className="mt-2 w-full h-32 object-contain" />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => (
                      <tr key={row.label} className="border-t">
                        <td className="p-3 font-medium bg-gray-50 w-[150px] min-w-[150px]">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="p-3 align-top w-[250px] min-w-[250px] whitespace-normal break-words">{v === undefined || v === '' ? '—' : String(v)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;
