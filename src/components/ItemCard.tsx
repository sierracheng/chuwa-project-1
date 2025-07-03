const ItemCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg py-6 px-4 flex flex-col">
      <div className="w-full h-48 bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&hei=1058&fmt=jpeg&qlt=90&.v=1567022175704"
          alt="iPhone 11"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-gray-600">Apple iPhone 11, 128G</div>
      <div className="text-lg font-bold py-1">$499.00</div>

      <div className="flex flex-row justify-between gap-1 w-full">
        <button className="text-white !flex-1">Add</button>
        <button className="!bg-white !border !border-gray-300 !flex-1">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
