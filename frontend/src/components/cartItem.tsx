import React, { useState, useEffect} from "react";
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
    const { productId, quantity} = props.data
    const [productDetail, setProductDetail] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3333/api/products/${productId}`)
                setProductDetail(response.data)
            }catch (err){
                setError("Error while finding products.")
            }
        }
        fetchProduct()
    }, [productId])

    const handleCreateOrder = async () => {
        try {
            const orderData = {
                productId,
                quantity
            }
            const response = await axios.post('http://localhost:3333/api/orders/create', orderData)
            console.log("Order created successfully:", response.data);
            alert("Order created successfully")
        }catch (err){
            setError("Error while finding products.")
        }
        if(error){
            return <div>{error}</div>
        }
    }

    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
             quantity: quantity -1}))
    }

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
             quantity: quantity +1}))
    }
    return (
        <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
            <img src={productDetail?.imageUrl || ""} alt="" className="w-10" />
            <h3>{productDetail?.name}</h3>
            <p>Price: ${(productDetail?.price * quantity).toFixed(2)}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={handleMinusQuantity}>-</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex gap-2 z-10" onClick={handlePlusQuantity}>+</button>
            <button onClick={handleCreateOrder}>Create Order</button>
        </div>
    )
}

export default CartItem
