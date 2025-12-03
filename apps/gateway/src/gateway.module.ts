import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { DBService, GatewayService, UserService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WsGateway } from './ws/ws.gateway';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				algorithm: 'HS256',
				expiresIn: '7d',
				encoding: 'utf8',
				issuer: process.env.BASE_URL,
			},
		}),
		AvatarsModule,
	],
	controllers: [GatewayController],
	providers: [GatewayService, UserService, DBService, WsGateway],
})
export class GatewayModule {}
