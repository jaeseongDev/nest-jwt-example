import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtPassportModule } from './common/jwtPassport/jwtPassport.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    JwtPassportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
