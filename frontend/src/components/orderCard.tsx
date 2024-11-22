import React from "react";

interface OrderCardProps{
    orderId: string
    totalPrice: number
    userId: number
    status: string
}
const OrderCard: React.FC <OrderCardProps>= ({orderId, totalPrice, userId, status}) => {


    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md mb-4">
          <div className="flex-1 ml-4">
            <h3 className="text-lg font-bold text-red-500">ID do pedido: {orderId}</h3>
            <p className="text-sm text-yellow-400">Valor total: {totalPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-300">User ID: {userId}</p>
            <p className="text-base font-semibold text-white mt-1">Status do pedido: {status}</p>
          </div>
        </div>
      );
    };

export default OrderCard