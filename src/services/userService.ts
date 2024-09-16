import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { UserType } from '../enums/userType';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string): Promise<User> {
    const fuser = await this.userRepository.findOne({ where: { email } });

    if (fuser) {
      throw new Error('User already exists');
    }
    const user = this.userRepository.create({
      name,
      email,
      usertype: UserType.USER,
    });
    return await this.userRepository.save(user);
  }

  async createAdmin(name: string, email: string): Promise<User> {
    const fuser = await this.userRepository.findOne({ where: { email } });

    if (fuser) {
      throw new Error('User exists');
    }

    const user = this.userRepository.create({
      name,
      email,
      usertype: UserType.ADMIN,
    });
    return await this.userRepository.save(user);
  }

  async createProjectManager(name: string, email: string): Promise<User> {
    const fuser = await this.userRepository.findOne({ where: { email } });

    if (fuser) {
      throw new Error('User exists');
    }

    const user = this.userRepository.create({
      name,
      email,
      usertype: UserType.PROJECT_MANAGER,
    });
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    const usrs = await this.userRepository.find({ relations: ['tasks'] });

    return usrs;
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }
}
