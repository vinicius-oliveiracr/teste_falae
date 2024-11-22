import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import shoppingCart from "../assets/images/shopping_cart.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleStatusTab } from "../store/cart";


const Header: React.FC = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector((store:RootState) => store.cart.items)
    const dispatch = useDispatch()
    useEffect (() => {
        let total = 0;
        carts.forEach((item: { quantity: number; }) => {
            total += item.quantity
        })
        setTotalQuantity(total)
    })

    const handleOpenCartTab: React.MouseEventHandler<HTMLDivElement> = () => {
        dispatch(toggleStatusTab())
    }

    return (
        <header className='flex justify-between items-center mb-5'>
            <Link to = '/' className = 'text-xl font-semibold'>Home</Link>
            <Link to ="/orders" className = 'text-xl font-semibold'>Orders</Link>
            <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative' onClick={handleOpenCartTab}>
                <img src={shoppingCart} alt='' className='w-6' />
                <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{totalQuantity}</span>
            </div>
        </header>
    )
}

export default Header