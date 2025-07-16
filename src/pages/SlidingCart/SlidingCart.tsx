import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../features/cart/cartSlice';
import { icons } from '../../constants/icons';

export const SlidingCart: React.FC = ({onClose}) => {
    const [CartItem, setCartItem] = useState([]);
    const navigate = useNavigate();

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity'>
            {/*Cart Header*/}
            <div className="bg-blue-600 text-white p-4 items-center flex justify-between">
                <h2 className="text-lg font-bold">Cart</h2>
                <p className="font-semi-bold text-xs">({CartItem.length})</p>
                <button className="text-white hover:text-gray-200 transition-colors text-xl font-bold" onClick={onClose}>
                    {icons.CLOSE}
                </button>
            </div>

            {/*Cart Items*/}
            <div className="flex-1 overflow-y-auto p-4 sm:max-h-none md:max-h-96">
                {CartItem.map((CartItem) => (
                    <div key={CartItem.id}> 
                    <img src={CartItem.imageUrl} alt={CartItem.name} className="cart-item-image" />
                    <button
                    className='w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-bold'>
                        -
                    </button>
                    <span className='w-8 text-center'>{CartItem.quantity}</span>
                    <button
                    className='w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-bold'>
                        +
                    </button>
                    <button className='text-gray-500 underline hover:text-gray-800 transition-colors text-sm'>
                        Remove
                    </button>
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
    )
}

