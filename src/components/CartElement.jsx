import React, { Component } from 'react';
import right from '../../src/right.svg';
import left from '../../src/left.svg';
import { Size } from './Size';


export default class CartElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentImage: '',
      currentImageIndex: 0,
      sizes: [],
      qtty: 1
    };

    this.setSize = this.setSize.bind(this);
    this.counter = this.counter.bind(this);
    this.setCurrentImage = this.setCurrentImage.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.state.currentImage === '') {
      this.setState(prev => ({
        ...prev,
        qtty: this.props.product && this.props.product.qtty,
        images: this.props.product && this.props.product.gallery,
        currentImage: this.props.product && this.props.product.gallery[0],
        sizes: this.props.product && this.props.product.attributes
      }))
    }
    if (this.props.product) {
      if (this.props.product.qtty !== this.state.qtty) {
        this.setState(prev => ({
          ...prev,
          qtty: this.props.product.qtty,
          sizes: this.props.product.sizes
        }))
      }
    }
  }

  counter(n) {
    if (n < 0) {
      return;
    }
    this.setState(prev => ({
      ...prev,
      qtty: n
    }))
  }

  setSize(name, size, sizes) {
    sizes.map(element => {
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

    this.setState(prev => ({
      ...prev,
      sizes: sizes
    }))
  }

  setCurrentImage(index) {
    const { images } = this.state;
    if (images.length > 0) {
      if (index < 0) {
        index = images.length - 1;
      }
      if (index > images.length - 1) {
        index = 0;
      }
      this.setState(prev => ({
        ...prev,
        currentImage: images[index],
        currentImageIndex: index
      }))
    }
  }

  getFinalProduct(product, sizes) {
    const finalProduct = JSON.parse(JSON.stringify(product));

    if (!product.hasOwnProperty('sizes')) {
      finalProduct.sizes = sizes;
    }

    return finalProduct;
  }

  makeStyle(name, small, selected, value) {
    return {
      backgroundColor: name === 'Color' && value,
      transform: name === 'Color' && selected && "scale(0.8)",
      width: name === 'Capacity' && !small && '60px',
      width: name === 'Capacity' && small && '50px'
    }
  }

  filterPrice(product, currency) {
    return product.prices.filter(element => element.currency.symbol === currency);
  }

  render() {
    const {
      currentImageIndex, sizes,
      currentImage, images, qtty
    } = this.state;
    const { small, product, currency, onAdd, onRemove } = this.props;
    const price = product && this.filterPrice(product, currency);

    const finalProduct = this.getFinalProduct(product, sizes)

    return (
      <>
        {!small && <hr className='line' />}
        {product && (<div className={`cart ${small ? 'small' : ''}`}>
          <div className={`cartBlock ${small ? 'small' : ''}`}>
            <div className='cartBlock1'>
              <h3 className={`cartElementHeader ${small ? 'small' : ''}`} > {product.name}</h3>
              <p className={`cartElementSubHeader ${small ? 'small' : ''}`}>{product.brand}</p>
              <p className={`cartElementPrice ${small ? 'small' : ''}`}><b> {price[0].currency.symbol}{price[0].amount}</b></p>
              <div >
                {sizes.length === 0 && <p className='without'>Without attributes</p>}
                {
                  sizes.length > 0 &&
                  sizes.map(attribute => {
                    return (
                      <div key={Math.random() * 12}>
                        <h3 className={`attribute ${small ? 'small' : ''}`}>{attribute.name !== 'Size' && attribute.name}</h3>
                        <div className='sizesWrapper'>
                          {attribute.items.map(item => (
                            <Size
                              key={item.value}
                              backgroundColor={attribute.name === 'Color' && item.value}
                              scale={attribute.name === 'Color' && item.selected ? "scale(0.8)" : ""}
                              className={`productSize ${small ? 'small' : ''} ${item.selected ? 'size' : ''}`}
                              onClick={() => !small && this.setSize(attribute.name, item.value, sizes)}
                            >
                              {attribute.name !== 'Color' && item.value}
                            </Size>
                          ))}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='cartBlock2'>
              <div>
                <div
                  className={`rectangleCounter ${small ? 'small' : ''}`}
                  onClick={() => onAdd(finalProduct)}
                >
                  +
                </div>
                <p className={`counteNumber ${small ? 'small' : ''}`}>{qtty}</p>
                <div
                  className={`rectangleCounter ${small ? 'small' : ''} ${qtty === 0 ? 'disabled' : ''}`}
                  onClick={() => onRemove(finalProduct)}
                >
                  -
                </div>
              </div>
              <div className='images'>
                <img
                  className={`itemImage ${small ? 'small' : ''}`}
                  src={currentImage.toString()}
                  alt='cart item img'
                />
                {
                  images.length > 1 && (
                    <>
                      <img
                        className={`left ${small ? 'hide' : ''}`}
                        src={left.toString()}
                        onClick={() => this.setCurrentImage(currentImageIndex - 1)}
                        alt='left'
                      />
                      <img
                        className={`right ${small ? 'hide' : ''}`}
                        src={right.toString()}
                        onClick={() => this.setCurrentImage(currentImageIndex + 1)}
                        alt='right'
                      />
                    </>
                  )
                }

              </div>
            </div>
          </div>
        </div>
        )
        }
      </>
    )
  }
}