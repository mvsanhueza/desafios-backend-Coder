import { Router } from "express";
import userModel from "../models/User.js";
import { hashData, compareData} from "../utils.js";

const routerSession = Router();

routerSession.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.redirect('/api/errorLogin')
    }

    const isPasswordValid = await compareData(password, user.password);
    if(!isPasswordValid){
        return res.redirect('/api/errorLogin')
    }

    req.session.user = user;

    res.redirect('/api/products')
})

routerSession.post('/signup', async (req,res) => {
    const {email, password}  = req.body;

    const user = await userModel.findOne({email});
    if(user){
        return res.redirect('/api/errorSignup')
    }
    const hashPassword = await hashData(password);
    const newUser = {...req.body, password: hashPassword}
    await userModel.create(newUser);
    res.redirect('/api')
})

routerSession.get('/logout', (req, res) => {
    req.session.destroy(error =>{
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            res.redirect('/api')
        }
    });

})

// routerSession.get('/', getSession);
// routerSession.post('/login', testLogin);
// routerSession.post('/signup', )
// routerSession.post('/logout', destroySession);

export default routerSession;