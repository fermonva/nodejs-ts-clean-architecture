import { UserModel } from "../../data/mongobd";
import {
  AuthDatasource,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { CustomError } from "../../errors/custom.error";
import { BcryptAdapter } from "../../utils/bcrypt";
import { UserMapper } from "../mappers/user.mapper";

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private hashPassword: HashPassword = BcryptAdapter.hash,
    private comparePassword: ComparePassword = BcryptAdapter.compare
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.notFound("User not found");
    const isPasswordValid = this.comparePassword(password, user.password);
    if (!isPasswordValid) throw CustomError.unauthorized("Invalid password");
    return UserMapper.userEntityFromObject(user);
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const isEmailAllReadyExist = await UserModel.findOne({ email });
      if (isEmailAllReadyExist) {
        throw CustomError.badRequest("User already exists");
      }

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError("Internal server error");
    }
  }
}
