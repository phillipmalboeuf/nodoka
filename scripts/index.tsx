console.log('Nodoka')

import 'normalize.css'
import '../styles/styles'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter, Route, StaticRouter, RouteComponentProps } from 'react-router-dom'
import * as Turbolinks from 'turbolinks'

import { CartContext } from './contexts/cart'
import { Cart } from './helpers/cart'

import { CartPopup } from './cart_popup'
import { AddToCart } from './add_to_cart'


interface Props {}
interface State {
  cart: any,
  path: string
}

export class App extends React.Component<Props, State> {

  public router: BrowserRouter
  private popup: CartPopup

  constructor(props: Props) {
    super(props)
    this.state = {
      cart: new Cart(JSON.parse(document.getElementById('cart').getAttribute('data-cart'))),
      path: location.pathname
    }
  }

  componentDidMount() {
  }

  addToCartElement(element: Element) {
    return ReactDOM.createPortal(<AddToCart id={element.getAttribute('data-product')} />, element)
  }

  render() {
    return <StaticRouter location={this.state.path} context={{}}>
      <CartContext.Provider value={{
        cart: this.state.cart,
        add: (id, quantity)=> {
          this.state.cart.add(id, quantity).then((cart: Cart)=> this.setState({ cart }))
          this.popup.show()
          return null
        },
        remove: (id)=> {
          this.state.cart.remove(id).then((cart: Cart)=> this.setState({ cart }))
          return null
        }
      }}>

        {ReactDOM.createPortal(<CartPopup ref={popup => this.popup = popup} />, document.getElementById('cart'))}

        <Route exact path='/products/:product'
          render={()=> this.addToCartElement(document.getElementById('add_to_cart'))} />
        <Route exact path='/collections/:collection/products/:product'
          render={()=> this.addToCartElement(document.getElementById('add_to_cart'))} />
        <Route exact path='/collections/:collection'
          render={()=> Array.from(document.querySelectorAll('[data-add-to-cart]')).map(element => this.addToCartElement(element))} />

      </CartContext.Provider>
    </StaticRouter>
  }
}

ReactDOM.render(<App ref={app => document.addEventListener("turbolinks:load", ()=> {
  app.setState({
    path: location.pathname
  })
})} />, document.getElementById('scripts'))



Turbolinks.start()