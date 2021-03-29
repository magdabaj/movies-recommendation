import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, Unique} from "typeorm";
import {Movie} from "../movies/movie.entity";
import {User} from "../user/user.entity";

@Entity()
// @Unique(["user", "movieId"])
// todo set userId and movieId as unique
export class Rating extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "float", nullable: false})
    value: number;

    @Column({type: 'bigint', nullable: true})
    timestamp: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(type => User, user => user.ratings, { eager: false })
    user: User

    @PrimaryColumn()
    movieId: number

    @ManyToOne(type => Movie, movie => movie.ratings, { eager: false })
    movie: Movie
}