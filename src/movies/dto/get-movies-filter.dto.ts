import {IsDate, IsNotEmpty, IsOptional} from "class-validator";

export class GetMoviesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsDate()
    date: Date;
}