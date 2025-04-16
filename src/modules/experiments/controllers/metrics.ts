import { Request, Response } from 'express';
import { generateExperimentData } from '../../../utils/dataGenerator';

export const getExperimentMetrics = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = generateExperimentData();
    res.json({ ...data, experimentId: id });
};