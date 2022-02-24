import { client } from "./client";
import { ALL_PRODUCTS } from './queries';


export const fetchData = async () => {
  let allProducts, clothes, tech;
  await client.query({ query: ALL_PRODUCTS })
    .then(({ data }) => {
      let finalData = JSON.parse(JSON.stringify(data));
      finalData = finalData.category.products.map(product => {
        product.attributes.map(attribute => {
          attribute.items.map(item => {
            item.selected = false;
            return item;
          })
          return attribute;
        })
        product.sizes = product.attributes;
        return product;
      });
      allProducts = finalData;
      clothes = finalData.filter(product => {
        return product.category === "clothes"
      });
      tech = finalData.filter(product => {
        return product.category === "tech"
      })
    })
  return {
    allProducts,
    clothes,
    tech
  }
}