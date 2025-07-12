import ItemCard from "../../components/ItemCard";
import { icons } from "../../constants/icons";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 p-6 w-full h-full ">
      <div className="flex justify-between items-center w-full h-full  md:flex-col lg:flex-row">
        {/* Put on left */}
        <div className="text-3xl font-bold md:py-4 lg:py-0">Products</div>

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
      {/* Page Selector */}
      <div className="flex flex-row gap-2 items-center sm:justify-center lg:justify-end">
        <button className="!bg-white">{icons.LEFT_ARROW}</button>
        {Array.from({ length: 5 }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => {}}
              className={`!bg-white px-4 py-2 border rounded`}
            >
              {pageNum}
            </button>
          );
        })}
        <button className="!bg-white">{icons.RIGHT_ARROW}</button>
      </div>
    </div>
  );
};
