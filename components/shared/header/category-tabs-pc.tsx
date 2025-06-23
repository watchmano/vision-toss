'use client';

// 수정된 ProductsTabs 컴포넌트 - MegaMenu 스타일 반영
import { Tabs, Card, Flex, Avatar, Box, Text } from '@radix-ui/themes';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';

import { useState } from 'react';
import Link from 'next/link';

function pastelColorFromSlug(name: string): string {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 85%)`; // 파스텔 느낌
}

export default function CategoryTabsPc(props: {
  // categories: {category: string}[];
  categories: string[];

  formatted: Record<string, { name: string; price: string; slug: string }[]>;
  defaultCategory?: string;
}) {
  const { formatted, defaultCategory, categories } = props;
  // const { categories, formatted, defaultCategory, testcategories} = props
  const [visible, setVisible] = useState(true);

  return (
    // add mega menu with props of products and categories
    <div className='relative hidden md:block'>
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className='absolute top-3 right-8 z-10 text-lg font-bold px-3  text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition'
        >
          <PlusIcon width={20} height={20} />
        </button>
      )}
      {visible && (
        <button
          onClick={() => setVisible(false)}
          className='absolute top-3 right-8 z-10 text-lg font-bold px-3  text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition'
        >
          <Cross2Icon width={19} height={19} />
        </button>
      )}
      <Tabs.Root defaultValue={defaultCategory}>
        <div className='border-t w-[100vw] bg-white dark:border-gray-600 dark:bg-gray-900 '>
          <Tabs.List
            justify='center'
            wrap='wrap'
            className='w-full  mx-auto px-4 border-gray-200 dark:border-gray-600'
          >
            {categories.map((category) => (
              <Tabs.Trigger
                onClick={() => setVisible(true)}
                key={category}
                value={category}
                className='px-4 py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors'
              >
                {category}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {visible && (
            <div className='w-[100vw] mx-auto px-4 text-gray-900 dark:text-white dark:bg-gray-800'>
              {categories.map((category) => (
                <Tabs.Content key={category} value={category}>
                  <div className='flex flex-wrap gap-3 py-3 px-10'>
                    {(formatted[category] || []).map((product, i) => (
                      <Link key={i} href={`/product/${product.slug}`}>
                        <Card className='w-[220px] flex-shrink-0 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 ease-in-out rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500'>
                          <Flex gap='3' align='center'>
                            {/* <Avatar
                              size='3'
                              src='https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?...'
                              radius='full'
                              fallback='T'
                            /> */}
                            <div
                              className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700'
                              style={{
                                backgroundColor: pastelColorFromSlug(
                                  product.name
                                ),
                              }}
                            >
                              {product.name.slice(0, 1)}
                            </div>
                            <Box>
                              <Text
                                as='div'
                                size='2'
                                weight='bold'
                                className='font-[Pretendard]'
                              >
                                {product.name}
                              </Text>
                              <Text
                                as='div'
                                size='2'
                                color='gray'
                                className='font-[Pretendard]'
                              >
                                {Number(product.price).toLocaleString()}원
                              </Text>
                            </Box>
                          </Flex>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </Tabs.Content>
              ))}
            </div>

            // <div className='w-[100vw] mx-auto px-4 h-50 text-gray-900 dark:text-white dark:bg-gray-800 flex flex-wrap gap-4'>

            //   {categories.map((category) => (
            //     <div className='' key={category}>

            //     <Tabs.Content key={category} value={category}>
            //       {/* <div className='grid grid-cols-3 gap-x-8 gap-y-1'> */}
            //         {(formatted[category] || []).map((product, i) => (
            //           <Link key={i} href={`/product/${product.slug}`}>
            //             <Box maxWidth='240px'>
            //               <Card>
            //                 <Flex gap='3' align='center'>
            //                   <Avatar
            //                     size='3'
            //                     src='https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop'
            //                     radius='full'
            //                     fallback='T'
            //                   />
            //                   <Box>
            //                     <Text as='div' size='2' weight='bold'>
            //                 {product.name}
            //                     </Text>
            //                     <Text as='div' size='2' color='gray'>
            //                 {product.price}원
            //                     </Text>
            //                   </Box>
            //                 </Flex>
            //               </Card>
            //             </Box>
            //           </Link>
            //         ))}
            //       {/* </div> */}
            //     </Tabs.Content>
            //     </div>
            //   ))}

            // </div>
          )}
        </div>
      </Tabs.Root>
    </div>
  );
}
