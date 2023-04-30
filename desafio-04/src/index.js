import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import { engine } from 'express-handlebars';
import {Server} from 'socket.io';
import * as path from 'path';
import { __dirname } from './path.js';


//Configuración de express:
const app = express();
const PORT = 8080;
//Configuración handlebars:
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//IO SERVER:
const io = new Server(server);

io.on('connection', (socket)=>{
    console.log('Cliente conectado');
    socket.on('mensaje',(data)=>{
        console.log(data);
    })
    // socket.on('addProduct', (data)=>{
    //     console.log(data);
    // })
});



//Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req,res,next)=>{ //Realizamos el io accesible a los routes:
    req.io = io;
    next();
})

//Routes:
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', express.static(path.resolve(__dirname, './public')));
app.use('/api/', productRouter);


