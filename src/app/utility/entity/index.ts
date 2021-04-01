import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('timestamp with time zone')
    created_at?: Date;

    @Column('timestamp with time zone')
    updated_at?: Date;
} 