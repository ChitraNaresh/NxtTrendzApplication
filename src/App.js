import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  increaseBtn = (product, cartList) => {
    const indexOfDuplicateObject = cartList.findIndex(eachUniqueItem => {
      if (eachUniqueItem.id === product.id) {
        console.log(1)
        return true
      }
      return false
    })
    if (indexOfDuplicateObject < 0) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    } else {
      const duplicateItem = cartList[indexOfDuplicateObject]
      duplicateItem.quantity += 1
      this.setState({cartList})
    }
  }

  addCartItem = product => {
    console.log(product)
    const {cartList} = this.state

    if (cartList.length < 1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.increaseBtn(product, cartList)
    }
  }

  decreaseBtn = itemId => {
    const {cartList} = this.state
    const indexOfDuplicateObject = cartList.findIndex(eachUniqueItem => {
      if (eachUniqueItem.id === itemId) {
        console.log(1)
        return true
      }
      return false
    })

    const indexItem = cartList[indexOfDuplicateObject]
    if (indexItem.quantity > 0) {
      indexItem.quantity -= 1
      this.setState({cartList})
    }
  }

  deleteCartItem = itemId => {
    const {cartList} = this.state
    const filteredList = cartList.filter(
      eachUniqueVal => eachUniqueVal.id !== itemId,
    )
    this.setState({cartList: filteredList})
  }

  deleteAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            deleteAllCartItems: this.deleteAllCartItems,
            decreaseBtn: this.decreaseBtn,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
