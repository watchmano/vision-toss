import ProductCard from '@/components/shared/product/product-card';
// import { Button } from '@/components/ui/button';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Mail,
  User,
  Settings,
  LogOut,
  Search,
} from 'lucide-react';
// const prices = [
//   {
//     name: '$1 to $50',
//     value: '1-50',
//   },
//   {
//     name: '$51 to $100',
//     value: '51-100',
//   },
//   {
//     name: '$101 to $200',
//     value: '101-200',
//   },
//   {
//     name: '$201 to $500',
//     value: '201-500',
//   },
//   {
//     name: '$501 to $1000',
//     value: '501-1000',
//   },
// ];

// const ratings = [4, 3, 2, 1];

// const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet =
    category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ''} 
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}
      ${isRatingSet ? `: Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <aside className='hidden sm:block w-55 bg-white dark:bg-gray-900 h-screen p-5 shadow-md rounded-r-xl'>
        {/* Title */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
            Vision Toss
          </h1>
        </div>

        {/* Search */}
        <div className='relative mb-6'>
          <input
            type='text'
            placeholder='Search'
            className='w-full pl-10 pr-4 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none'
          />
          <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
        </div>

        {/* 구분선 */}
        <div className='border-t border-gray-200 dark:border-gray-700 mb-4'></div>

        {/* Category List */}
        <nav className='space-y-4'>
          <Link
            className='flex justify-between items-center px-1.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition'
            href={getFilterUrl({ c: 'all' })}
          >
            <div className='flex items-center gap-3 text-gray-700 dark:text-gray-200'>
              전체
            </div>
          </Link>

          {categories.map((x) => (
            <Link
              key={x.category}
              href={getFilterUrl({ c: x.category })}
              className='flex justify-between items-center px-1.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition'
            >
              <div className='flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                {x.category}
              </div>
              <span className='bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-0.5 text-xs font-medium rounded-full'>
                {x._count}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className='md:col-span-4 space-y-4'>
        {/* <div className='flex-between flex-col md:flex-row my-4'>
          <div className='flex items-center'>
            {q !== 'all' && q !== '' && 'Query: ' + q}
            {category !== 'all' && category !== '' && 'Category: ' + category}
            {price !== 'all' && ' Price: ' + price}
            {rating !== 'all' && ' Rating: ' + rating + ' stars & up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Button variant={'link'} asChild>
                <Link href='/search'>Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>
            Sort by{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort == s && 'font-bold'}`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div> */}
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
