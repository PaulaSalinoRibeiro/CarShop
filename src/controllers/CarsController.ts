import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarsController {
  constructor(private service: IService<ICar>) {}

  async create(req: Request, res: Response): Promise<Response | void> {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const result = await this.service.list();
    return res.status(200).json(result);
  }

  async listOne(req: Request, res: Response): Promise<Response> {
    const result = await this.service.listOne(req.params.id);
    if (!result) return res.status(404).json({ error: 'Object not found' });
    return res.status(200).json(result);
  }
}

export default CarsController;