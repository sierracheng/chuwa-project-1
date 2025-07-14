import type { IProduct } from "../back-end/models/Product";
import React from "react";
interface Props {
  product: IProduct;
}

const ItemCard = ({ product }: Props) => {
  return (
    <div className="border border-gray-300 rounded-lg py-6 px-4 flex flex-col justify-between">
      <div className="w-full h-48 bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
        <img
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

        <div className="flex flex-row justify-between gap-1 w-full">
          <button className="text-white !flex-1">Add</button>
          <button className="!bg-white !border !border-gray-300 !flex-1">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ItemCard);
