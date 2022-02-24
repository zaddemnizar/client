import * as actions from "./actionsType";

export const addProduct = (product, qtty = 0) => {
  return {
    type: actions.ADD_PRODUCT,
    payload: { product, qtty }
  }
}

export const removeProduct = (product) => {
  return {
    type: actions.REMOVE_PRODUCT,
    payload: { product }
  }
}

export const currencyChange = symbol => {
  return {
    type: actions.CHANGE_CURRENCY,
    payload: { symbol }
  }
}