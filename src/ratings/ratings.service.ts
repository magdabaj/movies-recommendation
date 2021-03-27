import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RatingRepository} from "./rating.repository";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {User} from "../user/user.entity";
import {Rating} from "./rating.entity";
import {CsvParser} from "nest-csv-parser";
import * as fs from "fs";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(RatingRepository)
        private ratingRepository: RatingRepository,
        private csvParser: CsvParser,
    ) {}

    async createRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User,
    ): Promise<Rating> {
        return this.ratingRepository.createRating(createRatingDto, movieId, user)
    }

    async insertRatings(): Promise<void> {
        const stream = fs.createReadStream('./src/ratings/data/ratings.csv')
        const ratings = await this.csvParser.parse(stream, Rating, null,null,{ strict: true, separator: ',' })
        await this.ratingRepository.insertRatings(ratings.list)
    }
}
