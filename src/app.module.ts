import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { RatingsModule } from './ratings/ratings.module';
import { UserModule } from './user/user.module';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      MoviesModule,
      RatingsModule,
      UserModule,
      ClientsModule.register([
          {
              name: 'RECOMMENDER_SERVICE',
              transport: Transport.TCP,
              options: {
                  host: 'localhost',
                  port: 8000,
              }
          },
      ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
