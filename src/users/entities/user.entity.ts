import { BaseEntity } from 'src/common/baseEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
