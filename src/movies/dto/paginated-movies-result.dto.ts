import {Movie} from "../movie.entity";

export class PaginatedMoviesResultDto {
    data: Movie[]
    page: number
    limit: number
    totalCount: number
}