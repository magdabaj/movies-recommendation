import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {MovieRatingValidationPipe} from "./pipes/movie-rating-validation.pipe";
import {Movie} from "./movie.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    getMovies(@Query(ValidationPipe) filterDto: GetMoviesFilterDto) {
        return this.moviesService.getMovies(filterDto)
    }

    @Get('/:id')
    getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
        return this.moviesService.getMovieById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.createMovie(createMovieDto)
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
