import {IsNotEmpty, IsNumber} from "class-validator";
import {Timestamp} from "typeorm";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @IsNotEmpty()
    timestamp: string;
}