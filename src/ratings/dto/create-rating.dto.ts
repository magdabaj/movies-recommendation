import {IsNotEmpty, IsNumber} from "class-validator";
import {MovieRatingEnum} from "../movie-rating.enum";
import {Timestamp} from "typeorm";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    value: MovieRatingEnum;

    @IsNotEmpty()
    createdAt: Timestamp;
}