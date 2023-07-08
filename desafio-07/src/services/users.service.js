import { hashData } from "../utils/utils.js";
import usersMongo from "../persistencia/DAOs/UsersDAO/usersMongo.js";

export const findAllUsers = async () =>{
    try{
        const users = await usersMongo.getAll();
        return users;
    }
    catch(error){
        return error;
    }
} 

export const findUserById = async (id) => {
    try{
        const user = await usersMongo.getById(id);
        return user;
    }
    catch(error){
        return error;
    }
}

export const findUser = async (obj) => {
    try{
        const user = await usersMongo.findOne(obj);
        return user;
    }
    catch(error){
        return error;
    }
}

export const createUser = async (obj) => {
    try{
        //Se hashea la password en el service:
        const hashPassword = await hashData(obj.password);
        const userHashed = {...obj, password: hashPassword};
        const newUser = await usersMongo.createOne(userHashed);
        return newUser;
    }
    catch(error){
        return error;
    }
}