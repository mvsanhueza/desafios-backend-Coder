import { Router } from "express";
import usersController from "../controllers/users.controller.js";


const routerUsers = new Router();


routerUsers.get('/premium/:uid', usersController.changeRoleUser);
routerUsers.post('/updatePassword/:uid', usersController.updateUserPassword)


export default routerUsers;