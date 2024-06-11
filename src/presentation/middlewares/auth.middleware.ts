import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongobd";
import { CustomError } from "../../errors/custom.error";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ").at(1);
      if (!token) {
        throw CustomError.unauthorized("No token provided");
      }
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) {
        throw CustomError.unauthorized("Invalid token");
      }
      const user = await UserModel.findById(payload.id);
      if (!user) {
        throw CustomError.unauthorized("User not found");
      }

      req.body.user = user;

      next();
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}
