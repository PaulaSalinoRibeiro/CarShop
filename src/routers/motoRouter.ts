import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

const motoRouter = Router();

motoRouter.post('/', (req, res) => motorcycleController.create(req, res));
motoRouter.get('/', (req, res) => motorcycleController.list(req, res));
motoRouter.get('/:id', (req, res) => motorcycleController.listOne(req, res));
motoRouter.put('/:id', (req, res) => motorcycleController.update(req, res));
motoRouter.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default motoRouter;