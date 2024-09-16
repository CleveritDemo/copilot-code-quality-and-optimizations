import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { UserType } from '../enums/userType';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  private async createUserWithRole(
    name: string,
    email: string,
    usertype: UserType,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = this.userRepository.create({
      name,
      email,
      usertype,
    });

    return await this.userRepository.save(user);
  }

  async createUser(name: string, email: string): Promise<User> {
    return this.createUserWithRole(name, email, UserType.USER);
  }

  async createAdmin(name: string, email: string): Promise<User> {
    return this.createUserWithRole(name, email, UserType.ADMIN);
  }

  async createProjectManager(name: string, email: string): Promise<User> {
    return this.createUserWithRole(name, email, UserType.PROJECT_MANAGER);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['tasks'] });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }
}
