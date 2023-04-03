class ProductManager{
    constructor(){
        this.products = [];
    }

    addProduct(product){
        if(this.products.find(p=>p.code == product.code)){
            console.log("Producto existente");
            return;
        }        
        else if(Object.values(product).find(k=>k == null)){
            console.log("Producto incompleto");
            return;
        }                
        this.products.push(product);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        let product = this.products.find(p=>p.ID == id);
        if(product){
            return product;
        }
        else{
            console.log("Not Found");
            return;
        }
    }
}

class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.ID = Product.incrementID();
    }

    static incrementID(){
        if(this.idIncrement){
            this.idIncrement++;
        }
        else{
            this.idIncrement = 1;
        }

        return this.idIncrement;
    }
}

//TESTING
const productManager = new ProductManager();
console.log(productManager.getProducts()); 
productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
console.log(productManager.getProducts());
productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
productManager.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc126", 25));
console.log(productManager.getProducts());

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(100));
console.log(productManager.getProducts());