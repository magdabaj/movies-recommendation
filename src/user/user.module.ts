import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {CsvModule} from "nest-csv-parser";

@Module({
  imports: [
      TypeOrmModule.forFeature([UserRepository]),
      JwtModule.register({
          secret: 'IAmIronMan',
          signOptions: {
              expiresIn: 3600,
          }
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      CsvModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
