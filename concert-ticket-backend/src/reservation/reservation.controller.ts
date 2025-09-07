import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReserveSeatDto } from './dto/reserve.dto';

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationsService: ReservationService) { }

    @Post(':concertId')
    async reserve(
        @Param('concertId') concertId: string,
        @Body() dto: ReserveSeatDto) {
        return this.reservationsService.reserveSeat(dto.userId, dto.username, concertId);
    }

    @Patch(':concertId')
    async cancel(
        @Param('concertId') concertId: string,
        @Body() dto: ReserveSeatDto) {
        return this.reservationsService.cancelReservation(
            dto.userId,
            dto.username,
            concertId,
        );
    }

    @Get('me/:userId')
    async getMyReservations(@Param('userId') userId: string) {
        return this.reservationsService.getUserReservations(userId as string);
    }

    @Get()
    async getAllReservations() {
        return this.reservationsService.getAllReservations();
    }

    @Get('logs')
    async getReservationLogs() {
        return this.reservationsService.getAllLog();
    }

    @Get('summary')
    async getSummary() {
        return this.reservationsService.getReservationSummary();
    }
}
