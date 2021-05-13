import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {UserCredentialsDto} from "./dto/user-credentials.dto";
import {User} from "./user.entity";
import {SigninCredentialsDto} from "./dto/signin-credentials.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadInterface} from "./jwt-payload.interface";
import {CsvParser} from "nest-csv-parser";
import * as fs from "fs";
import {Rating} from "../ratings/rating.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private csvParser: CsvParser,
    ) {}

    async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
        return this.userRepository.signUp(userCredentialsDto)
    }

    async signIn(signinCredentialsDto: SigninCredentialsDto): Promise<{
        accessToken: string,
        user: JwtPayloadInterface
    }> {
        const email = await this.userRepository.validateUserPassword(signinCredentialsDto)

        if (!email) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayloadInterface = { email }

        const accessToken = await this.jwtService.sign(payload)

        return { accessToken, user: payload }
    }

     async insertUsers(): Promise<void> {
         const stream = fs.createReadStream('./src/ratings/data/ratings.csv')
         const ratings = await this.csvParser.parse(stream, Rating, null,null,{ strict: true, separator: ',' })
         await this.userRepository.insertUsers(ratings)
     }

}
