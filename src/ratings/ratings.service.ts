import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RatingRepository} from "./rating.repository";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {User} from "../user/user.entity";
import {Rating} from "./rating.entity";
import {CsvParser} from "nest-csv-parser";
import * as fs from "fs";
import {MoviesService} from "../movies/movies.service";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(RatingRepository)
        private ratingRepository: RatingRepository,
        private csvParser: CsvParser,
        private moviesService: MoviesService,
    ) {}

    async createRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User,
    ): Promise<Rating> {
        const movie = await this.moviesService.getMovieById(movieId)
        return this.ratingRepository.createRating(createRatingDto, movieId, user, movie)
    }

    async getRatings(): Promise<Rating[]> {
        return this.ratingRepository.getRatings()
    }

    async getMovieRatings(movieId: number): Promise<Rating[]> {
        return this.ratingRepository.getMovieRatings(movieId)
    }

    async getUserRatings(user: User): Promise<Rating[]> {
        return this.ratingRepository.getUserRatings(user)
    }

    async getMovieRatingForUser(movieId: number, user: User): Promise<Rating> {
        return this.ratingRepository.getMovieRatingForUser(movieId, user)
    }

    async insertRatings(): Promise<void> {
        const stream = fs.createReadStream('./src/ratings/data/ratings.csv')
        const ratings = await this.csvParser.parse(stream, Rating, null,null,{ strict: true, separator: ',' })
        await this.ratingRepository.insertRatings(ratings.list)
    }

    async changeRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User
    ): Promise<Rating> {
        return this.ratingRepository.changeRating(createRatingDto, movieId, user)
    }
}
