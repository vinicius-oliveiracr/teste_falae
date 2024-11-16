import { prisma } from "../database/prisma-client";
import { Order, OrderCreate, OrderRepository } from "../interfaces/order.interface";
import { OrderRepositoryPrisma } from "../repositories/order.repository";

export class OrderUseCase {
    private orderRepository: OrderRepository

    constructor(){
        this.orderRepository = new OrderRepositoryPrisma();
    }

    async create(data: OrderCreate): Promise<Order> {

        if (!data.items || data.items.length === 0) {
            throw new Error("Order must have at least one item")
        }
        const result = await this.orderRepository.create(data)
        return result
    }
    
    async getOrders(): Promise<Order[]> {
        const result = await this.orderRepository.getOrders()
        return result
    }

    async getOrderById(id: string): Promise<Order | null> {
        return await prisma.order.findUnique({
            where: {
                orderId: id},
                include:{
                    OrderItem:{
                        include:{
                            product: {
                                select: {name: true, price: true}
                            }
                        }
                    }
                }
        })
    }

   async updateOrder(id: string, order: OrderCreate): Promise<Order | null> {
        return await prisma.order.update({
            where: {
                orderId: id,
            },
            data:{
                totalPrice: order.totalPrice,
                userId: order.userId,
                status: order.status,
                createdAt: order.createdAt
            },
            include:{
                OrderItem: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }

}