import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Headers,
	Post,
	Query,
	UseGuards,
	Req,
	Header,
} from '@nestjs/common';
import { GatewayService, UserService } from './gateway.service';
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Authrization } from './gateway.middleware';
import { log } from 'console';
import { User } from './user/user';
import {
	ApiBasicAuth,
	ApiBearerAuth,
	ApiBody,
	ApiHeader,
	ApiOAuth2,
} from '@nestjs/swagger';

@Controller()
export class GatewayController {
	private client: ClientProxy;
	constructor(
		private readonly gatewayService: GatewayService,
		private userService: UserService,
		private jwt: JwtService,
	) {
		this.client = ClientProxyFactory.create({
			transport: Transport.REDIS,
			options: {
				host: 'localhost',
				port: 6379,
			},
		});
	}

	@UseGuards(Authrization)
	@Get('/math')
	@ApiBearerAuth()
	@ApiOAuth2(['math:sum'])
	async getHello(@Query('numbers') numbers: string) {
		const num_arr = numbers.split(',').map((n) => parseInt(n, 10));
		return await this.client.send('sum', num_arr);
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
	@ApiBody({ type: User })
	async create(@Body() user: User, @Req() req: Request) {
		log(req.body);
		const res = await this.userService.create(user);
		return this.jwt.sign({ user_id: res.id.toString() });
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(Number(id));
	}
}
