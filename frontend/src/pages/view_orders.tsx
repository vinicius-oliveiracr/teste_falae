import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/orderCard";

interface OrderProps {
    orderId: string;
    totalPrice: number;
    userId: number;
    status: string;
  }

const Orders: React.FC <OrderProps>= () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3333/api/orders/`);
                setOrders(response.data);
            } catch (err) {
                setError("Error while fetching orders.");  
            } finally {
                setLoading(false); 
            }
        };

        fetchOrders();
    }, []); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div>
            <h2>Orders</h2>
            <div>
                {orders.map((order) => (
                    <OrderCard
                        
                        orderId={order.orderId}
                        totalPrice={order.totalPrice}
                        userId={order.userId}
                        status={order.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;
