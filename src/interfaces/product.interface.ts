export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string | null;
    imageUrl: string | null
}

export interface ProductCreate {
    name: string
    price: number
    category: string
    description?: string | null
    imageUrl?: string | null
}

export interface ProductRepository{
    create(user: ProductCreate): Promise<Product>
    getProducts(): Promise<Product[]>
    getOneProduct(id: number): Promise<Product | null>
    updateProduct({id, name, price, category, description, imageUrl}:Product): Promise<Product>
    deleteProduct(id: number): Promise<boolean>
}
