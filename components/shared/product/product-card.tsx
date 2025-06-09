import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm sm:w-[300px]'>
      {/* 고정 비율 이미지 영역 */}
      <CardHeader className='p-0 items-center h-[220px] sm:h-[250px] overflow-hidden'>
        <Link href={`/product/${product.slug}`} className='block w-full h-full relative'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className='object-cover'
            priority
          />
        </Link>
      </CardHeader>

      {/* 고정된 정보 영역 */}
      <CardContent className='p-4 grid gap-3 h-[150px] sm:h-[160px]'>
        <div className='text-xs text-gray-500'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium line-clamp-2'>{product.name}</h2>
        </Link>
        <div className='flex justify-between items-center'>
          {/* <Rating value={Number(product.rating)} /> */}
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive text-sm'>Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
