import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const isHttp = exception instanceof HttpException;
        const status = isHttp
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const res =
            isHttp && typeof exception.getResponse() === 'object'
                ? exception.getResponse() as Record<string, any>
                : { message: (exception as any).message || 'Internal Server Error' };

        response.status(status).json({
            statusCode: status,
            message: res.message || 'Error',
            error: res.error || HttpStatus[status],
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}