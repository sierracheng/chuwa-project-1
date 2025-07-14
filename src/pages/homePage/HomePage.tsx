import ItemCard from "../../components/ItemCard";
import { useEffect, useState } from "react";
import { getAllProductAPI } from "../../back-end/APITesting/Product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setProducts,
  setTotalPages,
} from "../../features/products/productSlice";
import PageSelector from "../../components/PageSelector";

export const HomePage = () => {
  // Redux State Management
  const dispatch = useAppDispatch();
  const { products, currentPage } = useAppSelector((state) => ({
    products: state.products.products,
    currentPage: state.products.currentPage,
  }));

  const [error, setError] = useState<string | null>(null);

  // Fetch products from database
  const fetchProducts = async (page: number) => {
    try {
      const allProducts = await getAllProductAPI(page, 10);
      dispatch(setProducts(allProducts.data.products));
      dispatch(setTotalPages(allProducts.data.pages));
    } catch (error) {
      setError("Cannot get all products.");
      console.error(
        "Homepage while calling GET all product api error: ",
        error
      );
    }
  };

  // Fetch product again when user click diffent pages
  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Handle Error at front-end page
  if (error) {
    return <div>Error: {error}</div>;
  }

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

      {/* Item Card */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((item) => (
          <ItemCard key={item._id.toString()} product={item} />
        ))}
      </div>

      {/* Page Selector */}
      <PageSelector />
    </div>
  );
};
