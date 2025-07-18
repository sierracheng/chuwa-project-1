import React, { useState, useEffect, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, ProductButton, QuantityInput } from "../../components/";
import "./ProductDetailPage.css"
import { findProductAPI } from "../../back-end/APITesting/Product";
import { increment, decrement, setQuantity } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";



interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
}

export const ProductDetailPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) return;

        async function loadProduct() {
            setLoading(true);

            const res = await findProductAPI(id!);

            if (res.success) {
                setProduct(res.data.product as Product);
                setError(null);

            } else {
                console.error(res.error);
                setError("Failed to load product");
            }
            setLoading(false);

        }

        loadProduct();
    }, [name]);



    const handleEditOnClick = () => {
        navigate(`/edit-product?id=${id}`);
    };

    const { role } = useAppSelector((state) => ({
        role: state.authenticate.role,
    }));

    const dispatch = useAppDispatch();
    const { productsInCart } = useAppSelector((state) => ({
        productsInCart: state.cart.productsInCart,
    }));

    const qty = product ? (productsInCart[product._id]?.quantity || 0) : 0

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && product) {
            dispatch(setQuantity({ id: product._id, quantity: value }));
        }
    };

    if (loading) return <p>Loading product…</p>;
    if (error || !product) return <p>{error ?? "Product not found."}</p>;



    return (
        <div className="product-detail-wapper">
            <h1 className="product-detail-title">Product Detail</h1>
            <Card className="product-detail-card">
                {loading ? <p>Loading product…</p> :
                    <div className="product-content-container">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="product-detail-image"
                        />
                        <div className="product-detail-info">
                            <p className="product-category">{product.category}</p>
                            <h2 className="product-name">{product.name}</h2>
                            <div className="product-price-status">
                                <span className="product-price">${product.price}</span>
                                {product.stock <= 0 && <span className="out-of-stock">Out of Stock</span>}
                            </div>
                            <p className="product-description">{product.description}</p>
                            <div className="flex flex-row gap-5 w-3/4 mt-6">
                                {(!productsInCart[product._id] || qty === 0) ? (
                                    <ProductButton buttonText="Add to Cart" handleClick={() => {
                                        dispatch(increment({
                                            id: product._id,
                                            price: product.price,
                                            name: product.name,
                                            imageUrl: product.imageUrl,
                                        }))
                                    }}></ProductButton>
                                ) : (
                                    <div className="text-white w-[133px] h-[40px] bg-[#5d30ff] flex items-center justify-center px-2">
                                        <ProductButton 
                                        className="w-1/3 h-full flex items-center justify-center"
                                        buttonText="-" handleClick={() => {
                                            dispatch(decrement({
                                                id: product._id
                                            }))
                                        }}></ProductButton>
                                        <QuantityInput
                                            value={qty}
                                            className="w-1/3 h-full bg-transparent"
                                            onChange={(newQty) =>
                                                dispatch(setQuantity({ id: product._id, quantity: newQty }))
                                            }
                                        />
                                        {/* <span className="px-4 py-2">{productsInCart[product._id].quantity}</span> */}
                                        <ProductButton 
                                        className="w-1/3 h-full flex items-center justify-center"
                                        buttonText="+" 
                                        handleClick={() => {
                                            dispatch(increment({
                                                id: product._id,
                                                price: product.price,
                                                name: product.name,
                                                imageUrl: product.imageUrl,
                                            }))
                                        }}></ProductButton>
                                    </div>)
                                }
                                {role === "Admin" &&
                                    <ProductButton buttonText="Edit" handleClick={handleEditOnClick}></ProductButton>
                                }
                            </div>
                        </div>

                    </div>}
            </Card>
        </div>
    )
}