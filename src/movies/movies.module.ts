import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {CsvModule} from "nest-csv-parser";

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    CsvModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
