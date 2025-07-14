import ItemCard from "../../components/ItemCard";
import { useCallback, useEffect, useState } from "react";
import { getAllProductAPI } from "../../back-end/APITesting/Product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setCurrentPage,
  setProducts,
  setSortOption,
  setTotalPages,
} from "../../features/products/productSlice";
import PageSelector from "../../components/PageSelector";
import { useNavigate, useSearchParams } from "react-router-dom";

export const HomePage = () => {
  // Redux State Management
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const sortOption = useAppSelector((state) => state.products.sortOption);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Handle sort change
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const option = e.target.value;
      const params = new URLSearchParams(searchParams);
      params.set("sort", option);
      navigate(`?${params.toString()}`);
      dispatch(setSortOption(option));
      fetchProducts(currentPage, option);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, navigate, dispatch, currentPage]
  );

  // Fetch products from database
  const fetchProducts = useCallback(
    async (page: number, sort: string) => {
      try {
        setLoading(true);
        setError(null);
        const allProducts = await getAllProductAPI(page, 10, sort);
        dispatch(setProducts(allProducts.data.products));
        dispatch(setTotalPages(allProducts.data.pages));
      } catch (error) {
        setError("Cannot get all products.");
        console.error(
          "Homepage while calling GET all product api error: ",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Fetch product again when user click diffent pages
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const sort = searchParams.get("sort") || "lastAdded";

    dispatch(setCurrentPage(page));
    dispatch(setSortOption(sort));
    fetchProducts(page, sort);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchParams, sortOption]);

  if (loading) {
    return <div>Loading...</div>;
  }
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
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border rounded-md px-3 py-2.5 text-gray-700 font-semibold"
            >
              <option value="lastAdded">Last added</option>
              <option value="priceUp">Price: low to high</option>
              <option value="priceDown">Price: high to low</option>
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
