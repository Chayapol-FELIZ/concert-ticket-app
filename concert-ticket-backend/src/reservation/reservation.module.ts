import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schema/reservation.schema';
import { ReservationLog, ReservationLogSchema } from './schema/reservation-log.schema';
import { Concerts, ConcertsSchema } from 'src/concerts/schema/concerts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: ReservationLog.name, schema: ReservationLogSchema },
      { name: Concerts.name, schema: ConcertsSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule { }
