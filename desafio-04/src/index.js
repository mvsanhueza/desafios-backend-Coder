import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { __dirname } from './path.js';


//Configuración de express:
const app = express();
const PORT = 8080;
//Configuración handlebars:
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

//Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes:
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', express.static(path.resolve(__dirname, './public')));
app.use('/api/', productRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});