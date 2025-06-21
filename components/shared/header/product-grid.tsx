import React from 'react';
import { usePathname } from 'next/navigation';
import { Tabs, Box, Text, Grid } from '@radix-ui/themes';
import DecorativeBox from './decorative-box';

import {
  getAllProducts, getAllCategories,
} from '@/lib/actions/product.actions';

import NextLink from 'next/link';
const ProductsGrid = async (props: {
  name: string;
  price: string;
}) => {
 

  return (
    <Grid columns='3' gap='3' rows='repeat(2, 64px)' width='auto'>
      
      {props.name && props.price ? (
        <DecorativeBox name={props.name} price={props.price} />
      ) : (
        <DecorativeBox name='Placeholder Product' price='$0.00' />
      )}
    </Grid>
  );
};

export default ProductsGrid;
