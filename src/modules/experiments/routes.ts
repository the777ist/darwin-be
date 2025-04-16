import { Router } from 'express';
import { getLiveExperiment } from './controllers/live';
import { getExperimentMetrics } from './controllers/metrics';
import { createExperimentLog } from './controllers/logs';

const router = Router();

router.get('/live', getLiveExperiment);
router.get('/:id/metrics', getExperimentMetrics);
router.post('/:id/logs', createExperimentLog);

export default router;