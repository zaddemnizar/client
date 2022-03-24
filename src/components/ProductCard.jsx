import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../add.png';


export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      finalProduct: {}
    };
  }


  getFinalProduct(product, sizes) {
    const finalProduct = JSON.parse(JSON.stringify(product));

    if (!product.hasOwnProperty('qtty')) {
      finalProduct.qtty = 1;
    }
    if (!product.hasOwnProperty('sizes')) {
      finalProduct.sizes = sizes.length > 0 && sizes;
    };

    finalProduct.attributes.map(attribute => {
      let i = 0;
      attribute.items.map(item => {
        if (i === 0) {
          item.selected = true;
        } else { item.selected = false; }
        i++;
        return item;
      })
      return attribute;
    })
    finalProduct.sizes = finalProduct.attributes;
    return finalProduct;
  }


  render() {
    const {
      isOutOfStock, title, price, currency,
      mainImage, id, product, onAdd
    } = this.props;
    const { sizes } = this.state;
    const finalProduct = this.getFinalProduct(product, sizes);


    return (

      <Link to={`/product-details/${id}`} >
        <div className={`card ${isOutOfStock ? 'semi-transparent' : 'opaque'}`} >
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
            onClick={(e) =>
              e.preventDefault(onAdd(finalProduct))
            }
          />
          <p className='productTile'>{product.brand} {title}</p>
          <p className='productPrice'>{currency}{price}</p>
        </div>
      </Link>
    )
  }
}