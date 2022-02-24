import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class PageProductsList extends Component {
  render() {
    const { addProd, currency, products, title } = this.props;
    return (
      <div className="container" >
        <div>
          <h1>{title}</h1>
        </div>

        <div className='cardContainer'>
          {products.length > 0 && products.map((product, i) => {
            const price = product.prices.filter(element => element.currency.symbol === currency);
            return (
              <ProductCard
                key={i}
                id={product.id}
                onAdd={addProd}
                product={product}
                title={product.name}
                mainImage={product.gallery[0]}
                price={price[0].amount}
                currency={price[0].currency.symbol}
                isOutOfStock={!product.inStock}
              />
            )
          })}
        </div>
      </div>
    )
  }
}