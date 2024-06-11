import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // injectar dependencias
    const authDatasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(authDatasource);

    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    router.get("/", AuthMiddleware.validateJWT, controller.getUser);

    return router;
  }
}
