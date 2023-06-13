export const testLogin = (req, res, next) =>{
    const {email, password} = req.body;
    console.log(email);
    try{
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            req.session.login = true;
            res.status(200).json({message: "Usuario logueado"});
        }
        else {
            res.status(401).json({message: "Usuario o contraseña incorrectos"})
        }
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

export const destroySession = (req, res, next) =>{
    if(req.session.login){
        req.session.destroy(()=>{
            res.status(200).json({message: "Sesión cerrada"});
        });
    }
}

export const getSession = (req, res, next) =>{
    if(req.session.login){
        res.status(200).json({message: "Sesión activa"});
    }
    else{
        res.status(401).json({message: "Sesión no activa"});
    }
}