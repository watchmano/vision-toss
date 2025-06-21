import { Tabs, Box, Grid } from '@radix-ui/themes';
import DecorativeBox from './decorative-box';
import { getAllProducts, getAllCategories } from '@/lib/actions/product.actions';

export default async function ProductsTabs() {
  const products = await getAllProducts({
    query: 'all',
    category: 'all',
    price: 'all',
    rating: 'all',
    sort: 'newest',
    page: 1,
  });

  const categories = await getAllCategories();

  // 카테고리별 제품 분류
  const formatted: Record<string, { name: string; price: string }[]> = {};

  products.data.forEach((product) => {
    if (!formatted[product.category]) {
      formatted[product.category] = [];
    }
    formatted[product.category].push({
      name: product.name,
      price: product.price,
    });
  });

  const defaultCategory = categories[0]?.category || '';

  return (
    <Tabs.Root defaultValue={defaultCategory}>
      <Tabs.List wrap="wrap" justify="center">
        {categories.map((cat) => (
          <Tabs.Trigger key={cat.category} value={cat.category}>
            {cat.category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Box pt="3">
        {categories.map((cat) => (
          <Tabs.Content key={cat.category} value={cat.category}>
            <Grid columns="3" gap="3" rows="repeat(2, 64px)" width="auto">
              {(formatted[cat.category] || []).map((product, index) => (
                <DecorativeBox
                  key={index}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </Grid>
          </Tabs.Content>
        ))}
      </Box>
    </Tabs.Root>
  );
}
