import ItemCard from "../../components/ItemCard";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 p-6 w-full h-full items-start">
      <div className="flex flex-row justify-between items-center w-full h-full">
        {/* Put on left */}
        <div className="text-3xl font-bold">Products</div>

        {/* Put on right */}
        <div className=" flex flex-row gap-5">
          <div className="flex items-center gap-2">
            <select className="border rounded-md px-3 py-2.5 text-gray-700 font-semibold">
              <option>Last added</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>
          <div>
            <button className="text-white">Add Product</button>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <ItemCard key={index} />
        ))}
      </div>
      <div>pages</div>
    </div>
  );
};
