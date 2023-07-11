import { hashData } from "../utils/utils.js";
import usersMongo from "../persistencia/DAOs/MongoDAOs/usersMongo.js";

class UsersService{
    async findAllUsers(){
        try{
            const users = await usersMongo.findAll();
            return users;
        }
        catch(error){
            return error;
        }
    }
    async findUserById(id){
        try{
            const user = await usersMongo.findOneById(id);
            return user;
        }
        catch(error){
            return error;
        }
    }
    async findUser(obj){
        try{
            const user = await usersMongo.findOne(obj);
            return user;
        }
        catch(error){
            return error;
        }
    }
    async createUser(obj){
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
}

const usersService = new UsersService();
export default usersService;
