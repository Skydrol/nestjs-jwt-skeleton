import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './roles.guard';
import { SessionSerializer } from './session.serializer';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,    
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME'), 
        },
      }),
      inject: [ConfigService],          
    })
  
  ], //PassportModule.register({ session: true})
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, JwtAuthGuard], //, SessionSerializer
  exports: [AuthService]
})
export class AuthModule {} 