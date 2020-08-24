import {UserModel, UserModelInterface} from '../models/user'

export function create(user: UserModelInterface): Promise<UserModel> {
    // @ts-ignore
    return UserModel.create({
        name: user.name,
        email: user.email,
        password: user.password
    });
}

export function findAll(): Promise<UserModel> {
    // @ts-ignore
    return UserModel.findAll({include: [{all: true}]})
}

export function login(user: UserModelInterface): Promise<UserModel> {
    // @ts-ignore
    return UserModel.findOne({
        where: {
            email: user.email,
            password: user.password
        }
    })
}

export function findOne(user: UserModelInterface): Promise<UserModel> {
    // @ts-ignore
    return UserModel.findOne({
        where: {
            email: user.email,
        }
    })
}
