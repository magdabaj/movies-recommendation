import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RatingRepository} from "./rating.repository";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {User} from "../user/user.entity";
import {Rating} from "./rating.entity";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(RatingRepository)
        private ratingRepository: RatingRepository
    ) {}

    async createRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User,
    ): Promise<Rating> {
        return this.ratingRepository.createRating(createRatingDto, movieId, user)
    }
}
