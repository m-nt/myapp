import { Module } from '@nestjs/common';
import { AppController, Math } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '7d',
        encoding: 'utf8',
        issuer: process.env.BASE_URL
      }
  })
  ],
  controllers: [AppController,Math],
  providers: [AppService],
})
export class AppModule {}
