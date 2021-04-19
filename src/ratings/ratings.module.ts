import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingRepository} from "./rating.repository";
import {UserModule} from "../user/user.module";
import {CsvModule} from "nest-csv-parser";

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingRepository]),
    UserModule,
    CsvModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
  exports: [RatingsService]
})
export class RatingsModule {}
