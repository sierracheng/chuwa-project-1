import { useNavigate } from "react-router-dom";
import type { IProduct } from "../back-end/models/Product";
import { increment, decrement } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import React from "react";

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
        <div className="flex flex-col min-[1771px]:flex-row justify-between gap-1 w-full">
          {!productsInCart[id] || productsInCart[id].quantity === 0 ? (
            <button
              onClick={() =>
                dispatch(increment({ id: id, price: product.price }))
              }
              className="text-white !flex-1"
            >
              Add
            </button>
          ) : (
            <div className="flex flex-row  flex-wrap justify-between items-center flex-1 border rounded border-gray-300 bg-[#5d30ff] text-white px-2">
              <button
                onClick={() => dispatch(decrement({ id: id }))}
                className="flex-1 min-w-0 bg-[#5d30ff] text-white py-1 text-sm"
              >
                -
              </button>
              <span className="flex flex-row items-center justify-between  min-w-0  bg-[#5d30ff] text-white px-2">
                {productsInCart[id].quantity}
              </span>
              <button
                onClick={() =>
                  dispatch(increment({ id: id, price: product.price }))
                }
                className="flex-1 min-w-0 bg-[#5d30ff] text-white py-1 text-sm "
              >
                +
              </button>
            </div>
          )}
          {role === "Admin" && (
            <button className="!bg-white !border !border-gray-300 !flex-1">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ItemCard);
