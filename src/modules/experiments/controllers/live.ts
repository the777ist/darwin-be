import { Request, Response } from "express";
import { generateExperimentData } from "../../../utils/dataGenerator";

export const getLiveExperiment = (req: Request, res: Response) => {
  const data = generateExperimentData();
  res.json(data);
};
