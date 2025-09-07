import { IsNotEmpty, IsString } from 'class-validator';

export class ReserveSeatDto {
    @IsString()
    userId: string;

    @IsString()
    username: string;
}