import CustomError from "../services/errors/CustomError.js";
import ENUM_Errors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import productsService from "../services/products.service.js";
import { fakerES } from '@faker-js/faker'


export const getProducts = async (req, res) => {
    const result = {
        status: "error",
        payload: [],
        totalPages: 0,
        prevPage: 0,
        nextPage: 0,
        page: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevLink: null,
        nextLink: null,
    }

    try {
        let { limit, page, sort, query } = req.query;
        //Se asignan los valores para la lectura:
        const products = await productsService.getPageProducts(query, limit, page, sort);

        result.status = "success";
        result.payload = products.docs;
        result.totalPages = products.totalPages;
        result.prevPage = products.prevPage;
        result.nextPage = products.nextPage;
        result.hasPrevPage = products.hasPrevPage;
        result.hasNextPage = products.hasNextPage;
        result.page = intPage;

        //Se busca el prevlink y el nextling según corresponda:
        let linkAddOptions = (limit ? (`&limit=${limit}`) : "") + (sort ? (`&sort=${sort}`) : "") + (query ? (`&query=${query}`) : "");
        result.prevLink = products.hasPrevPage ? (`http://localhost:8080/api/products?page=${products.prevPage}` + linkAddOptions) : null;
        result.nextLink = products.hasNextPage ? (`http://localhost:8080/api/products?page=${products.nextPage}` + linkAddOptions) : null;
    }
    catch (error) {
        req.logger.error('Error al cargar productos: ' + error.message);
    }
    res.render('home', { session: req.user, result: result });
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (product) {
        res.render('home', { products: [product] });
    }
    else {
        res.send({ error: "No se encontro el producto con el ID ingresado" })
        req.logger.debug('No se encontró el producto especificado');
    }
}

export const createProduct = async (req, res, next) => {
    try {
        //Se verifica que tengas los elementos requeridos:
        if (!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.category || !req.body.stock) {
            CustomError.createError({
                name: "Product creation error",
                cause: generateProductErrorInfo(req.body),
                message: "Error al crear el producto",
                code: ENUM_Errors.INVALID_TYPES_ERROR
            })
        }
        const newProduct = await productsService.createProduct(req.body);
        // const mensaje = await productManager.addProduct({title, description,code,price,status,stock,category,thumbnails});
        if (newProduct) {
            res.send("Objeto agregado");
            req.logger.debug('producto agregado')
        }
        else {
            res.send("No se pudo agregar el objeto");
            req.logger.debug('Nose pudo agregar el objeto')
        }
    }
    catch (error) {
        req.logger.error('Error al crear producto' + error.message);
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    try {
        if (!title || !description || !code || !price || !category || !stock) {
            CustomError.createError({
                name: "Product update error",
                cause: generateProductErrorInfo(req.body),
                message: "Error al actualizar el producto",
                code: ENUM_Errors.INVALID_TYPES_ERROR
            })
        }

        const mensaje = await productsService.updateProduct(id, { title, description, code, price, status, stock, category, thumbnails });
        res.send(mensaje);
    }
    catch (error) {
        req.logger.error('Error al actualizar el producto' + error.message)
        next(error);
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const mensaje = await productsService.deleteProduct(id);
    req.logger.debug('Producto eliminado')
    res.send(mensaje);
}

export const mockingProduct = async (req, res) => {
    //Genera 100 productos mocking:
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = {
            title: fakerES.commerce.productName(),
            description: fakerES.commerce.productDescription(),
            code: (i + 1).toString(),
            price: fakerES.commerce.price(),
            category: fakerES.commerce.department(),
            _id: fakerES.database.mongodbObjectId(),
            stock: fakerES.number.int(),
            status: true,
            thumbnails: [fakerES.image.url()],
        }
        products.push(product);
    }
    res.send(products);
}