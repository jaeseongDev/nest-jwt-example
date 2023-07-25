import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { SignInRequestDto } from './dto/signIn.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpRequestDto: SignUpRequestDto) {
    const { email, password } = signUpRequestDto;
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async signIn(singInRequestDto: SignInRequestDto) {}

  async getMyInfo(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }
}
