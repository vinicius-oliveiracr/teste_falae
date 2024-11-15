import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";
import { prisma } from "../database/prisma-client";



export async function userRoutes(fastify: FastifyInstance){
    const userUseCase = new UserUseCase();

    fastify.get('/', (req, reply) => {
        reply.send("Hello world")
    }),
    
    fastify.post<{ Body: UserCreate }>('/register', async (req, reply) => {
        const {name, email, address, phone} = req.body
        try {
            const data = await userUseCase.create({
                name,
                email,
                address,
                phone
            })
            return reply.send(data)
        }
        catch(error) {
            reply.code(500).send(error)
        }
    })
}