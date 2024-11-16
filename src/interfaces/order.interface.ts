export interface Order{
    orderId: string
    totalPrice: number
    userId: number
    status: string
    createdAt: Date
    OrderItem: OrderItem[]
}

export interface OrderItem {
    quantity: number
    productId: number
}

export interface OrderCreate{
    totalPrice: number
    userId: number
    status: string
    items: OrderItem[]
    createdAt: Date
}

export interface OrderRequestBody {
    userId: number,
    products: OrderItem[]
}

export interface OrderRepository{
    create(order: OrderCreate): Promise<Order>
    getOrders(): Promise<Order[]>
    getOrderById(id: string): Promise<Order | null>
    updateOrder(id: string, order: OrderCreate): Promise<Order | null>

}