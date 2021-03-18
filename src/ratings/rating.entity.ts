import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MovieRatingEnum} from "./movie-rating.enum";
import {Movie} from "../movies/movie.entity";
import {User} from "../user/user.entity";

@Entity()
export class Rating extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal")
    value: MovieRatingEnum;

    @ManyToOne(type => User, user => user.ratings, { primary: true })
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(type => Movie, movie => movie.ratings, { primary: true })
    @JoinColumn({ name: 'movie_id'})
    movie: Movie
}