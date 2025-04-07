import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
    secret: 'your-secret-key', // use ConfigService for real apps
    signOptions: { expiresIn: '1h' },
  }),],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
