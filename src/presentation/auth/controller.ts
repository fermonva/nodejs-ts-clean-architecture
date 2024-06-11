import { Request, Response } from "express";
import { UserModel } from "../../data/mongobd";
import {
  AuthRepository,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";
import { CustomError } from "../../errors/custom.error";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(error);
    return;
  };

  registerUser = (req: Request, res: Response) => {
    const registerUserDto = RegisterUserDto.create(req.body);

    new RegisterUser(this.authRepository)
      .execute(registerUserDto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const loginUserDto = LoginUserDto.login(req.body);

    new LoginUser(this.authRepository)
      .execute(loginUserDto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerError(error, res));
  };

  getUser = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) =>
        res.json({
          // users,
          user: req.body.user,
        })
      )
      .catch((error) => this.handlerError(error, res));
  };
}
