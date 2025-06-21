// 수정된 ProductsTabs 컴포넌트 - MegaMenu 스타일 반영
import { Tabs } from '@radix-ui/themes';
import { getAllProducts, getAllCategories } from '@/lib/actions/product.actions';

export default async function ProductsTabs() {
  const products = await getAllProducts({
    query: 'all', category: 'all', price: 'all', rating: 'all', sort: 'newest', page: 1,
  });
  const categories = await getAllCategories();

  const formatted: Record<string, { name: string; price: string }[]> = {};
  products.data.forEach((product) => {
    if (!formatted[product.category]) formatted[product.category] = [];
    formatted[product.category].push({ name: product.name, price: product.price });
  });

  const defaultCategory = categories[0]?.category || '';

  return (
    <Tabs.Root defaultValue={defaultCategory}>
      <div className="border-t border-[#e2e8f0] bg-white dark:border-gray-600 dark:bg-gray-900">
        <Tabs.List justify="center" wrap="wrap" className="max-w-screen-xl mx-auto px-4 border-b border-gray-200 dark:border-gray-600">
          {categories.map((cat) => (
            <Tabs.Trigger
              key={cat.category}
              value={cat.category}
              className="px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              {cat.category}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="w-full max-w-screen-xl mx-auto px-4 py-6 text-gray-900 dark:text-white dark:bg-gray-800">
          {categories.map((cat) => (
            <Tabs.Content key={cat.category} value={cat.category}>
              <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                {(formatted[cat.category] || []).map((product, i) => (
                  <div
                    key={i}
                    className="p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{product.price}원</div>
                  </div>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </div>
      </div>
    </Tabs.Root>
  );
}