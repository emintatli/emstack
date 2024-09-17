import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class GoogleAuthUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    picture: string

    @Column({ type: 'varchar', length: 255 })
    given_name: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 4096 })
    access_token: string

    @Column({ type: 'varchar', length: 4096, nullable: true })
    refresh_token: string | null

    @Column({ type: 'varchar', length: 4096 })
    id_token: string

    @Column({ type: 'timestamp' })
    expiry_date: Date
}
