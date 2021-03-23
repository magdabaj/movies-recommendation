import {Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {RatingsService} from "./ratings.service";
import {Rating} from "./rating.entity";
import {CreateRatingDto} from "./dto/create-rating.dto";

@Controller('ratings')
@UseGuards(AuthGuard())
export class RatingsController {
    constructor(private ratingsService: RatingsService) {}

    @Post('/:movieId')
    @UsePipes(ValidationPipe)
    createRating(
        @Param('movieId', ParseIntPipe) movieId: number,
        @Body() createRatingDto: CreateRatingDto,
        @Req() req,
    ): Promise<Rating> {
        return this.ratingsService.createRating(createRatingDto, movieId, req.user)
    }
}
