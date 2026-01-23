import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user: User | undefined;

    try {
      user = await this.usersService.findByEmail(email);
    } catch (error) {
      return null;
    }

    if (user && compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findById(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return user;
  }
}