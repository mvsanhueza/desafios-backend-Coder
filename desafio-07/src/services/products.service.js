import productsMongo from "../persistencia/DAOs/ProductsDAO/productsMongo.js";
import { JSONParse } from "../utils/utils.js";

export const getPageProducts = async (query, limit, page, sort) =>{
    try{
        let intLimit = limit ? parseInt(limit) : 10;
        let intPage = page ? parseInt(page) : 1;
        let sortObj = sort && (sort === 'asc' || sort === 'desc') ? {price: sort} : {};
        //Para el query se verifica si existe el parametro en el model:
        let queryObj = query ? JSONParse(query) : {};
        const products = await productsMongo.findPage(queryObj, { limit: intLimit, page: intPage, sort: sortObj, lean: true });
        return products;
    }
    catch (error){
        return error;
    }
}

export const getProductById = async (id) =>{
    try{
        const product = await productsMongo.getProductById(id);
        return product;
    }
    catch (error){
        return error;
    }
}

export const createProduct = async (product) =>{
    try{
        if(!product.thumbnails){
            product.thumbnails = [];
        }
        const newProduct = await productsMongo.createProduct(product);
        return newProduct;
    }
    catch(error) {
        return error
    }
}