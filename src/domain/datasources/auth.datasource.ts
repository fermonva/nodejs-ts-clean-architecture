import { LoginUserDto } from "../dtos/uath/login.userDto";
import { RegisterUserDto } from "../dtos/uath/register.userDto";
import { UserEntity } from "../entities/user.entity";

// abstract class not allow to create an instance, only to extend or implement
export abstract class AuthDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
