import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Rating} from "../ratings/rating.entity";
import {Genre} from "../genre/genre.entity";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column("timestamp")
    releaseDate: Date;

    @OneToMany(type => Genre, genre => genre.movie, { eager: true })
    genres: Genre[]

    @OneToMany(type => Rating, rating => rating.movie, {eager: true})
    ratings: Rating[]
}