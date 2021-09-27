import { Field, ObjectType } from 'type-graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import User from './User';

@ObjectType()
@Entity('events')
class Event {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;

    @Field()
    @Column()
    user_id: string;

    @Field()
    @Column()
    start_date: Date;

    @Field()
    @Column()
    end_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Event;
