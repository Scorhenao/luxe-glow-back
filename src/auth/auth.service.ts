import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    async login(LoginDto: LoginDto) {
        const { email, password } = LoginDto;
        const user = await this.validateUser(email, password);
        const payload = { sub: user.id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }

    async validateToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (err: any) {
            console.log(err);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
