import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { log } from 'console';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class Authrization implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req: IncomingMessage = context.switchToHttp().getRequest();
		let token = req.headers.authorization;
		log(token);
		return true;
	}
}
