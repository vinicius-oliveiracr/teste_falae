import { FastifyInstance } from "fastify";
import { OrderUseCase } from "../usecases/order.usecase";
import { OrderCreate, OrderRequestBody } from "../interfaces/order.interface";
import { prisma } from "../database/prisma-client";

export async function OrderRoutes(fastify: FastifyInstance){
    const orderUseCase = new OrderUseCase();

    fastify.post<{ Body: OrderRequestBody }>('/create', async (req, reply) => {
        const {userId, products} = req.body
        try{
            const totalPrice = await Promise.all(
                products.map(async(product) => {
                    const productExists = await prisma.product.findUnique({
                        where: {
                            id: product.productId
                        },
                    })
                    if (!productExists) {
                        throw new Error(`Product with id ${product.productId} not found`)
                    }
                    return productExists.price * product.quantity
                })
            ).then((prices) => prices.reduce((total, price) => total + price, 0))
            const data = await orderUseCase.create({
                userId,
                status: 'Pendente',
                createdAt: new Date(),
                totalPrice,
                items: products.map(product => ({
                    productId: product.productId,
                    quantity: product.quantity
                }))
            })
            reply.send(data)
        }
        catch(error){
            reply.code(500).send(error)
        }
    })

    fastify.get('/', async (req, reply) => {
        try {
            const orders = await orderUseCase.getOrders()
            reply.send(orders)
        }
        catch(error){
            reply.code(500).send(error)
        }
    })

    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {    
            const order = await orderUseCase.getOrderById(id);
            if (!order) {
                reply.code(404).send({ message: "Order not found." });
            }
            reply.send(order);
        } catch (error) {
            reply.code(500).send({ message: "Error while finding order.", error });
        }
    })

    fastify.put<{ Params: { id: string }; Body: OrderCreate }>('/:id', {
        schema: {
            body: {
                type: 'object',
                required: ['userId', 'status', 'createdAt', 'totalPrice', 'items'],
                properties: {
                    userId: { type: 'number' },
                    status: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    totalPrice: { type: 'number' },
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['productId', 'quantity'],
                            properties: {
                                productId: { type: 'number' },
                                quantity: { type: 'number' },
                            },
                        },
                    },
                },
            },
        },
    }, async (req, reply) => {
        const { id } = req.params;
        const { userId, status, createdAt, totalPrice, items } = req.body;
        try {
            const order = await orderUseCase.updateOrder(id, {
                userId,
                status,
                createdAt,
                totalPrice,
                items
            });
            if (!order) {
                reply.code(404).send({ message: "Order not found." });
            }
            reply.send(order);
        } catch (error) {
            reply.code(500).send({ message: "Error while updating order.", error });
        }
    })
}