import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
	const app = await NestFactory.create(GatewayModule);

	// app.useWebSocketAdapter(new IoAdapter(app));
	// (BigInt.prototype as any).toJSON = function () {
	// 	return this.toString();
	// };
	// Configure Swagger (OpenAPI 2.0)
	const config = new DocumentBuilder()
		.setTitle('Gateway API')
		.setDescription('API documentation for Gateway service')
		.setVersion('2.0')
		// .setSchemes('http') // required for OpenAPI 2.0
		.setOpenAPIVersion('3.1.0')
		.addBearerAuth() // optional: adds JWT auth header
		.addOAuth2({
			type: 'oauth2',
			'x-tokenName': 'x-access',
		})
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		// Force OpenAPI 2.0 output
		// swaggerDocumentOptions: { swaggerVersion: '2.0' },
		deepScanRoutes: true,
	});

	SwaggerModule.setup('api-docs', app, document);
	await app.listen(process.env.port ?? 3005);
}
bootstrap();
