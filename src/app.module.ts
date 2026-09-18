import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/auth-jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProjectModule } from './modules/project/project.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        J_SECRET: Joi.string().min(32).required(),
      }),
      load: [configuration],
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      useClass: JwtAuthGuard,
      provide: APP_GUARD
    }


  ],
})


export class AppModule { }
