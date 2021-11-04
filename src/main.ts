import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as  session from 'express-session';
import * as passport from 'passport';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port')); 
  //app.useGlobalGuards(new RolesGuard());
  
  app.use(
    session({
      secret: 'testsecret',
      resave: false,
      saveUnintialized: false,
      cookie: {maxAge: 36000000}
    }),
  );
}
bootstrap();
