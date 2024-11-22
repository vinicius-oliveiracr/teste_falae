import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartItem from "../components/cartItem";
import axios from "axios";

interface CartItem {
    productId: number;
    quantity: number;
    image?: string;
    name?: string;
}

const CartTab: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const carts = useSelector((store: RootState) => store.cart.items) as CartItem[];
    const statusTab = useSelector((store: RootState) => store.cart.statuTab);

    const handleCreateOrder = async () => {
        try {
            const orderData = { items: carts };
            const response = await axios.post("http://localhost:3333/api/orders/create", orderData);
            console.log("Order created successfully:", response.data);
            alert("Order created successfully");
        } catch (err) {
            alert("Error while creating the order.");
            setError("Error while creating the order.");
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-300 ${
                statusTab === false ? "translate-x-full" : "translate-x-0"
            }`}
        >
            <h2 className="text-white text-xl p-4 border-b border-gray-600">Cart</h2>

            <div className="p-5 overflow-y-auto">
                {carts.map((item: CartItem) => (
                    <CartItem key={item.productId} data={item} />
                ))}
            </div>

            <div className="p-4 border-t border-gray-600">
                <button
                    onClick={handleCreateOrder}
                    className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-700"
                >
                    Create Order
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
        </div>
    );
};

export default CartTab;
