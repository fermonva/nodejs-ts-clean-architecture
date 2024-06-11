import { CustomError } from "../../../errors/custom.error";
import { Validators } from "../../../utils";

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  static login(object: { [key: string]: any }): LoginUserDto {
    const { email, password } = object;

    if (!email) throw CustomError.badRequest("email is required");
    if (!Validators.validateEmail(email))
      throw CustomError.badRequest("invalid email");
    if (!password) throw CustomError.badRequest("password is required");
    if (password.length < 6)
      throw CustomError.badRequest("password must be at least 6 characters");

    return new LoginUserDto(email, password);
  }
}
