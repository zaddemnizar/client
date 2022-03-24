// PDP - product description page, a.k.a. product page
import React, { Component } from 'react';
import { fetchProduct } from '../api/store';
import { connect } from 'react-redux';
import { addProduct } from '../Redux/actions/actions';
import { usingRouter } from '../usingRouter';
import { Size } from '../components/Size';
import parse from 'html-react-parser';
import styles from './styles.css';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      sizes: [],
      currentImage: '',
      isDisabled: true
    }
  }

  async componentDidMount() {
    const { id } = this.props.params;
    await fetchProduct(id).then(data => {

      let finalData = JSON.parse(JSON.stringify(data));
      finalData.data.product.attributes.map(attribute => {
        attribute.items.map(item => {
          item.selected = false;
          return item;
        })
        return attribute;
      })
      finalData.data.product.sizes = finalData.data.product.attributes;

      this.setState(prev => ({
        ...prev,
        product: finalData.data.product,
        currentImage: finalData.data.product.gallery[0],
        sizes: finalData.data.product.attributes
      }))
      if (this.state.sizes.length === 0) {
        this.setState(prev => ({
          ...prev,
          isDisabled: false
        }))
      }
    })
  }

  filterPrice(prices, currency) {
    return prices.filter(element => element.currency.symbol === currency)
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

  setSize(name, size, product) {
    product.attributes.map(element => {
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

  checkAttributes() {
    let { sizes } = this.state;
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

  render() {
    const { currency, addProd } = this.props;
    const { product, currentImage, sizes, isDisabled } = this.state;
    const { prices, name, brand, description, inStock } = product;
    const price = prices && this.filterPrice(prices, currency);
    const finalProduct = this.getFinalProduct(product, sizes);
    const images = product.gallery;

    return product && (
      <div className='productWrapper'>
        <div className='smallImages'>
          {images && images.map((image, i) => (
            <img
              key={i}
              src={image}
              className={currentImage === image ? "border" : ""}
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
          <h2 className='productName'>{brand}</h2>
          <p className='productBrand'>{name}</p>
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
                          <Size
                            key={item.value}
                            backgroundColor={size.name === 'Color' ? item.value : item.selected && "#1D1F22"}
                            scale={size.name === 'Color' && item.selected ? "scale(0.8)" : ""}
                            className={`productSize ${item.selected ? 'size' : ''}`}
                            onClick={() => this.setSize(size.name, item.value, product)}
                          >
                            {size.name !== 'Color' && item.value}
                          </Size>
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
            className={`productBtn ${(isDisabled || !inStock) ? '' : 'green'}`}
            onClick={() => addProd(finalProduct)}
          >
            {!inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
          <div className='productDescription'>
            {parse(`${description}`)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProd: (product) => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(usingRouter(PDP));