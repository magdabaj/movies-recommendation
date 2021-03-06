import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post, Put,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {RatingsService} from "./ratings.service";
import {Rating} from "./rating.entity";
import {CreateRatingDto} from "./dto/create-rating.dto";

@Controller('ratings')
export class RatingsController {
    constructor(private ratingsService: RatingsService) {}

    @UseGuards(AuthGuard())
    @Post('/:movieId')
    @UsePipes(ValidationPipe)
    createRating(
        @Param('movieId', ParseIntPipe) movieId: number,
        @Body() createRatingDto: CreateRatingDto,
        @Req() req,
    ): Promise<Rating> {
        return this.ratingsService.createRating(createRatingDto, movieId, req.user)
    }

    @UseGuards(AuthGuard())
    @Put('/:movieId')
    @UsePipes(ValidationPipe)
    changeRating(
        @Param('movieId', ParseIntPipe) movieId: number,
        @Body() createRatingDto: CreateRatingDto,
        @Req() req,
    ): Promise<Rating> {
        return this.ratingsService.changeRating(createRatingDto, movieId, req.user)
    }

    @Get('/:movieId')
    getMovieRatings(
        @Param('movieId', ParseIntPipe) movieId: number,
    ): Promise<Rating[]> {
        return this.ratingsService.getMovieRatings(movieId)
    }

    @UseGuards(AuthGuard())
    @Get()
    getUserRatings(
        @Req() req,
    ): Promise<Rating[]> {
        return this.ratingsService.getUserRatings(req.user)
    }

    @UseGuards(AuthGuard())
    @Get('/user/:movieId')
    getMovieRatingForUser(
        @Req() req,
        @Param('movieId', ParseIntPipe) movieId: number,
    ): Promise<Rating> {
        return this.ratingsService.getMovieRatingForUser(movieId, req.user)
    }

    @Post('/')
    insertRatings(): Promise<void> {
        return this.ratingsService.insertRatings()
    }
}
