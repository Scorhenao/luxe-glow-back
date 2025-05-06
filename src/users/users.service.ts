import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) {}

    async onModuleInit() {
        const userExists = await this.repo.findOneBy({
            email: 'admin@example.com',
        });
        if (!userExists) {
            const hash = await bcrypt.hash('123456', 10);
            const user = this.repo.create({
                email: 'admin@example.com',
                password: hash,
            });
            await this.repo.save(user);
            console.log('✅ User seeded');
        }
    }

    async findByEmail(email: string) {
        return this.repo.findOneBy({ email });
    }
}
