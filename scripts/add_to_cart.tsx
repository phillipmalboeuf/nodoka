
import * as React from 'react'
import { CartContext } from './contexts/cart'



interface Props {
  id: string
}
interface State {}

export class AddToCart extends React.Component<Props, State> {
  static contextType = CartContext
  context!: React.ContextType<typeof CartContext>

  render() {
    return <button className='button--transparent slight' onClick={e => this.context.add(this.props.id, 1)}>Add to cart ↗</button>
  }
}