import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {UserCredentialsDto} from "./dto/user-credentials.dto";
import {User} from "./user.entity";
import {SigninCredentialsDto} from "./dto/signin-credentials.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadInterface} from "./jwt-payload.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
        return this.userRepository.signUp(userCredentialsDto)
    }

    async signIn(signinCredentialsDto: SigninCredentialsDto): Promise<{ accessToken: string }> {
        const email = await this.userRepository.validateUserPassword(signinCredentialsDto)

        if (!email) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayloadInterface = { email }

        const accessToken = await this.jwtService.sign(payload)

        return { accessToken }
    }

}
