import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const AuthController = {
    async register(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const { user, token } = await AuthService.register(username, password);
            res.status(201).json({ user, token });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const { token } = await AuthService.login(username, password);
            res.status(200).json({ token });
        } catch (err: any) {
            res.status(401).json({ error: err.message });
        }
    }
};
