import { Router } from "express";
import userModel from "../models/User.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";

const routerSession = Router();

//login sin passport:
// routerSession.post('/login', async (req, res) => {
//     const {email, password} = req.body;
//     const user = await userModel.findOne({email});
//     if(!user){
//         return res.redirect('/api/errorLogin')
//     }

//     const isPasswordValid = await compareData(password, user.password);
//     if(!isPasswordValid){
//         return res.redirect('/api/errorLogin')
//     }

//     req.session.user = user;

//     res.redirect('/api/products')
// })
// login con passport:
routerSession.post('/login', passport.authenticate('login', { failureRedirect: '/api/errorLogin', successRedirect: '/api/products' }));

routerSession.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
        return res.redirect('/api/errorSignup')
    }
    const hashPassword = await hashData(password);
    const newUser = { ...req.body, password: hashPassword }
    await userModel.create(newUser);
    res.redirect('/api')
})

routerSession.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.redirect('/api')
        }
    });

})

//github:
routerSession.get('/githubSignin', passport.authenticate('githubLogin', { scope: ['user:email'] }));
routerSession.get('/github', passport.authenticate('githubLogin', { failureRedirect: '/api/errorLogin', successRedirect: '/api/products' }));

// //facebook:
// routerSession.get('/facebookSignin', passport.authenticate('facebookLogin', { scope: ['email'] }));
// routerSession.get('/facebook', passport.authenticate('facebookLogin', { failureRedirect: '/api/errorLogin', successRedirect: '/api/products' }));

//google:
routerSession.get('/googleSignin', passport.authenticate('googleLogin', { scope: ['email', 'profile'] }));
routerSession.get('/google', passport.authenticate('googleLogin', { failureRedirect: '/api/errorLogin', successRedirect: '/api/products' }));

// routerSession.get('/', getSession);
// routerSession.post('/login', testLogin);
// routerSession.post('/signup', )
// routerSession.post('/logout', destroySession);

export default routerSession;