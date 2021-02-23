import {IsDate, IsNotEmpty, IsOptional} from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsDate()
    releaseDate: Date;
}