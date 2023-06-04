import EmptyCartView from '../EmptyCartView'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import CartTotalAmount from '../CartTotalAmount'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {deleteAllCartItems, cartList} = value
      const onClickRemove = () => deleteAllCartItems()

      const renderCartItems = () => (
        <div className="cart-container">
          <div className="cart-content-container">
            <div className="cart-header-card">
              <h1 className="cart-heading">My Cart</h1>
              <button
                className="remove-all-btn"
                type="button"
                onClick={onClickRemove}
              >
                Remove All
              </button>
            </div>
            <CartListView />
            {cartList.length > 0 && <CartTotalAmount cartLength={cartList} />}
          </div>
        </div>
      )

      return (
        <>
          <Header />
          {cartList.length > 0 ? renderCartItems() : <EmptyCartView />}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
