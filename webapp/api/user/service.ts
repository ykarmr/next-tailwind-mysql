import { User } from '@prisma/client';
import { UserRepository } from './repository';
import { CreateUserRequestType, UpdateUserRequestType } from './type';


export class UserService {
    constructor (private userRepository:UserRepository) {} 
    public FindUsers = async (name?:string):Promise<User[]> => {
        const users:User[] = await this.userRepository.FindUsers(name)
        return users
    }

    public FindUser = async (id: string):Promise<User | null> => {
        const user:User | null = await this.userRepository.FindUser(id)
        return user
    }

    public CreateUser = async (user: CreateUserRequestType):Promise<User | null> => {
        const newUser:User | null = await this.userRepository.CreateUser(user)
        return newUser
    }

    public UpdateUser = async (id: string, user: UpdateUserRequestType):Promise<User | null> => {
        const newUser:User | null = await this.userRepository.UpdateUser(id,user)
        return newUser
    }

    public DeleteUser = async (id: string): Promise<User> => {
        const deleteUser = await this.userRepository.DeleteUser(id)
        return deleteUser
    }
}