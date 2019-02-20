
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { CartContext } from './contexts/cart'

import { money } from './helpers/formatters'
import { Overlay } from './overlay'


interface Props {}
interface State {}

export class CartPopup extends Overlay {
  static contextType = CartContext
  context!: React.ContextType<typeof CartContext>

  constructor(props: Props) {
    super(props)
  }

  render() {
    return <>
      <a href='/cart' className='header__link' onClick={e => {
        e.preventDefault()
        this.toggle()
      }}>Your Cart ({money(this.context.cart.state.total_price)})</a>
      {this.state.visible
        ? <div className='overlay overlay--cart'>
          {/* <button className='button--transparent overlay__back' onClick={()=> this.hide()} /> */}
          <div className={`overlay__container`}>
            {/* <button className='button--transparent overlay__close' onClick={()=> this.hide()}>✕</button> */}
            <div className='grid grid--tight_guttered'>
              {this.context.cart.state.items && this.context.cart.state.items.map(item => <React.Fragment key={item.key}>
                <div className='col col--2of12'>
                  <a href={item.url}><img src={item.image} alt={item.title} /></a>
                </div>
                <div className='col col--7of12'>
                  {item.quantity}x <strong>{item.title}</strong>
                </div>
                <div className='col col--2of12'>
                  {money(item.price)}
                </div>
                <div className='col col--1of12 text_right'>
                  <button className='button--transparent' onClick={e => this.context.remove(item.key)}>✕</button>
                </div>
              </React.Fragment>)}
            </div>
            <div className='small_bottom' />
            <a href='/checkout' className='button button--full'>Proceed to checkout</a>
          </div>
        </div>
        : null}
    </>
  }
}