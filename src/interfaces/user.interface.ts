export interface User {
    id: number
    name: string
    email: string
    address: string
    phone?: string | null
}

export interface UserCreate {
    name: string
    email: string
    address: string
    phone?: string | null
}

export interface UserRepository{
    create(user: UserCreate): Promise<User>
    findByEmail(email: string): Promise<User | null>
}