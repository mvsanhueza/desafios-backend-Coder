import usersService from "../services/users.service.js";
import userResponse from "../persistencia/DTOs/userResponse.dto.js";

export const signup = async (req,res) =>{
    const { email, password, first_name, last_name } = req.body;

    const user = await usersService.findUser({ email });
    if (user || !email || !password || !first_name || !last_name) {
        req.logger.info('Falta algun dato para el registro')
        return res.redirect('/api/errorSignup')
    }
    await usersService.createUser(req.body);

    req.logger.debug('Usuario creado correctamente');
    res.redirect('/api')
}

export const logout = async (req,res) =>{
    req.session.destroy(error => {
        if (error) {
            req.logger.error('Error al cerrar sesión: ' + error.message);
            res.send(error);
        }
        else {
            res.redirect('/api')
            req.logger.debug('Sesión cerrada correctamente');
        }
    });
}

export const currentUser = async (req,res) =>{
    try{
        const user = new userResponse(req.user);;
        res.send(user);
    }
    catch(error){
        req.logger.debug('Error al identificar al usuario actual: ' + error.message);
        res.json({error: error.message});
    }
}

