// 수정된 ProductsTabs 컴포넌트 - MegaMenu 스타일 반영
import { Tabs } from '@radix-ui/themes';
import { getAllProducts, getAllCategories } from '@/lib/actions/product.actions';
import MegaMenu from './MegaMenu';
import Link from 'next/link';

export default async function ProductsTabs() {
  const products = await getAllProducts({
    query: 'all', category: 'all', price: 'all', rating: 'all', sort: 'newest', page: 1, limit: 100,
  });
  const categories = await getAllCategories();
  const formatted: Record<string, { name: string; price: string; slug: string }[]> = {};
  
  products.data.forEach((product) => {
    if (!formatted[product.category]) formatted[product.category] = [];
    formatted[product.category].push({ name: product.name, price: product.price, slug: product.slug });
  });

  const defaultCategory = categories[0]?.category || '';

  return (
    // add mega menu with props of products and categories
      <div>
        <Tabs.Root defaultValue={defaultCategory}>
        <div className="border-t w-[100vw] border-[#e2e8f0] bg-white dark:border-gray-600 dark:bg-gray-900 hidden md:block">
          <Tabs.List justify="center" wrap="wrap" className="w-full  mx-auto px-4 border-gray-200 dark:border-gray-600">
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
  
          <div className="w-[100vw] mx-auto px-4 h-50 text-gray-900 dark:text-white dark:bg-gray-800">
            {categories.map((cat) => (
              <Tabs.Content key={cat.category} value={cat.category}>
                <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                  {(formatted[cat.category] || []).map((product, i) => (
                    <Link key={i} href={`/product/${product.slug}`}>

                    <div
                      className="p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer 
                                flex flex-col justify-center items-center text-center h-full min-h-[70px]"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{product.price}원</div>
                    </div>
                    </Link>
                  ))}
                </div>
              </Tabs.Content>
            ))}
          </div>
        </div>
      </Tabs.Root>
      <MegaMenu
        products={formatted}
        categories={categories.map((c) => c.category)}
        defaultCategory={defaultCategory}
        />
      </div>
      
    
  );
}