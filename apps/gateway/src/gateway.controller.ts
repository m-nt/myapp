import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { GatewayService, UserService } from './gateway.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  private client: ClientProxy
  constructor(
    private readonly gatewayService: GatewayService,
    private userService: UserService
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: "localhost",
        port: 6379
      }
    })
  }

  @Get("/math")
  async getHello(@Query('numbers') numbers:string) {
    const num_arr = numbers.split(',').map(n=>parseInt(n,10))
    return await this.client.send('sum',num_arr)
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Post()
  create(@Body() user: { name: string; email: string }) {
    return this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }

}
