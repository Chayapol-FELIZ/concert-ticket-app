// reservation-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationLogDocument = ReservationLog & Document;

export type ReservationAction = 'reserve' | 'cancel';

@Schema({ timestamps: true })
export class ReservationLog {
    @Prop({ type: String, enum: ['reserve', 'cancel'], required: true })
    action: ReservationAction;
    
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: Types.ObjectId, ref: 'Concerts', required: true })
    concert: Types.ObjectId;
}

export const ReservationLogSchema = SchemaFactory.createForClass(ReservationLog);