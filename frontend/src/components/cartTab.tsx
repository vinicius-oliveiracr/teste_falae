import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import  CartItem  from "../components/cartItem";


const CartTab: React.FC = () => {
    const carts = useSelector((store:RootState) => store.cart.items)
    const statusTab = useSelector((store:RootState) => store.cart.statuTab)
    return <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-300 ${
        statusTab === false ? "translate-x-full" : "translate-x-0"
    }`}>
        <h2>Cart</h2>
        <div className="p-5">
            {carts.map((item: { productId: any; quantity: any; }) => (
                <><CartItem key={item.productId} data={item} /><div key={item.productId} className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <img src={item.productId.image} alt="" className="w-20" />
                        <span className="ml-2">{item.productId.name}</span>
                    </div>
                    
                </div></>
            ))}
        </div>
    </div>
};

export default CartTab;