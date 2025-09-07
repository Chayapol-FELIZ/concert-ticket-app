import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ConcertsDocument = Concerts & Document;

@Schema({ timestamps: true })
export class Concerts {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, min: 1 })
    totalOfSeat: number;

    @Prop({ default: '' })
    description: string;
}

export const ConcertsSchema = SchemaFactory.createForClass(Concerts);