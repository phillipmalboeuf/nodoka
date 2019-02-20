import * as React from 'react'
import { Cart } from '../helpers/cart'

export const CartContext = React.createContext({
  cart: {} as Cart,
  add: (id: string, quantity: number)=> function(): void {},
  remove: (id: string)=> function(): void {}
})