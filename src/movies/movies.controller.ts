import {
    Body,
    Controller,
    Delete,
    Get, HttpService,
    Param,
    ParseIntPipe,
    Post,
    Query, Req, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {Movie} from "./movie.entity";
import {RatingsService} from "../ratings/ratings.service";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../user/user.entity";
import {PaginatedMoviesResultDto} from "./dto/paginated-movies-result.dto";

@Controller('movies')
export class MoviesController {
    constructor(
        private moviesService: MoviesService,
        private ratingsService: RatingsService,
        private httpService: HttpService,
    ) {}

    async getRecommendedMovies(user: User): Promise<Movie[]> {
        const movies = await this.moviesService.getMovies()
        //todo maybe authorize?
        const ratings = await this.ratingsService.getRatings()

        const response = await this.httpService.post(
            `http://127.0.0.1:5000/recommend/${user.id}`,
            {'movies': movies, 'ratings': ratings})
            .toPromise()
        return response.data
    }

    @Post('/recommend')
    @UseGuards(AuthGuard())
    getRecommendations(@Req() req) {
        return this.getRecommendedMovies(req.user)
    }

    @Get()
    getMovies(@Query(ValidationPipe) filterDto: GetMoviesFilterDto): Promise<PaginatedMoviesResultDto> {
        return this.moviesService.getMovies(filterDto)
    }

    @Get('/:id')
    getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
        return this.moviesService.getMovieById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createMovie(): Promise<void> {
        return this.moviesService.createMovie();
    }

    @Delete('/:id')
    deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.moviesService.deleteMovie(id);
    }

    // @Patch(`/:id`)
    // addRating(
    //     @Param('id') id: string,
    //     @Body('rating', MovieRatingValidationPipe) rating: object
    // ): Movie {
    //     return this.moviesService.addRating(id,rating)
    // }

}
