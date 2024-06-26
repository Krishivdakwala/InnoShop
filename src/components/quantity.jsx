import { FunctionComponent, useState } from 'react'
import "./quantity.css"



  export const Quantity = ({ removeProductCallback, handleUpdateQuantity, productId }) => {
    const [value, setValue] = useState(1)
  
    const reduce = () => {
      handleUpdateQuantity(productId, 'decrease')
  
      setValue(prevState => {
        const updatedValue = prevState - 1
        if (updatedValue === 0) {
          removeProductCallback(productId)
        }
        return updatedValue
      })
    }
  
    const increase = () => {
      handleUpdateQuantity(productId, 'increase')
      setValue(prevState => prevState + 1)
    }
  
    return (
      <div className="quantifier">
        <input type="button" value="-" className="buttonMinus" onClick={reduce} />
        <input type="number"
               step="1"
               max=""
               value={value}
               onChange={e => setValue(parseInt(e.target.value))}
               className="quantityField"
                />
        <input type="button" value="+"  onClick={increase} className="buttonPlus" />
      </div>
    )
  }