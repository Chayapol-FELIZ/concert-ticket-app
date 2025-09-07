import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;


export type ReservationStatus = 'reserve' | 'cancel';

@Schema({ timestamps: true })
export class Reservation {
    @Prop({ type: String, required: true })
    user: string;

    @Prop({ type: Types.ObjectId, ref: 'Concerts', required: true })
    concert: Types.ObjectId;

    @Prop({ type: String, enum: ['reserve', 'cancel'], default: 'reserve' })
    status: ReservationStatus;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);