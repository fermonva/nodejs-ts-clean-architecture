import { LoginUserDto } from "../dtos/uath/login.userDto";
import { RegisterUserDto } from "../dtos/uath/register.userDto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
