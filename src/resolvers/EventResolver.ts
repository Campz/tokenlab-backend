import { Mutation, Resolver, Arg, Query, Authorized, Ctx } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Request } from 'express';
import Event from '../models/Event';
import CreateEventService from '../services/CreateEventService';
import { parseISO } from 'date-fns';

interface Context {
    req: Request;
    token?: string;
}

@Resolver()
class EventResolver {
    @Query(() => [Event]!)
    @Authorized()
    async events(@Ctx() context: Context) {
        const user_id = context.req.user.id;

        const eventsRepository = getRepository(Event);

        const events = await eventsRepository.find({ user_id });

        return events;
    }

    @Mutation(() => Event)
    @Authorized()
    async createEvent(
        @Arg('description') description: string,
        @Arg('start_date') start_date: string,
        @Arg('end_date') end_date: string,
        @Ctx() context: Context,
    ) {
        const user_id = context.req.user.id;

        const eventService = new CreateEventService();

        const createdEvent = await eventService.execute({
            user_id,
            description,
            start_date,
            end_date,
        });

        return createdEvent;
    }

    @Mutation(() => Event)
    @Authorized()
    async updateEvent(
        @Arg('id') id: string,
        @Arg('description') description: string | null,
        @Arg('start_date') start_date: string | null,
        @Arg('end_date') end_date: string | null,
    ) {
        const eventsRepository = getRepository(Event);

        const event = await eventsRepository.findOne({ id });

        if (!event) {
            throw new Error('Event not found.');
        }

        if (description) {
            event.description = description;
        }

        if (start_date) {
            event.start_date = parseISO(start_date);
        }

        if (end_date) {
            event.end_date = parseISO(end_date);
        }

        await eventsRepository.save(event);

        return event;
    }

    @Mutation(() => Boolean)
    @Authorized()
    async deleteEvent(@Arg('id') id: string) {
        const eventsRepository = getRepository(Event);

        const event = await eventsRepository.findOne({ id });

        if (!event) {
            throw new Error('Event not found.');
        }

        await eventsRepository.delete({ id });

        return true;
    }
}

export default EventResolver;
