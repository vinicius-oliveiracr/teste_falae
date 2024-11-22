import React from "react";
import { Link } from "react-router-dom";

interface Order{
    orderId: string
    totalPrice: number
    userId: number
    status: string
}

const Order: React.FC<Order> = ({orderId, totalPrice, userId, status}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg mb-4">
            <Link to={`/product/${orderId}`} className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
            </Link>
            <div className="flex flex-col items-center sm:items-start sm:flex-1">
                <h3 className="text-lg font-bold text-red-800 text-center sm:text-left">{userId}</h3>
                <h3 className="text-sm text-yellow-600 text-center sm:text-left mb-4 truncate">
                    {totalPrice}
                </h3>
                <h3 className="text-lg font-medium text-center sm:text-left">{status}</h3>
            </div>
        </div>
    )
}

export default Order