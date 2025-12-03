import {
	CallHandler,
	CanActivate,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { log } from 'console';
import { Observable, tap } from 'rxjs';

@Injectable()
export class Auth implements CanActivate {
	canActivate(ctx: ExecutionContext) {
		const req = ctx.switchToHttp().getRequest();
		return req.headers.authrization === 'SEC';
	}
}

@Injectable()
export class Log implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		log('befor');
		return next.handle().pipe(
			tap(() => {
				log('after');
			}),
		);
	}
}
