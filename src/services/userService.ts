import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { UserType } from "../enums/userType";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create_user(name: string, email: string): Promise<User> {
    var fuser = await this.userRepository.findOne({ where: { email } });

    if (fuser) {
      throw new Error("User already exists");
    }
    let userTypes = UserType.USER;
    var user = this.userRepository.create({
      name,
      email,
      usertype: UserType.USER,
    });
    return await this.userRepository.save(user);
  }

  async create_admin(name: string, email: string): Promise<User> {
    var fuser = await this.userRepository.findOne({ where: { email } });

    if (fuser) {
      throw new Error("User exists");
    }

    let userTypes = UserType.ADMIN;
    var user = this.userRepository.create({
      name,
      email,
      usertype: UserType.ADMIN,
    });
    return await this.userRepository.save(user);
  }

  async create_project_manager(name: string, email: string): Promise<User> {
    var fuser = await this.userRepository.findOne({ where: { email } });

    if (fuser) {
      throw new Error("User exists");
    }

    let userTypes = UserType.PROJECT_MANAGER;
    var user = this.userRepository.create({
      name,
      email,
      usertype: UserType.PROJECT_MANAGER,
    });
    return await this.userRepository.save(user);
  }

  async get_users(): Promise<User[]> {
    var usrs = await this.userRepository.find({ relations: ["tasks"] });

console.log(
      "🚀 ~ file: userService.ts:43 ~ UserService ~ getusers ~ usrs:",
      usrs
    );

    return usrs;
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ["tasks"],
    });
  }
}
