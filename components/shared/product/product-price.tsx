import { cn, formatPriceKRW } from '@/lib/utils';
import { format } from 'path';


const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // Ensure two decimal places
  const stringValue = value.toFixed(2);
  // Get the int/float
  const [intValue, floatValue] = stringValue.split('.');
  const formatted = formatPriceKRW(intValue);
  return (
    <p className={cn('text-2xl', className)}>
      {/* <span className='text-xs align-super'></span> */}
      {formatted}
      {/* <span className='text-xs align-super'>.{floatValue}</span> */}
    </p>
  );
};

export default ProductPrice;
