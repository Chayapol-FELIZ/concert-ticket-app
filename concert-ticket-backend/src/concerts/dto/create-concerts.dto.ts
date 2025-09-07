import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateConcertDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsInt()
    @Min(1)
    totalOfSeat: number;

    @IsString()
    @IsNotEmpty()
    description: string;

}