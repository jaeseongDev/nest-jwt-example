import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { SignInRequestDto } from './dto/signIn.request.dto';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    const { email, password } = signInRequestDto;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException("존재하지 않는 이메일입니다.");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new BadRequestException("비밀번호가 일치하지 않습니다.");
    }
    return "Access Token";
  }

  async getMyInfo(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }
}
