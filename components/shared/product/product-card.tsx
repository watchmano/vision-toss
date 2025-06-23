import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';

function pastelColorFromSlug(name: string): string {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 85%)`; // 파스텔 느낌
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    // <Card
    //   className='flex w-full max-w-2xl overflow-hidden shadow-md transition hover:shadow-lg border-[3px] backdrop-blur-md bg-white/50 dark:bg-white/30'
    //   style={{
    //     borderColor: pastelColorFromSlug(product.name),
    //     // backgroundColor: pastelColorFromSlug(product.name), // Glass 배경색은 여기선 제거
    //   }}
    // >
    //   {/* 이미지 영역 - 좌측 고정 비율 */}
    //   <div className='relative w-[35%] min-w-[120px] h-[160px]'>
    //     <Link href={`/product/${product.slug}`} className='block w-full h-full'>
    //       <Image
    //         src={product.images[0]}
    //         alt={product.name}
    //         fill
    //         className='object-cover'
    //         priority
    //       />
    //     </Link>
    //   </div>

    //   {/* 텍스트 콘텐츠 영역 - 우측 */}
    //   <CardContent className='w-[60%] p-4 flex flex-col justify-between'>
    //     <div className='text-xs text-gray-700 dark:text-gray-700 mb-1'>
    //       {product.brand}
    //     </div>

    //     <Link href={`/product/${product.slug}`}>
    //       <h2 className='text-base font-semibold text-gray-800 dark:text-gray-800 leading-tight line-clamp-2 hover:underline'>
    //         {product.name}
    //       </h2>
    //     </Link>

    //     <div className='mt-2 text-right text-gray-800 dark:text-gray-800'>
    //       {product.stock > 0 ? (
    //         <ProductPrice value={Number(product.price)} />
    //       ) : (
    //         <p className='text-destructive text-sm'>Out Of Stock</p>
    //       )}
    //     </div>
    //   </CardContent>
    // </Card>

    <Card
      className='flex w-full max-w-2xl border-2 overflow-hidden shadow-md transition hover:shadow-lg'
      style={{
        borderColor: pastelColorFromSlug(product.name),
        backgroundColor: pastelColorFromSlug(product.name),
      }}
    >
      {/* <Card className='flex w-full max-w-2xl overflow-hidden shadow-md transition hover:shadow-lg'> */}
      {/* 이미지 영역 - 좌측 고정 비율 */}
      <div className='relative w-[35%] min-w-[120px] h-[160px]'>
        <Link href={`/product/${product.slug}`} className='block w-full h-full'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className='object-cover'
            priority
          />
        </Link>
      </div>

      {/* 텍스트 콘텐츠 영역 - 우측 */}
      <CardContent className='w-[60%] p-4 flex flex-col justify-between'>
        <div className='text-xs text-gray-700 dark:text-gray-700 mb-1'>
          {product.brand}
        </div>

        <Link href={`/product/${product.slug}`}>
          <h2 className='text-base font-semibold text-gray-800 dark:text-gray-800 leading-tight line-clamp-2 hover:underline'>
            {product.name}
          </h2>
        </Link>

        <div className='mt-2 text-right text-gray-800 dark:text-gray-800'>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive text-sm'>Out Of Stock</p>
          )}
        </div>
      </CardContent>
      {/* <CardContent className='w-[60%] p-4 flex flex-col justify-between'>
        <div className='text-xs text-gray-500 mb-1'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='dark: text-gray-500 text-base font-semibold leading-tight line-clamp-2 hover:underline'>
            {product.name}
          </h2>
        </Link>
        <div className='dark:text-gray-500 mt-2 text-right'>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive text-sm'>Out Of Stock</p>
          )}
        </div>
      </CardContent> */}
    </Card>
  );
};

export default ProductCard;
