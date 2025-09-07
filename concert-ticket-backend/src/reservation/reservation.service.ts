import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Reservation, ReservationDocument } from './schema/reservation.schema';
import { Concerts, ConcertsDocument } from 'src/concerts/schema/concerts.schema';
import { ReservationLog, ReservationLogDocument } from './schema/reservation-log.schema';

// @Injectable()
// export class ReservationService {
//     constructor(
//         @InjectModel(Reservation.name)
//         private reservationModel: Model<ReservationDocument>,

//         @InjectModel(Concerts.name)
//         private concertModel: Model<ConcertsDocument>,
//     ) { }

//     async reserveSeat(userId: string, concertId: string) {
//         const concert = await this.concertModel.findById(concertId);
//         if (!concert) throw new NotFoundException('Concert not found');

//         const existing = await this.reservationModel.findOne({ userId, concertId });
//         if (existing) throw new ConflictException('You already reserved this concert');

//         const reservedCount = await this.reservationModel.countDocuments({ concertId });
//         if (reservedCount >= concert.totalOfSeat) {
//             throw new ConflictException('Concert is sold out');
//         }

//         const reservation = new this.reservationModel({ userId, concertId });
//         return reservation.save();
//     }

//     async cancelReservation(userId: string, concertId: string) {
//         const res = await this.reservationModel.findOneAndDelete({ userId, concertId });
//         if (!res) throw new NotFoundException('Reservation not found');
//         return { message: 'Reservation cancelled' };
//     }

//     async getUserReservations(userId: string) {
//         return this.reservationModel.find({ userId }).populate('concertId');
//     }

//     async getAllReservations() {
//         return this.reservationModel.find().populate(['userId', 'concertId']);
//     }
// }


// import {
//     Injectable,
//     NotFoundException,
//     ConflictException,
//   } from '@nestjs/common';
//   import { InjectModel } from '@nestjs/mongoose';
//   import { Model, Types } from 'mongoose';
//   import {
//     Reservation,
//     ReservationDocument,
//   } from './schema/reservation.schema';
//   import { Concerts, ConcertsDocument } from './schema/concerts.schema';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name)
        private reservationModel: Model<ReservationDocument>,

        @InjectModel(Concerts.name)
        private concertModel: Model<ConcertsDocument>,

        @InjectModel(ReservationLog.name)
        private reservationLogModel: Model<ReservationLogDocument>,
    ) { }

    async reserveSeat(userId: string, username: string, concertId: string) {
        const concert = await this.concertModel.findById(concertId);
        if (!concert) throw new NotFoundException('Concert not found');

        const existing = await this.reservationModel.findOne({
            user: userId,
            concert: concertId,
            status: 'reserve',
        });

        if (existing)
            throw new ConflictException('You already reserved this concert');

        const reservedCount = await this.reservationModel.countDocuments({
            concert: concertId,
            status: 'reserve',
        });

        if (reservedCount >= concert.totalOfSeat) {
            throw new ConflictException('Concert is sold out');
        }

        const reservation = new this.reservationModel({
            user: userId,
            concert: concertId,
            status: 'reserve',
        });

        await reservation.save();

        await this.reservationLogModel.create({
            userId,
            username,
            action: 'reserve',
            concert: concertId,
        });

        return reservation;
    }

    async cancelReservation(userId: string, username: string, concertId: string) {
        const existing = await this.reservationModel.findOne({
            user: userId,
            concert: concertId,
            status: 'reserve',
        });

        if (!existing) throw new NotFoundException('Reservation not found');

        existing.status = 'cancel';
        await existing.save();

        await this.reservationLogModel.create({
            userId,
            username,
            action: 'cancel',
            concert: concertId,
        });

        return { message: 'Reservation cancelled' };
    }

    async getUserReservations(userId: string) {
        return this.reservationModel
            .find({ user: userId, status: 'reserve' })
    }

    async getAllReservations() {
        return this.reservationModel.find().populate('concert');
    }

    async getAllLog() {
        return this.reservationLogModel
            .find()
            .populate(['concert'])
            .sort({ createdAt: -1 });
    }

    async getReservationSummary() {
        const summary = await this.reservationModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        const result = {
            reserve: 0,
            cancel: 0,
            totalOfSeats: 0,
        };

        for (const item of summary) {
            result[item._id] = item.count;
        }

        const concertSum = await this.concertModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalOfSeat' },
                },
            },
        ]);

        result.totalOfSeats = concertSum[0]?.total || 0;

        return result;
    }
}

