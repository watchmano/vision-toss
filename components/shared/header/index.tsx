import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import CategoryDrawer from './category-drawer';
import Search from './search';
import ProductsTabs from './tabs';

const Header = () => {
  return (
    <header className='w-full border-b bg-white'>
      <div className='wrapper flex-between items-center py-3'>
        <div className='flex items-center'>
          <CategoryDrawer />
          <Link href='/' className='flex items-center gap-3 ml-4'>
            <Image
              src='/images/logo.png' // 👁️ 실제 눈 이미지 경로로 변경
              alt={`${APP_NAME} logo`}
              height={55}
              width={55}
              className='rounded-full object-cover'
              priority
            />
            <span className='font-bold text-xl md:text-2xl text-gray-800'>
              {APP_NAME}
            </span>
          </Link>
        </div>

        <div className='hidden md:block w-[300px]'>
          <Search />
        </div>

        <Menu />
      </div>
      <div>
        <ProductsTabs />
      </div>
    </header>
  );
};

export default Header;
