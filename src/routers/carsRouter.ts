import { Router } from 'express';
import CarsModel from '../models/CarsMolde';
import CarsService from '../services/CarsService';
import CarsController from '../controllers/CarsController';

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

const carsRouter = Router();

carsRouter.post('/', (req, res) => carsController.create(req, res));

export default carsRouter;