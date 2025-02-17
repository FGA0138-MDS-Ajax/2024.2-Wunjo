import { LoginUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';
import { notification_devices } from '@/server';

export default async function (req: Request, res: Response) {
    console.log("token added: ", req.body?.token);
    notification_devices.add(req.body?.token);
    console.log("all tokens: ", notification_devices);
    res.json({ message: "Token added" });
}
