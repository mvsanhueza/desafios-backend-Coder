const socket = io();

//Se busca el formulario y se le agrega el eventlistener:
const formProduct = document.getElementById('form_Product');


formProduct.addEventListener('submit', (e)=>{
    e.preventDefault();
    const productData = new FormData(e.target); //Transforma objeto htm en objeto iterator

    const productString = Object.fromEntries(productData); //Transforma objeto iterator en objeto js
    //Se ajusta el valor de status (true o false) y se agrega el thumbnail, y precio a numero:
    const product = {
        title: productString.title,
        description: productString.description,
        code: productString.code,
        price: parseFloat(productString.price),
        status: productString.status === 'on',
        stock: parseInt(productString.stock),
        category: productString.category,
        thumbnails: []
    };

    console.log(product);
    socket.emit('addProduct', {product});
})