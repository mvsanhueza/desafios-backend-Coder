import {promises as fs} from 'fs';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try{
            const keysRequired = ["title", "description", "price", "thumbnail", "code", "stock", "ID"];
            const keysProduct = Object.keys(product);
    
            //se lee el archivo txt con los datos:
            const productsJSON = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsJSON);
    
            if (keysRequired.some(k=> !keysProduct.includes(k))) {
                console.log("Producto inválido");
                return;
            }
            else if (products.find(p => p.code == product.code)) {
                console.log("Producto existente");
                return;
            }
    
            products.push(product);
    
            //Se guarda el nuevo producto en el archivo txt:
            await fs.writeFile(this.path, JSON.stringify(products));
        }
        catch(error)
        {
            return error;
        }
    }

    async getProducts() {
        const productsJSON = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJSON);
        return products;
    }

    async getProductById(id) {
        const productsJSON = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJSON);

        let idInt = parseInt(id);

        const product = products.find(p => p.ID == idInt);
        if (product) {
            return product;
        }
        else {
            console.log("Not Found");
            return;
        }
    }

    async updateProduct(id, {title, description, price, thumbnail, code, stock}) {
        const productsJSON = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJSON);

        let idInt = parseInt(id);
        if(products.some(product=>product.ID === idInt)){
            let index = products.findIndex(product=>product.ID === idInt);
            products[index].title = title;
            products[index].description = description;
            products[index].price = price;
            products[index].thumbnail = thumbnail;
            products[index].code = code;
            products[index].stock = stock;

            //Se vuelve a guardar en el archivo:
            await fs.writeFile(this.path, JSON.stringify(products));
        }
        else{
            return "Producto no encontrado"
        }
    }

    async deleteProduct(id) {
        let idInt = parseInt(id);
        
        const productsJSON = await fs.readFile(this.path, 'utf-8');
        const products = JSON.parse(productsJSON);

        const product = products.find(p => p.ID === idInt);

        if(product){
            const productsNew = products.filter(p => p.ID != idInt);
            //Se actualiza el txt:
            await fs.writeFile(this.path, JSON.stringify(productsNew));
        }
        else{
            return "Producto no encontrado"
        }

    }

}

export class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.ID = Product.incrementID();
    }

    static incrementID() {
        if (this.idIncrement) {
            this.idIncrement++;
        }
        else {
            this.idIncrement = 1;
        }

        return this.idIncrement;
    }
}
