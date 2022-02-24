import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../add.png';


export default class ProductCard extends Component {
  render() {
    const {
      isOutOfStock, title, price, currency,
      mainImage, id, margin, product
    } = this.props;

    return (

      <Link to={`/product-details/${id}`} style={{ textDecoration: 'none' }} >
        <div className='card'
          style={{ opacity: isOutOfStock ? 0.6 : 1, marginRight: margin ? "120px" : "0" }}
        >
          <div className='outOfStock'>
            <img
              className='productImage'
              src={mainImage}
              alt='Card img'
            />
            {isOutOfStock && <p className='out'>OUT OF STOCK</p>}
          </div>
          <img
            src={image}
            alt='cart'
            className={`${!isOutOfStock ? "show" : "hide"} add`}
          />
          <p className='productTile'>{product.brand} {title}</p>
          <p className='productPrice'>{currency}{price}</p>
        </div>
      </Link>
    )
  }
}