import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
@Module({

  imports: [JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory(configService: ConfigService) {
      return {
        secret: configService.getOrThrow<string>("J_SECRET"),
        signOptions: {
          expiresIn: '15m',
        },
      }
    },

  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
