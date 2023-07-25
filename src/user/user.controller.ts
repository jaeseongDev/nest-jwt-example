import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { JwtAuthGuard } from '../common/jwtPassport/jwtAuth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.userService.signUp(signUpRequestDto);
  }

  @Post('sign-in')
  signIn(@Body() singInRequestDto: SignInRequestDto) {
    return this.userService.signIn(singInRequestDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyInfo(@Request() req) {
    return this.userService.getMyInfo(req.user.userId);
  }
}
