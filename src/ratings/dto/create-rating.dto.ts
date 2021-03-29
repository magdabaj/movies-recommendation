import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateRatingDto {
    @IsNotEmpty()
    rating: number;
}