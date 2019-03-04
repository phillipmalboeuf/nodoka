
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { CartContext } from './contexts/cart'

import { money } from './helpers/formatters'
import { Overlay } from './overlay'
import { Picture } from './picture'


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
      <a href='/cart' className='header__link hide_on_tablet_portrait' onClick={e => {
        e.preventDefault()
        this.toggle()
      }}>
        Your Cart ({money(this.context.cart.state.total_price)})
      </a>
      <a href='/cart' className='header__link tablet_portrait_only'>
        <svg className='icon icon--cart' width="15px" height="14px" viewBox="0 0 15 14">
          <g transform="translate(-1, -2)">
          <path d="M12.0522727,7.14857745 L9.06590909,2.30979979 C8.93636364,2.1032666 8.71818182,2 8.5,2 C8.28181818,2 8.06363636,2.1032666 7.93409091,2.31717597 L4.94772727,7.14857745 L1.68181818,7.14857745 C1.30681818,7.14857745 1,7.4805058 1,7.886196 C1,7.95258166 1.00681818,8.01896733 1.02727273,8.085353 L2.75909091,14.9230769 C2.91590909,15.5426765 3.44090909,16 4.06818182,16 L12.9318182,16 C13.5590909,16 14.0840909,15.5426765 14.2477273,14.9230769 L15.9795455,8.085353 L16,7.886196 C16,7.4805058 15.6931818,7.14857745 15.3181818,7.14857745 L12.0522727,7.14857745 Z M6.45454545,7.14857745 L8.5,3.90305585 L10.5454545,7.14857745 L6.45454545,7.14857745 Z"></path>
          </g>
        </svg>&nbsp;({this.context.cart.state.item_count})
      </a>
      {this.state.visible
        ? <div className='overlay overlay--cart'>
          {/* <button className='button--transparent overlay__back' onClick={()=> this.hide()} /> */}
          <div className={`overlay__container`}>
            {/* <button className='button--transparent overlay__close' onClick={()=> this.hide()}>✕</button> */}
            <div className='grid grid--tight_guttered'>
              {this.context.cart.state.items && this.context.cart.state.items.map(item => <React.Fragment key={item.key}>
                <div className='col col--2of12'>
                  <a href={item.url}><Picture src={item.image} alt={item.title} small /></a>
                </div>
                <div className='col col--7of12'>
                  {item.quantity}x <strong>{item.title}</strong>
                </div>
                <div className='col col--2of12'>
                  {money(item.line_price)}
                </div>
                <div className='col col--1of12 text_right'>
                  <button className='button--transparent' onClick={e => this.context.remove(item.key)}>✕</button>
                </div>
              </React.Fragment>)}
            </div>
            <div className='small_bottom' />
            <a href='/checkout' className='button button--full'  data-turbolinks='false'>Proceed to checkout</a>
          </div>
        </div>
        : null}
    </>
  }
}