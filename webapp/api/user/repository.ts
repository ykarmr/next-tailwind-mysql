import { PrismaClient,User } from '@prisma/client'
import { CreateUserRequestType, UpdateUserRequestType } from './type'

const prisma = new PrismaClient()

export class UserRepository  {
    public FindUsers = async(name?:string):Promise<User[]> => {
        const users:User[] = await prisma.user.findMany({
            where:{
                name: {
                    startsWith: name
                }
            }
        })
        return users
    }

    public FindUser = async(userId: string):Promise<User | null> => {
        const user:User | null = await prisma.user.findUnique({
            where: {
                id:userId
            }
        })
        
        return user
    }

    public CreateUser = async (user: CreateUserRequestType):Promise<User | null> => {
        const {email, name} = user
        const newUser = await prisma.user.create({
            data: {
              email: email,
              name: name,
            },
        })
        return newUser
    }

    public UpdateUser = async (id: string,user: UpdateUserRequestType):Promise<User | null> => {
        const {email, name} = user
        const newUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
              email: email,
              name: name,
            },
        })
        return newUser
    }

    public DeleteUser = async (id: string): Promise<User> => {
        const deleteUser = await prisma.user.delete({
            where: {
                id: id,
            },
        })
        return deleteUser
    }
}