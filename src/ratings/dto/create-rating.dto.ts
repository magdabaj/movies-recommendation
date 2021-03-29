import {IsNotEmpty, IsNumber} from "class-validator";
import {Timestamp} from "typeorm";

export class CreateRatingDto {
    @IsNotEmpty()
    rating: number;
}