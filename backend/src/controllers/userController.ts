import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    const { email, name, surname, password } = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                surname,
                password: hashedPassword,
            },
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering new user.' });
    }
};
