import ENUM_Errors from '../../services/errors/enums.js';

export default (err, req, res, next) =>{ 
    console.log({error: err.name});
    switch(err.code){
        case ENUM_Errors.ROUTING_ERROR:
            res.send({status: "error", error: err.name})
            break;
        case ENUM_Errors.INVALID_TYPES_ERROR:
            res.send({status: "error", error: err.name})
            break;
        default: 
            res.send({status: "error", error: "Error desconocido"})
    }
}