import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MovieRatingEnum} from "./movie-rating.enum";
import {Movie} from "../movies/movie.entity";
import {User} from "../user/user.entity";

@Entity()
export class Rating extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal")
    rating: MovieRatingEnum;

    @ManyToOne(type => User, user => user.ratings, { eager: false })
    user: User

    @ManyToOne(type => Movie, movie => movie.ratings)
    movie: Movie
}