
import * as React from 'react'
import { CartContext } from './contexts/cart'



interface Props {
  id: string,
  quantity?: boolean
}
interface State {}

export class AddToCart extends React.Component<Props, State> {
  static contextType = CartContext
  context!: React.ContextType<typeof CartContext>

  public quantity: HTMLInputElement

  render() {
    return this.props.quantity ?
      <div className='grid grid--guttered grid--bottom'>
        <div className='col col--3of12'>
          <label htmlFor='quantity'>Quantity</label>
          <input className='input--medium' type='number' min='1' id='quantity' ref={element => this.quantity = element} defaultValue='1' />
        </div>
        <div className='col col--9of12'>
          <button className='button--corner slight' onClick={e => this.context.add(this.props.id, this.quantity.valueAsNumber)}>Add to cart ↗</button>
        </div>
      </div>
    : <button className='button--transparent slight' onClick={e => this.context.add(this.props.id, 1)}>Add to cart ↗</button>
  }
}