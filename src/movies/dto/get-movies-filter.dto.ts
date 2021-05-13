import {IsNotEmpty, IsOptional} from "class-validator";

export class GetMoviesFilterDto {
    @IsOptional()
    // @IsNotEmpty()
    search: string;

    // todo remove isOptional
    @IsOptional()
    @IsNotEmpty()
    page: number

    @IsOptional()
    @IsNotEmpty()
    limit: number

    // todo add sorting by date
    // @IsOptional()
    // @IsNotEmpty()
    // date: string;
}