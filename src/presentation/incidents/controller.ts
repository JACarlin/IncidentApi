import {Request, Response} from 'express';
import { IncidentModel } from '../../data/models/incident.model';

export class IncidentController{
    public getIncidents = async (req: Request, res:Response)=>{
        try {
            const incidents = await IncidentModel.find();
            res.json(incidents);
        } catch (error) {
    
        }
    }
    public createIncident = async (req:Request, res:Response)=>{
        try {
            const {title, description, lat, lng} = req.body;
            const newIncident = await IncidentModel.create({
                title, description, lat, lng});
    
            return res.json(newIncident);
        }
        catch (error) {
    
        }
    }
    public getIncidentByID = async (req:Request, res:Response)=>{
        const {id} = req.params;
        try{
            const incident = await IncidentModel.findById(id);
            res.json(incident);
        }catch(error){
            console.error(error);
        }
    }
    public updateIncident = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const {title, description, lat, log} = req.body;
        try{
            const incident = await IncidentModel.findByIdAndUpdate(id,{
                title,
                description,
                lat,
                log
            });
            res.json(incident);
        }catch(error){
            console.error(error);
        }
    }
    public deleteIncident = async (req:Request, res:Response)=>{
        const {id} = req.params;
        try{
            const incident = await IncidentModel.findByIdAndDelete(id);
            res.json(incident);
        }catch(error){
            console.error(error);
        }
    }

}