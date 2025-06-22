// 수정된 ProductsTabs 컴포넌트 - MegaMenu 스타일 반영
import { Tabs } from '@radix-ui/themes';
import { getAllProducts, getAllCategories } from '@/lib/actions/product.actions';
import MegaMenu from './MegaMenu';

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
    // add mega menu with props of products and categories
    
      <MegaMenu
        products={formatted}
        categories={categories.map((c) => c.category)}
        defaultCategory={defaultCategory}
        />
    
  );
}