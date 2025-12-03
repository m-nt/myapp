import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Log } from './app.middleware';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.REDIS,
			options: {
				host: 'localhost',
				port: 6379,
			},
		},
	);
	// app.useGlobalInterceptors(new Log())
	await app.listen();
}
bootstrap();
