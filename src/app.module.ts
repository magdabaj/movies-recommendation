import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { RatingsModule } from './ratings/ratings.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      MoviesModule,
      RatingsModule,
      UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
