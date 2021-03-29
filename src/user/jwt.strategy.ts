
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {JwtPayloadInterface} from "./jwt-payload.interface";
import {User} from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'IAmIronMan'
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User> {
        const { email } = payload
        const user = await this.userRepository.findOne({ email })

        if (!user) throw new UnauthorizedException()

        return user
    }
}