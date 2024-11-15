import { prisma } from "../database/prisma-client";
import { Product, ProductCreate, ProductRepository } from "../interfaces/product.interface";

class ProductRepositoryPrisma implements ProductRepository {
    async create(product: ProductCreate): Promise<Product> {
        const result = await prisma.product.create({
            data: {
                name: product.name,
                price: product.price,
                category: product.category,
                description: product.description || null,
                imageUrl: product.imageUrl || null
            }
        })
        return result
    }
    async getProducts(): Promise<Product[]> {
        const result = await prisma.product.findMany()
        console.log(result)
        return result
    
    }

    async getOneProduct(id: number): Promise<Product | null> {
        const result = await prisma.product.findFirst({
            where: {
                id
            }
        })
        return result
    }

    async updateProduct({id, name, price, category, description, imageUrl}:Product): Promise<Product> {
        const result = await prisma.product.update({
            where: {
                id,
            },
            data:{
                name,
                price,
                category,
                description,
                imageUrl
            },
        })

            return result
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await prisma.product.delete({
            where: {
                id
            }
        })
        return result ? true : false
    }
}

export { ProductRepositoryPrisma }