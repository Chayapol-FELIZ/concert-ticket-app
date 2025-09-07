import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';

import { Concerts, ConcertsSchema } from './schema/concerts.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Concerts.name, schema: ConcertsSchema }
        ]),
    ],
    controllers: [ConcertsController],
    providers: [ConcertsService],
    exports: [ConcertsService],
})
export class ConcertsModule { }