import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
