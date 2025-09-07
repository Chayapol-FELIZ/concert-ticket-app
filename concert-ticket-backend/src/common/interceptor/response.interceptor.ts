
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response, Request } from 'express';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        return next.handle().pipe(
            map((res) => {
                const message = typeof res?.message === 'string' ? res.message : 'OK';
                const data = res?.data ?? res;

                return {
                    statusCode: response.statusCode,
                    message,
                    data,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                };
            }),
        );
    }
}