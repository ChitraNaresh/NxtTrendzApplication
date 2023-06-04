import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  deleteAllCartItems: () => {},
  decreaseBtn: () => {},
})

export default CartContext
