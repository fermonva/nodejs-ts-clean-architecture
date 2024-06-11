import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET,
        { expiresIn: duration },
        (err, token) => {
          if (err) {
            resolve(null);
          }
          resolve(token!);
        }
      );
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) {
          resolve(null);
        }
        resolve(decoded as T);
      });
    });
  }
}
