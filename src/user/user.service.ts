import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async signUp(signUpRequestDto: SignUpRequestDto) {
    const { email, password } = signUpRequestDto;
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async signIn(singInRequestDto: SignInRequestDto) {
    const { email, password } = singInRequestDto;
    const user = await this.userRepository.findOne({
      where: {
        email,
        password,
      },
    });
    const accessToken = this.authService.signWithJwt({
      userId: user.id,
    });
    return {
      accessToken,
    };
  }

  async getMyInfo(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
