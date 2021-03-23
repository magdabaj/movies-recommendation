import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingRepository} from "./rating.repository";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingRepository]),
    UserModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController]
})
export class RatingsModule {}
