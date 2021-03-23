import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    UserModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
