import { client } from "./client";
import { CATEGORY_PRODUCTS, ALL_CURRENCIES, ALL_CATEGORIES, PRODUCT } from './queries';

export const fetchCurrencies = async () => {
  let currencies;
  await client.query({ query: ALL_CURRENCIES })
    .then(({ data }) => {
      let finalData = JSON.parse(JSON.stringify(data));
      finalData = finalData.currencies.map(currency => {
        return currency;
      });
      currencies = finalData;
    })
  return currencies;
}

export const fetchCategories = async () => {
  let categories;
  await client.query({ query: ALL_CATEGORIES })
    .then(({ data }) => {
      let finalData = JSON.parse(JSON.stringify(data));
      finalData = finalData.categories.map(category => {
        return category;
      });
      categories = finalData;
    })
  return categories;
}

export const fetchProduct = async (id) => {
  let product = await client.query({
    query: PRODUCT,
    variables: { id }
  });
  return product;
}

export const fetchProductsCategory = async (category) => {
  let prods = await client.query({
    query: CATEGORY_PRODUCTS,
    variables: { category }
  });

  return prods;
}