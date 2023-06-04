import './index.css'

const CartTotalAmount = props => {
  const {cartLength} = props
  const totalAmountFun = () => {
    let totalAmount = 0
    cartLength.forEach(eachItem => {
      totalAmount += eachItem.price * eachItem.quantity
    })
    console.log(totalAmount)
    return totalAmount
  }
  return (
    <div className="show-total-card">
      <h1 className="card-amount">
        Order Total:
        <span className="amount"> {totalAmountFun()}</span> Rs
      </h1>
      <p className="total-products">{cartLength.length} Item in cart</p>
      <button className="check-btn" type="button">
        Checkout
      </button>
    </div>
  )
}

export default CartTotalAmount
