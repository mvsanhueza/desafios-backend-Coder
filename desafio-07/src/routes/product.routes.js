import { Router } from "express";
import { getProductById, getProducts, createProduct } from "../controllers/product.controller.js";

//const productManager = new ProductManager('./products.json');

const productRouter = Router();

productRouter.get('/', getProducts);

// productRouter.get('/realtimeproducts', async (req, res)=>{
//     const products = await productManager.getProducts();
//     // req.io.on('connection', (socket)=>{
//     //     console.log('Conectado desde router');
//     //     socket.on('addProduct', async (product)=>{
//     //         const mensaje = await productManager.addProduct(product);
//     //         console.log(mensaje);
//     //         const products = await productManager.getProducts();            
//     //         socket.emit('actProducts', products);
//     //     })
//     //     socket.on('deleteProduct', async (id)=>{
//     //         const mensaje = await productManager.deleteProduct(id);
//     //         console.log(mensaje);
//     //         const products = await productManager.getProducts();            
//     //         socket.emit('actProducts', products);
//     //     })
//     // })
//     res.render('realTimeProducts', {products});
// })

productRouter.get('/:id', getProductById);


productRouter.post('/', createProduct);


productRouter.put('/:id',async (req,res)=>{
    const id = req.params.id;
    const {title, description,code,price,status,stock,category,thumbnails} = req.body;
    const mensaje = await productManager.updateProduct(id, {title, description, code, price, status, stock, category, thumbnails});
    res.send(mensaje);
})

productRouter.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    const mensaje = await productManager.deleteProduct(id);
    res.send(mensaje);
});

export default productRouter;