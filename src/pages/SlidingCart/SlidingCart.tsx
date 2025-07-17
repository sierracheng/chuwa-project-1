import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { selectProductsInCart, selectTotal, increment, decrement, removeFromCart, clearCart } from '../../features/cart/cartSlice';
import { icons } from '../../constants/icons';

interface SlidingCartProps {
    onClose: () => void;
}
export const SlidingCart: React.FC<SlidingCartProps> = ({onClose}) => {
    const productsInCart = useSelector(selectProductsInCart);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();

    const cartItems = Object.values(productsInCart);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


    const subtotal = total.toFixed(2);
    const discount = 0; // Assuming no discount for now, can be set based on a discount code
    //Tax need change by location
    const tax = (total * 0.1).toFixed(2); 
    const estimateTotal = (total + parseFloat(tax) - discount).toFixed(2);

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex justify-end transition-opacity'>
            <div className='bg-white w-full sm:max-w-md md:h-200 lg:h-200 md:max-w-lg lg:max-w-xl h-full flex flex-col bg-white'>
                {/*Cart Header*/}
                <div className="bg-[#5d30ff] text-white p-4 py-5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                    <h2 className="text-3xl font-bold">Cart</h2>
                    <p className="font-semi-bold text-sm mt-2">({totalItems})</p>
                    </div>

                    <div className='flex items-center space-x-1'>
                    <button className="text-white !bg-transparent hover:underline text-sm" onClick={() => dispatch(clearCart())}>
                        Clear Cart
                    </button>
                    <button className="text-white !bg-transparent hover:underline font-bold" onClick={onClose}>
                        <span className="text-4xl">{icons.CLOSE}</span>
                    </button>
                    </div>
                </div>

            {/*Cart Items*/}
            <div className="flex-1 overflow-y-auto p-4 sm:max-h-none md:max-h-96">
                {cartItems.map((item) => (
                    <div key={item.id} className='flex items-start justify-between space-x-4 py-4'> 
                        {/* Image */}
                        {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                            No image
                        </div>
                        )}
                        {/* Name, quantity, remove */}
                        <div className='flex flex-col flex-1 justify-between'>
                            <p className='text-lg font-semibold'>{item.name}</p>
                            <div className='flex items-center space-x-2 mt-2'>
                                <button
                                onClick = {() => dispatch(decrement({ id: item.id }))}
                                className='w-6 h-6 rounded-full !bg-transparent border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-bold'>
                                    -
                                </button>
                                <span className='w-8 text-center'>{item.quantity}</span>
                                <button
                                onClick = {() => dispatch(increment({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }))}
                                className='w-6 h-6 rounded-full !bg-transparent border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-bold'>
                                    +
                                </button>
                            </div>
                        </div>
                    {/* Price */}
                    <div className='flex flex-col items-end space-y-2'>
                        <p className='text-lg font-semibold text-[#5d30ff]'>${item.price.toFixed(2)}</p>
                        <button 
                        onClick={() => dispatch(removeFromCart({ id: item.id }))}
                        className='text-gray-500 underline !bg-transparent hover:text-gray-800 transition-colors text-sm'>
                            Remove
                        </button>
                    </div>
                    </div>
                ))}
            </div>

            {/* Discount code */}
            <div className='p-4 border-t'>
                <h3 className='font-semibold mb-2'>Apply Discount Code</h3>
                <div className='flex space-x-2'>
                    <input type="text" placeholder="Enter discount code" className='border border-gray-300 px-3 py-2 rounded flex-1' />
                    <button className='bg-blue-600 text-white p-2 rounded mt-2'>Apply</button>
                </div>
            </div>

            {/* Cart Footer/Summary */}
            <div className='p-4 border-t'>
                <div className='space-y-2 mb-4'>
                    <div className='flex justify-between'>
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Tax</span>
                        <span>${tax}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Discount</span>
                        <span>${discount}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Estimate Total</span>
                        <span>${estimateTotal}</span>
                    </div>
                    <button className='bg-blue-600 text-white p-2 rounded mt-2 w-full hover:bg-blue-700 transition-colors font-semibold'>
                        Continue to checkout
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}

