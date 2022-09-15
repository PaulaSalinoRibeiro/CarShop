import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcycleController {
  private service: IService<IMotorcycle>;

  constructor(motoService: IService<IMotorcycle>) {
    this.service = motoService;
  }

  public async create(req:Request, res:Response): Promise<Response> {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }

  public async list(req:Request, res:Response): Promise<Response> {
    const result = await this.service.list();
    return res.status(200).json(result);
  }

  public async listOne(req:Request, res:Response): Promise<Response> {
    const result = await this.service.listOne(req.params.id);
    if (!result) return res.status(404).json({ error: 'Object not found' });
    return res.status(200).json(result);
  }

  public async update(req:Request, res: Response): Promise<Response> {
    const result = await this.service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res:Response): Promise<Response> {
    await this.service.delete(req.params.id);
    return res.status(204).json();
  }
}

export default MotorcycleController;