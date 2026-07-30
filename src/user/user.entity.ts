import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number;
}