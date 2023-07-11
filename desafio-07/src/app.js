import config from './config/config.js';
import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import sessionRouter from './routes/session.routes.js'
import viewsRouter from './routes/views.routes.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { __dirname } from './utils/utils.js';
import mongoStore from 'connect-mongo';
import session from 'express-session';
import './controllers/passport.controller.js'
import passport from 'passport';
import './config/dbConfig.js';

//Configuración de express:
const app = express();
const PORT = config.port || 8080;

//Configuración handlebars:
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use((req,res,next)=>{ //Realizamos el io accesible a los routes:
//     req.io = io;
//     next();
// })

//sessiones:
app.use(session({
    store: mongoStore.create({
        mongoUrl: config.mongo_uri,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl:300
    }),
    secret: config.session_secret,
    resave: true,
    saveUninitialized: false,
}));

//Passport:
app.use(passport.initialize());
app.use(passport.session());

//Routes:
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/', express.static(path.resolve(__dirname, './public')));
app.use('/api/', viewsRouter);


