import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { GoogleAuthUser } from './GoogleAuthUser'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @OneToOne(() => GoogleAuthUser, {
        cascade: true,
    })
    @JoinColumn()
    google: GoogleAuthUser
}
