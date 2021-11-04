import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configuration from 'config/configuration';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
       
    }),
    UsersModule,
    AuthModule
],
  controllers: [AppController, AuthController],
  providers: [
    AppService    
  ],
})
export class AppModule {}
