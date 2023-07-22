export const generateProductErrorInfo = (product) =>{
    return `Una o más propiedades del producto no son válidas.
    Las propiedades requeridas son:
    title      : tipo String, recibe ${product.title},
    description : tipo String, recibe ${product.description},
    code      : tipo String, recibe ${product.code},
    category   : tipo String, recibe ${product.category},
    price      : tipo Number, recibe ${product.price},
    stock       : tipo Number, recibe ${product.stock},`
}