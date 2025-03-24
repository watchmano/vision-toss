'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition, useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>()

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    if (!selectedDate) {
      toast({
        variant: 'destructive',
        description: 'Please select a date',
      });
      return;
    }
    startTransition(async () => {
      const res = await addItemToCart({
        ...item,
        qty: 1,
        schedule: format(selectedDate, 'yyyy-MM-dd'),
      });
      console.log('res', res);
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      // Handle success add to cart
      toast({
        description: res.message,
        action: (
          <ToastAction
            className='bg-primary text-white hover:bg-gray-800'
            altText='Go To Cart'
            onClick={() => router.push('/cart')}
          >
            Go To Confirmation
          </ToastAction>
        ),
      });
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      });

      return;
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return (
    <div className='flex-col justify-between'>
    <div className='mt-3 mb-3'>

        <DatePicker value={selectedDate} onChange={setSelectedDate} />
    </div>
    <div>

        <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}{' '}
      Schedule Surgery
    </Button>
    </div>
    </div>
  )
  // return existItem ? (
  //   <div>
  //     <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
  //       {isPending ? (
  //         <Loader className='w-4 h-4 animate-spin' />
  //       ) : (
  //         <Minus className='w-4 h-4' />
  //       )}
  //     </Button>
  //     <span className='px-2'>{existItem.qty}</span>
  //     <Button type='button' variant='outline' onClick={handleAddToCart}>
  //       {isPending ? (
  //         <Loader className='w-4 h-4 animate-spin' />
  //       ) : (
  //         <Plus className='w-4 h-4' />
  //       )}
  //     </Button>
  //   </div>
  // ) : (
  //   <Button className='w-full' type='button' onClick={handleAddToCart}>
  //     {isPending ? (
  //       <Loader className='w-4 h-4 animate-spin' />
  //     ) : (
  //       <Plus className='w-4 h-4' />
  //     )}{' '}
  //     Schedule Surgery
  //   </Button>
  // );
};

export default AddToCart;
