import { Product } from "@prisma/client";
import { ProductCreate, ProductRepository } from "../interfaces/product.interface";
import { ProductRepositoryPrisma } from "../repositories/product.repository";

export class ProductUseCase {
    
    private productRepository: ProductRepository

    constructor(){
        this.productRepository = new ProductRepositoryPrisma();
    }

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.getProducts()
    }

    async getOneProduct(id: number): Promise<Product | null> {
        const result = await this.productRepository.getOneProduct(id)
        return result
    }

    async create(data: ProductCreate): Promise<Product> {

        const result = await this.productRepository.create({
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description || null,
            imageUrl: data.imageUrl || null
        })

        return result
    }

    async updateProduct({id, name, price, category, description, imageUrl}: Product) {
        const data = await this.productRepository.updateProduct({
            id,
            name,
            price,
            category,
            description,
            imageUrl
        })

        return data
    }

    async deleteProduct(id: number) {
        await this.productRepository.deleteProduct(id)
    }
}