import {IsNotEmpty, IsNumber} from "class-validator";
import {MovieRatingEnum} from "../movie-rating.enum";
import {User} from "../../user/user.entity";
import {Movie} from "../../movies/movie.entity";

export class CreateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    value: MovieRatingEnum;

    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    movie: Movie;
}