import express from 'express';
import { ProductManager } from "./clases.js";

//Configuracion express:
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const productManager = new ProductManager("./products.txt");

app.get('/products', async (req, res) => {
    let {limit} = req.query;
    let intLimit = parseInt(limit);
    const products = await productManager.getProducts();

    if(intLimit > -1 && intLimit < products.length){
        res.send(products.slice(0,intLimit));
        return;
    }    

    res.send(products);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductById(id);

    if(product){
        res.send(product)        
    }
    else{
        res.send({error: "No se encontro el producto con el ID ingresado"})
    }

})

app.listen(PORT,() =>{
    console.log(`Server on port ${PORT}`);
})