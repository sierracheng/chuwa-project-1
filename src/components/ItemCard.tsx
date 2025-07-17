import { useNavigate } from "react-router-dom";
import type { IProduct } from "../back-end/models/Product";
import { increment, decrement } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import React, { useState } from "react";

interface Props {
  product: IProduct;
}

const ItemCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const handleItemOnClick = () => {
    navigate(`/product/${product._id}`);
  };
  const id = product._id.toString();


  const { role } = useAppSelector((state) => ({
    role: state.authenticate.role,
  }));
  const dispatch = useAppDispatch();
  const { productsInCart } = useAppSelector((state) => ({
    productsInCart: state.cart.productsInCart,
  }));

  return (
    <div className="border border-gray-300 rounded-lg py-6 px-4 flex flex-col justify-between">
      <div className="w-full h-48 bg-gray-100 rounded-t-lg mb-4 overflow-hidden cursor-pointer">
        <img
          onClick={handleItemOnClick}
          src={
            product.imageUrl === "/"
              ? "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&hei=1058&fmt=jpeg&qlt=90&.v=1567022175704"
              : product.imageUrl
          }
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-gray-600">{product.name}</div>
        <div className="text-lg font-bold py-1">${product.price}</div>

        {/* <div className="flex flex-row justify-between gap-1 w-full">
          <button className="text-white !flex-1">Add</button>
          <button className="!bg-white !border !border-gray-300 !flex-1">
            Edit
          </button>
        </div> */}
        <div className="flex flex-row justify-between gap-1 w-full">
          {(!productsInCart[id] || productsInCart[id].quantity === 0) ? (
            <button onClick={() => dispatch(increment({ id: id, price: product.price }))} className="text-white flex w-full h-[40px] items-center justify-center">
              Add to cart</button>) : (
            <div className="text-white w-full h-[40px] bg-[#5d30ff] flex items-center justify-center">
              <button onClick={() => dispatch(decrement({ id: id }))} className="text-white h-[40px] flex items-center justify-center">
                -
              </button>
              <span className="px-4 py-2">{productsInCart[id].quantity}</span>
              <button onClick={() => dispatch(increment({ id: id, price: product.price }))} className="text-white h-[40px] flex items-center justify-center">
                +
              </button>
            </div>)
          }
          {role === "Admin" &&
            <button className="!bg-white !border !border-gray-300 w-[133px] h-[40px] flex items-center justify-center">
              Edit
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default React.memo(ItemCard);
