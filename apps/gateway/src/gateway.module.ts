import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { DBService, GatewayService, UserService } from './gateway.service';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [GatewayService, UserService, DBService],
})
export class GatewayModule {}
