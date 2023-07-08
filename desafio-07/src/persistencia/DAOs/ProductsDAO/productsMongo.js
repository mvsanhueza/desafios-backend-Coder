import productModel from "../models/Product.js";

class productsMongo {
    findPage = async (query, options) =>{
        try{
            const products = await productModel.paginate(query, options);
            return products;
        }
        catch (error){
            return error;
        }
    }

    getProductById = async (id) =>{
        try{
            const product = await productModel.findById(id);
            return product;
        }
        catch (error){
            return error;
        }
    }

    createProduct = async (product) =>{
        try{
            const newProduct = await productModel.create(product);
            return newProduct;
        }
        catch (error){
            return error;
        }
    }
}

export default new productsMongo();