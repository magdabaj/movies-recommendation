import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    genres: string

    // @IsOptional()
    // description: string;
    //
    // @IsNotEmpty()
    // releaseDate: string;
}