
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type MenuKey = string | null;

const MegaMenu = (props: {
  products?: Record<string, { name: string; price: string }[]>;
  categories?: string[];
  defaultCategory?: string;
}) => {
  const { products = {}, categories = [] } = props;

  const [activeDropdown, setActiveDropdown] = useState<MenuKey>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (key: MenuKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInside =
        wrapperRef.current?.contains(target) || dropdownRef.current?.contains(target);

      if (!clickedInside) {
        handleCloseMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className='border-t border-[#e2e8f0] bg-white dark:border-gray-600 dark:bg-gray-900 relative'>
      {/* 모바일 햄버거 버튼 - 열릴 때만 보여줌 */}
      {!isMobileMenuOpen && (
        <button
          onClick={handleOpenMenu}
          className='md:hidden z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      )}

      {/* 메뉴 전체를 감싸는 영역 */}
      <div
        ref={wrapperRef}
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-center`}
      >
        <div className='mx-auto max-w-screen-xl p-4'>
              <div className="flex justify-end mb-4">
      <button
        onClick={handleCloseMenu}
        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-red-500"
        aria-label="Close menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
          <ul className='flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse'>
            <li>
              <Link
                href='#'
                className='block py-2 px-3 text-gray-900 hover:text-blue-600 md:p-0 dark:text-white dark:hover:text-blue-500'
              >
                Home
              </Link>
            </li>

            {categories.map((key) => (
              <li key={key} className='relative'>
                <button
                  data-dropdown-button
                  onClick={() => toggleDropdown(key)}
                  className='flex items-center justify-between w-full py-2 px-3 text-gray-900 md:w-auto hover:text-blue-600 md:p-0 dark:text-white dark:hover:text-blue-500'
                >
                  {key}
                  <svg
                    className='w-2.5 h-2.5 ms-2'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 4 4 4-4'
                    />
                  </svg>
                </button>
              </li>
            ))}

            <li>
              <Link
                href='#'
                className='block py-2 px-3 text-gray-900 hover:text-blue-600 md:p-0 dark:text-white dark:hover:text-blue-500'
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* 드롭다운 */}
          {activeDropdown && products[activeDropdown] && (
            <div
              ref={dropdownRef}
              className='mt-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600'
            >
              <div className='grid grid-cols-2 gap-4 px-4 py-5 text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3'>
                {(products[activeDropdown] || []).map((item, i) => (
                  <div
                    key={i}
                    className='p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer'
                  >
                    <div className='font-semibold'>{item.name}</div>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {item.price}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MegaMenu;
