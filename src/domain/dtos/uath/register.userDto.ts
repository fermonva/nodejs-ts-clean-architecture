import { CustomError } from "../../../errors/custom.error";
import { Validators } from "../../../utils";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): RegisterUserDto {
    const { name, email, password } = object;

    if (!name) throw CustomError.badRequest("name is required");
    if (!email) throw CustomError.badRequest("email is required");
    if (!Validators.validateEmail(email))
      throw CustomError.badRequest("invalid email");
    if (!password) throw CustomError.badRequest("password is required");
    if (password.length < 6)
      throw CustomError.badRequest("password must be at least 6 characters");

    return new RegisterUserDto(name, email, password);
  }
}
