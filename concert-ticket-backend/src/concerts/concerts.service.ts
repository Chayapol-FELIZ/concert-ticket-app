import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateConcertDto } from './dto/create-concerts.dto';

import { Concerts, ConcertsDocument } from './schema/concerts.schema';
// import { Reservation, ReservationDocument } from '../reservation/schema/reservation.schema';

@Injectable()
export class ConcertsService {
    constructor(
        @InjectModel(Concerts.name)
        // @InjectModel(Reservation.name)
        private concertModel: Model<ConcertsDocument>,
        // private reservationModel: Model<ReservationDocument>,
    ) { }

    async create(createConcertDto: CreateConcertDto): Promise<Concerts> {
        return this.concertModel.create(createConcertDto);
    }

    async findAll(): Promise<Concerts[]> {
        return this.concertModel.find().exec();
    }

    async findOne(id: string): Promise<Concerts> {
        const concert = await this.concertModel.findById(id);
        if (!concert) throw new NotFoundException('Concert not found');
        return concert;
    }

    async remove(id: string): Promise<void> {
        const res = await this.concertModel.findByIdAndDelete(id);
        if (!res) throw new NotFoundException('Concert not found');
    }

    // async reserveSeat(concertId: string, userId: string): Promise<Reservation> {
    //     const concert = await this.concertModel.findById(concertId);
    //     if (!concert) throw new NotFoundException('Concert not found');

    //     const existing = await this.reservationModel.findOne({ concert: concertId, user: userId });
    //     if (existing) throw new BadRequestException('Already reserved');

    //     const totalReservations = await this.reservationModel.countDocuments({ concert: concertId });
    //     if (totalReservations >= concert.totalOfSeat) {
    //         throw new BadRequestException('No seats available');
    //     }

    //     const reserved = new this.reservationModel({ concert: concertId, user: userId });
    //     return reserved.save();
    // }

    // async cancelReservation(concertId: string, userId: string): Promise<void> {
    //     const result = await this.reservationModel.findOneAndDelete({ concert: concertId, user: userId });
    //     if (!result) throw new NotFoundException('Reservation not found');
    // }

    // async getUserReservations(userId: string): Promise<Reservation[]> {
    //     return this.reservationModel.find({ user: userId }).populate('concert').exec();
    // }

    // async getAllReservations(): Promise<Reservation[]> {
    //     return this.reservationModel.find().populate('user concert').exec();
    // }
}
