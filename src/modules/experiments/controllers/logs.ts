import { Request, Response } from 'express';

export const createExperimentLog = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ success: true, experimentId: id });
};