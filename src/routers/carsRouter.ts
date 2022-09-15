import { Router } from 'express';
import CarsModel from '../models/CarsMolde';
import CarsService from '../services/CarsService';
import CarsController from '../controllers/CarsController';

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsController = new CarsController(carsService);

const carsRouter = Router();

carsRouter.post('/', (req, res) => carsController.create(req, res));
carsRouter.get('/', (req, res) => carsController.list(req, res));
carsRouter.get('/:id', (req, res) => carsController.listOne(req, res));
carsRouter.put('/:id', (req, res) => carsController.update(req, res));

export default carsRouter;