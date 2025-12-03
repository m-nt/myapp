import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { User } from './user/user';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class GatewayService {
	getHello(): string {
		return 'Hello World!';
	}
}

@Injectable()
export class DBService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		const adapter = new PrismaPg({
			connectionString: process.env.DATABASE_URL as string,
		});
		super({ adapter: adapter });
	}
	async onModuleInit() {
		await this.$connect();
	}
	async onModuleDestroy() {
		await this.$disconnect();
	}
}

@Injectable()
export class UserService {
	constructor(private db: DBService) {
		this.db;
	}

	findAll() {
		return this.db.users.findMany();
	}

	findOne(id: number) {
		return this.db.users.findUnique({ where: { id } });
	}

	create(data: User) {
		return this.db.users.create({
			data: { username: data.username, email: data.email },
		});
	}

	remove(id: number) {
		return this.db.users.delete({ where: { id } });
	}
}
