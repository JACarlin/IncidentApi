import {Router} from 'express';
import {Request, Response} from 'express';
import { IncidentController } from './controller';

export class IncidentRoutes{

    static get routes(): Router{
        const router = Router();
        const incidentController = new IncidentController();
        router.get("/", incidentController.getIncidents);
        router.post("/", incidentController.createIncident);
        router.get("/:id", incidentController.getIncidentByID);
        router.put("/:id", incidentController.getIncidentByID);
        router.delete("/:id", incidentController.getIncidentByID);
        return router;
    }
}