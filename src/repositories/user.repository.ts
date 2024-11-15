import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(user: UserCreate): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            }
        })

        return result
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where:{
                email,
            },
        })
            return result || null
        
    }
}

export { UserRepositoryPrisma }