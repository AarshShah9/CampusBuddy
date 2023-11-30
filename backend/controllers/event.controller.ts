import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// test Event
export const eventTest = async (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Event endpoint works' });
};

// Create new Event
export const createNewEvent = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            title,
            description,
            location,
            startTime,
            endTime,
            mediaUrl,
        } = req.body;
        const newEvent = await prisma.event.create({
            data: {
                userId,
                createdAt: new Date(), // define this explicitly, or leave to MySQL default NOW()?
                title,
                description,
                location,
                startTime,
                endTime,
                mediaUrl,
            },
        });

        res.status(201).json(newEvent);
    } catch (error: any) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all Events
const getAllEvents = async (req: Request, res: Response) => {
    try {
        const allEvents = await prisma.event.findMany();
        res.status(200).json(allEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Event by Id
const getEventById = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id);
        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
            },
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Event
const updateEvent = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id);
        const { title, description, location, startTime, endTime, mediaUrl } =
            req.body;

        const updatedEvent = await prisma.event.update({
            where: {
                id: eventId,
            },
            data: {
                title,
                description,
                location,
                startTime,
                endTime,
                mediaUrl,
            },
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.id);
        await prisma.event.delete({
            where: {
                id: eventId,
            },
        });

        res.status(204).send(); // No content after successful deletion
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
