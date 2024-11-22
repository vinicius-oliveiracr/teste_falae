import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart";

interface CartItemProps {
    data: {
        productId: number;
        quantity: number;
    };
}

const CartItem: React.FC<CartItemProps> = (props) => {
    const { productId, quantity } = props.data;
    const [productDetail, setProductDetail] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/api/products/${productId}`);
                setProductDetail(response.data);
            } catch (err) {
                setError("Error while finding products.");
            }
        };
        fetchProduct();
    }, [productId]);

    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    };

    return (
        <div>
            <img src={productDetail?.imageUrl || ""} alt={productDetail?.name || "Product"} className="w-10" />
            <h3>{productDetail?.name}</h3>
            <p>Price: ${(productDetail?.price * quantity).toFixed(2)}</p>
            <p>Quantity: {quantity}</p>
            
            <div className="flex space-x-2">
                <button 
                    onClick={handleMinusQuantity}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    -
                </button>

                <button
                    onClick={handlePlusQuantity}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    +
                </button>
            </div>

            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default CartItem;
