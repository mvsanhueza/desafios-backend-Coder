import CustomError from "../services/errors/CustomError.js";
import usersService from "../services/users.service.js";
import { compareData, hashData } from '../utils/utils.js';

class usersController {
    async changeRoleUser(req, res, next) {
        try {
            const {uid} = req.params;
            //Se busca el usuario en cuestion:
            const user = await usersService.findUserById(uid);

            if(!user){
                CustomError.createError({
                    name: "User not found in data base",
                    cause: "User not found in data base",
                    message: "El usuario no existe en la base de datos",
                    code: ENUM_Errors.DATABASE_ERROR
                })      
            }

            const role = user.role;
            let newRole = role === 'premium' ? 'user' : 'premium';
            user.role = newRole;
            
            await usersService.updateUser(uid, user);
            
            req.logger.info(`User ${uid} changed role of user ${role} to ${newRole}`);
            res.status(200).json({message: `User ${uid} changed role of user ${role} to ${newRole}`});
        } catch (error) {
            req.logger.error('Usuario no encontrado en la base de datos' + error.message);
            next(error);
        }
    }

    async updateUserPassword(req,res,next) {
        const { uid } = req.params;
        const { password } = req.body;
    
        try {
            //Se busca el usuario por id:
            const user = await usersService.findUserById(uid);
    
            if (!user || !password) {
                CustomError.createError({
                    name: "Link de recuperación incorrecto",
                    cause: generateUserUpdateError,
                    message: "El link de recuperación es incorrecto",
                    code: ENUM_Errors.INVALID_TYPES_ERROR,
                })
            }
            //Se analiza que el usuario tenga distinta contraseña:
            const samePassword = await compareData(password, user.password);
            if (samePassword) {
                CustomError.createError({
                    name: "Contraseña igual",
                    cause: "La contraseña debe ser distinta a la anterior",
                    message: "La contraseña es igual a la anterior",
                    code: ENUM_Errors.INVALID_TYPES_ERROR,
                })
            }
    
            //Se actualiza la contraseña:
            user.password = await hashData(password);
            await usersService.updateUser(uid, user);
    
            //Se redirige a un cambio de contraseña exitoso:
            res.redirect('/api');
        }
        catch (error) {
            req.logger.error('Error al actualizar contraseña del usuario: ' + error.message)
            next(error);
        }
    }    
}

export default new usersController();