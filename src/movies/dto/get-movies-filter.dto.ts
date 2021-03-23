import {IsNotEmpty, IsOptional} from "class-validator";

export class GetMoviesFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;
    //
    // @IsOptional()
    // @IsNotEmpty()
    // date: string;
}