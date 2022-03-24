import { gql } from "@apollo/client";

export const CATEGORY_PRODUCTS = gql`
query all($category: String!){
  category(input: { title: $category}) {
    name
    products {
      id
			name
			inStock
			gallery
      description
      brand
      attributes {
        name
        type
        items {
          id
          value
        }
      }
			prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
}
`

export const ALL_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`

export const ALL_CATEGORIES = gql`
query {
  categories {
    name
  }
}
`
export const PRODUCT = gql`
query Product($id: String!){
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        value
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`