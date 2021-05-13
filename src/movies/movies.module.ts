import {HttpModule, Module, UseGuards} from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {CsvModule} from "nest-csv-parser";
import {RatingsModule} from "../ratings/ratings.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    CsvModule,
    RatingsModule,
    HttpModule.register({
      maxBodyLength: Infinity
    }),
    UserModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
