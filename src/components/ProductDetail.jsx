import React, { Component } from 'react';
import parse from 'html-react-parser';
import styles from './styles.css';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sizes: [],
      currentImage: '',
      isDisabled: true
    };
  };

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.product).length !== 0
      && this.state.isDisabled === true) {
      this.checkAttributes();
    }
    if (this.state.currentImage === '') {
      this.setState(prev => ({
        ...prev,
        currentImage: this.props.images[0],
        sizes: this.props.product.attributes
      }))
      return true;
    }
  }

  checkAttributes() {
    let sizes = this.state.sizes;
    const sizesLength = sizes.length;
    let selectedCount = 0;
    sizes.map(size => {
      return size.items.map(item => item.selected && ++selectedCount)
    });
    if (sizesLength === selectedCount) {
      this.setState(prev => ({
        ...prev,
        isDisabled: false
      }))
    }
  }

  setSize(name, size, product) {
    product.sizes.map(element => {
      element.items.map(item => {
        if (item.value === size && name === element.name) {
          item.selected = true;
        }
        if (name === element.name && item.value !== size) {
          item.selected = false;
        }
        return item;
      })
      return element;
    });
    this.checkAttributes();
    this.setState(prev => ({
      ...prev,
      sizes: product.sizes,
    }))
  }

  getFinalProduct(product, sizes) {
    const finalProduct = JSON.parse(JSON.stringify(product));

    if (!product.hasOwnProperty('qtty')) {
      finalProduct.qtty = 1;
    }

    if (!product.hasOwnProperty('sizes')) {
      finalProduct.sizes = sizes.length > 0 && sizes;
    };

    return finalProduct;
  }

  filterPrice(prices, currency) {
    return prices.filter(element => element.currency.symbol === currency)
  }

  makeStyle(name, value, selected) {
    return {
      backgroundColor: name === 'Color' ? value : selected && "#1D1F22",
      transform: name === 'Color' && selected && "scale(0.8)",
      width: name === 'Capacity' && '63px',
      color: name === 'capacity' && "#FFFFFF",
    }
  }

  render() {

    const { currentImage, sizes, isDisabled } = this.state;
    const { product, images, currency, onAdd } = this.props;

    const { prices, name, brand, description, inStock } = product;

    const price = prices && this.filterPrice(prices, currency);

    const finalProduct = this.getFinalProduct(product, sizes);

    return (
      <>
        {product && (
          <div className='productWrapper'>
            <div className='smallImages'>
              {images && images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  style={{ border: currentImage === image ? "1px solid black" : "none" }}
                  onClick={() => this.setState((prev) => ({
                    ...prev,
                    currentImage: image
                  }))}
                  alt='Product img'
                />
              ))}
            </div>
            <div className='bigImage'>
              <img
                src={currentImage}
                alt='Product img'
              />
            </div>
            <div className='productBlock'>
              <h2 className='productName'>{name}</h2>
              <p className='productBrand'>{brand}</p>
              <div className='productSizes'>
                <div className='productSizesWrapper'>
                  {sizes && sizes.length === 0 && <p className='without'>Without attributes</p>}
                  {
                    sizes.length > 0 &&
                    sizes.map(size => {
                      return (
                        <div key={Math.random() * 12}>
                          <p>{size.name}:</p>
                          <div className='sizesWrapper'>
                            {size.items.map(item => (
                              <div
                                key={item.value}
                                style={this.makeStyle(size.name, item.value, item.selected)}
                                className={`productSize ${item.selected ? 'size' : ''}`}
                                onClick={() => this.setSize(size.name, item.value, product)}
                              >
                                {size.name !== 'Color' && item.value}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='productPrice'>
                <p>PRICE:</p>
                <span>{price && price[0].currency.symbol}{price && price[0].amount}</span>
              </div>
              <button
                disabled={!inStock || isDisabled}
                className={`productBtn ${isDisabled ? '' : 'green'}`}
                onClick={() => onAdd(finalProduct)}
              >
                {!inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
              <div className='productDescription'>
                {parse(`${description}`)}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}