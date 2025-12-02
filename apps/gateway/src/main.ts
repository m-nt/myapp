import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  // Configure Swagger (OpenAPI 2.0)
  const config = new DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('API documentation for Gateway service')
    .setVersion('1.0')
    // .setSchemes('http') // required for OpenAPI 2.0
    .addBearerAuth()    // optional: adds JWT auth header
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // Force OpenAPI 2.0 output
    // swaggerDocumentOptions: { swaggerVersion: '2.0' },
  });

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.port ?? 3005);
}
bootstrap();
