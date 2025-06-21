
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
type MenuKey = 'company' | 'marketplace' | 'resources' | null;

const MegaMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<MenuKey>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (key: MenuKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isDropdownClicked =
        dropdownRef.current && dropdownRef.current.contains(target);

      const buttonElements = document.querySelectorAll(
        '[data-dropdown-button]'
      );
      const clickedOnButton = Array.from(buttonElements).some((el) =>
        el.contains(target)
      );

      if (!isDropdownClicked && !clickedOnButton) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const dropdownContent: Record<MenuKey, string[][]> = {
    company: [
      ['Company Info', 'Our Team', 'Careers'],
      ['Mission', 'Culture', 'Partners'],
      ['Investors', 'News', 'Events'],
    ],
    marketplace: [
      ['All Products', 'Trending', 'Best Sellers'],
      ['Coupons', 'New Arrivals', 'Subscriptions'],
      ['Gift Cards', 'Affiliate Program', 'FAQs'],
    ],
    resources: [
      ['Docs', 'API Reference', 'Tutorials'],
      ['Community', 'Support', 'Blog'],
      ['Webinars', 'Events', 'Newsletters'],
    ],
    null: [],
  };

  return (
    <nav className='border-t border-[#e2e8f0] bg-white dark:border-gray-600 dark:bg-gray-900'>
      <div className='flex justify-between items-center mx-auto max-w-screen-xl p-4'>
        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className='md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>

        {/* 메뉴 리스트 */}
        <div
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:justify-center`}
        >
          <ul className='flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse'>
            <li>
              <Link
                href='#'
                className='block py-2 px-3 text-gray-900 hover:text-blue-600 md:p-0 dark:text-white dark:hover:text-blue-500'
              >
                Home
              </Link>
            </li>

            {(['company', 'marketplace', 'resources'] as MenuKey[]).map(
              (key) => (
                <li key={key} className='relative'>
                  <button
                    data-dropdown-button
                    onClick={() => toggleDropdown(key)}
                    className='flex items-center justify-between w-full py-2 px-3 text-gray-900 md:w-auto hover:text-blue-600 md:p-0 dark:text-white dark:hover:text-blue-500'
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
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
              )
            )}

            <li>
              <Link
                href='#'
                className='block py-2 px-3 text-gray-900 hover:text-blue-600 md:p-0 dark:text-white dark:hover:text-blue-500'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 드롭다운 영역 */}
      {activeDropdown && (
        <div
          ref={dropdownRef}
          className='mt-1 bg-white border-y border-gray-200 shadow-xs dark:bg-gray-800 dark:border-gray-600'
        >
          <div className='grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3 md:px-6'>
            {dropdownContent[activeDropdown].map((group, i) => (
              <ul key={i}>
                {group.map((title) => (
                  <li key={title}>
                    <Link
                      href='#'
                      className='block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                    >
                      <div className='font-semibold'>{title}</div>
                      <span className='text-sm text-gray-500 dark:text-gray-400'>
                        Placeholder description text.
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MegaMenu;
