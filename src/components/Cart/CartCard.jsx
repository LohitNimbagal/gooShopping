import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {updateQty, removeFromCart} from '../../store/cartSlice'
import { useNavigate } from 'react-router-dom';

function CartCard({product}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(product.quantity)
    const currency = useSelector(state => state.currency)

    useEffect(() => {
        dispatch(updateQty({id: product.item.id, quantity: quantity })) 
    }, [quantity])

    const hadelCardClick = () => {
        console.log(product);
        navigate(`/product/${product.item.id}`)
      }

  return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" onClick={hadelCardClick}>
                <img src={product.item.images[0]} alt={product.item.title} className='size-36 object-scale-down' />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{product.item.title}</h2>
                <p className="mt-1 text-xs text-gray-700">{product.item.brand}</p>
                {/* <p className="mt-1 text-xs text-gray-700">{product.item.discountPercentage} % off /-</p> */}
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => setQuantity(preValue => preValue <= 1 ? preValue : preValue - 1)}> - </span>
                    <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" value={quantity} readOnly /> 
                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => setQuantity(preValue => preValue >= 5 ? preValue : preValue + 1)}> + </span>
                </div>
                <div className="flex items-center space-x-4">
                    <p className="text-sm">
                    {Intl.NumberFormat(currency.countryCode.toUpperCase()).format(product.item.price * Math.floor(currency.countryRate))} {currency.countryCode.toUpperCase()}
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" 
                    onClick={() => {
                        dispatch(removeFromCart(product.item))
                    }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                </div>
        </div>
        </div>
  )
}

export default CartCard