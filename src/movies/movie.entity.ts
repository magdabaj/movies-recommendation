import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    releaseDate: Date;

    @OneToMany(type => RatingEntity, rating => rating.movie, {eager: true})
    ratings: RatingEntity[]
}