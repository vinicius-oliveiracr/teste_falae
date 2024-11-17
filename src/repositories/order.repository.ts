import { prisma } from "../database/prisma-client";
import { Order, OrderCreate, OrderRepository } from "../interfaces/order.interface";

class OrderRepositoryPrisma implements OrderRepository{
    async create(order: OrderCreate): Promise<Order> {

        const userExists = await prisma.user.findUnique({
            where: {
                id: order.userId
            },
        })
        if (!userExists) {
            throw new Error(`User with id ${order.userId} not found`)
        }

        for (const item of order.items){
            const productExists = await prisma.product.findUnique({
                where: {
                    id: item.productId
                },
            })
            if (!productExists) {
                throw new Error(`Product with id ${item.productId} not found`)
            }
        }
        const result = await prisma.order.create({
            data: {
                totalPrice: order.totalPrice,
                userId: order.userId,
                status: order.status,
                createdAt: order.createdAt,
                OrderItem: {
                    create: order.items.map(item => ({
                      productId: item.productId,
                      quantity: item.quantity,
                    })),
                  },
                },
                include: { OrderItem: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                price: true
                            }
                        }
                    }
                } },
              });
              return result
    }

    async getOrders(): Promise<Order[]> {
        const result = await prisma.order.findMany({
            include: { OrderItem: {
                include: {
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            } },
        })
        return result
    }

    async getOrderById(id: string): Promise<Order | null> {
        const result = await prisma.order.findUnique({
            where: {
                orderId: id
            },
            include: { OrderItem: {
                include: {
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            } },
        })
        return result
    }

    async updateOrder(id: string, order: OrderCreate): Promise<Order | null> {
        const result = await prisma.order.update({
            where: {
                orderId: id,
            },
            data: {
                totalPrice: order.totalPrice,
                userId: order.userId,
                status: order.status,
                createdAt: order.createdAt,
                OrderItem: {
                    deleteMany: {},
                    create: order.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                OrderItem: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    
        return result;
    }

    async deleteOrder(id: string): Promise<Boolean> {
        const order = await prisma.order.findUnique({
            where: {
                orderId: id
            }
        })

        if(!order){
            throw new Error ("Order not found.")
        }

        await prisma.orderItem.deleteMany({
            where: {
                orderId: id
            }
        })

        await prisma.order.delete({
            where: {
                orderId: id
            }
        })
        return true
    }
}

export { OrderRepositoryPrisma }