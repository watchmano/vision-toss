import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import CategoryTabsMobile from './category-tabs-mobile';

import CategoryTabsPc from './category-tabs-pc';
export default async function ProductsTabs() {
  const products = await getAllProducts({
    query: 'all',
    category: 'all',
    price: 'all',
    rating: 'all',
    sort: 'newest',
    page: 1,
    limit: 100,
  });
  const categories = await getAllCategories();

  const formatted: Record<
    string,
    { name: string; price: string; slug: string }[]
  > = {};

  products.data.forEach((product) => {
    if (!formatted[product.category]) formatted[product.category] = [];
    formatted[product.category].push({
      name: product.name,
      price: product.price,
      slug: product.slug,
    });
  });

  const defaultCategory = categories[0]?.category || '';

  categories.forEach((cat) => {
    cat.category;
  });

  return (
    <div>
      <CategoryTabsPc
        categories={categories.map((c) => c.category)}
        // categories={categories}
        formatted={formatted}
        defaultCategory={defaultCategory}
      />
      {/* <CategoryTabsMobile
        products={formatted}
        categories={categories.map((c) => c.category)}
        defaultCategory={defaultCategory}
      /> */}
      <div></div>
    </div>
  );
}
