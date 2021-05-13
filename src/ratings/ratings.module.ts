import {forwardRef, Module} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingRepository} from "./rating.repository";
import {UserModule} from "../user/user.module";
import {CsvModule} from "nest-csv-parser";
import {MoviesModule} from "../movies/movies.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingRepository]),
    UserModule,
    CsvModule,
    forwardRef((() => MoviesModule))
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
  exports: [RatingsService]
})
export class RatingsModule {}
