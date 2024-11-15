import { FastifyInstance } from "fastify";
import { ProductUseCase } from "../usecases/product.usecase"
import { Product, ProductCreate } from "../interfaces/product.interface";
import { prisma } from "../database/prisma-client";



export async function ProductRoutes(fastify: FastifyInstance){
    const productUseCase = new ProductUseCase();

    fastify.get('/',async (req, reply) => {
        try {
            const products = await productUseCase.getProducts()
            reply.send(products)
        }
        catch(error){
            reply.code(500).send({message:"Error while finding products.",error})
        }
    })

    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                return reply.code(400).send({ message: "Invalid ID format. ID must be a number." });
            }
    
            const product = await productUseCase.getOneProduct(numericId);
            if (product) {
                reply.send(product);
            } else {
                reply.code(404).send({ message: "Product not found." });
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            reply.code(500).send({ message: "Error while finding product.", error });
        }
    });
    
    fastify.post<{ Body: ProductCreate }>('/create', async (req, reply) => {
        const {name, price, category, description, imageUrl} = req.body
        try {
            const data = await productUseCase.create({
                name,
                price,
                category,
                description,
                imageUrl
            })
            return reply.send(data)
        }
        catch(error) {
            reply.code(500).send(error)
        }
    })

    fastify.put<{ Body: Product; Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        const {name, price, category, description, imageUrl} = req.body
        try{
            const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return reply.code(400).send({ message: "Invalid ID format. ID must be a number." });
        }
            const data = await productUseCase.updateProduct({
                id: numericId,
                name,
                price,
                category,
                description,
                imageUrl})
            return reply.send(data)
        }
        catch(error){
            reply.send(error)
        }
    })

    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try{
            const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return reply.code(400).send({ message: "Invalid ID format. ID must be a number." });
        }
            const data = await productUseCase.deleteProduct(numericId)
            return reply.send(data)
        }
        catch(error){
            reply.send(error)
        }
    })

}