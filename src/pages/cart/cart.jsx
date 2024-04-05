import React from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useEffect } from 'react'
import { Quantity } from '../../components/quantity'
import '../home/home.css'
import "./cart.css"

export const Cart = () => {
    const [cart, setCart] = useLocalStorageState('cart', {})

    const handleRemoveProduct = (productId) => {
        setCart((prevCart) => {
          const updatedCart = { ...prevCart }
          delete updatedCart[productId]
          return updatedCart
        })
      }
    
      const handleUpdateQuantity = (productId, operation) => {
        setCart((prevCart) => {
          const updatedCart = { ...prevCart }
          if (updatedCart[productId]) {
            if (operation === 'increase') {
              updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity + 1 }
            } else {
              updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity - 1 }
            }
          }
          return updatedCart
        })
      }
    
      const getProducts = () => Object.values(cart || {})
      const totalPrice = getProducts().reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)
    


  return (
    <div className='shop'>
        <div className='title'>
            <h1>Cart</h1>
        </div>
      
        <div className='products'>
          {getProducts().map(product => (
            <div className="product">
              <div key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <div className='description'>
                  <p>
                    <h2>{product.title}</h2>
                  </p>
                  <p> <b> ${product.price} </b></p>
                  <div className='quantity'>
                    <Quantity
                      removeProductCallback={() => handleRemoveProduct(product.id)}
                      productId={product.id}
                      handleUpdateQuantity={handleUpdateQuantity} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='title'>
          <h3>Total Price: {totalPrice} </h3>
        </div>
  </div>
  )
}
