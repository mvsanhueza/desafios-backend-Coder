import userModel from "../../models/User";

class UsersMongo{
    async getAll(){
        try{
            const data = await userModel.find();
            return data;
        }
        catch(error){
            return error;
        }
    }

    async getById(id){
        try{
            const data = await userModel.findById(id).lean();
            return data;
        }
        catch(error){
            return error;
        }
    }

    async findOne(obj){
        try{
            const user = await userModel.findOne(obj).lean();
            return user;
        }
        catch(error){
            return error;
        }
    }

    async createOne(obj){
        try{
            const newUser = await userModel.create(obj);
            return newUser;
        }
        catch(error){
            return error;
        }
    }
}

export default new UsersMongo();