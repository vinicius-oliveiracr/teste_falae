import { User, UserRepository, UserCreate } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository
    constructor(){
        this.userRepository = new UserRepositoryPrisma();
    }

    async create(data: UserCreate): Promise<User>{
        const verifyUserExists = await this.userRepository.findByEmail(data.email)
        if(verifyUserExists){
            throw new Error("User already registered.")
        }
        const result = await this.userRepository.create({
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone || null
        })

        return result;
    }
}

    

export { UserUseCase }