import IService from '../interfaces/IService';
import { IMotorcycle, motoSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import HandleError from '../util/HandleError';

class MotorcycleService implements IService<IMotorcycle> {
  private motorcycleModel: IModel<IMotorcycle>;
  private static MIN_LENGTH = 24;

  constructor(model: IModel<IMotorcycle>) {
    this.motorcycleModel = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motoSchema.safeParse(obj);
    if (!parsed.success) throw new HandleError(400, 'Invalid fields');
    return this.motorcycleModel.create(obj);
  }

  public async list(): Promise<IMotorcycle[]> {
    return this.motorcycleModel.read();
  }

  public async listOne(_id: string): Promise<IMotorcycle | null> {
    if (_id.length < MotorcycleService.MIN_LENGTH) {
      throw new HandleError(400, 'Id must have 24 hexadecimal characters');
    }

    const motorcycle = await this.motorcycleModel.readOne(_id);
    return motorcycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const exist = await this.listOne(_id);
    if (!exist) throw new HandleError(404, 'Object not found');
    const parsed = motoSchema.safeParse(obj);
    if (!parsed.success) throw new HandleError(400, 'Invalid fields');
    return this.motorcycleModel.update(_id, obj);
  }

  public async delete(_id: string): Promise<void> {
    const exist = await this.listOne(_id);
    if (!exist) throw new HandleError(404, 'Object not found');
    
    await this.motorcycleModel.delete(_id);
  }
}

export default MotorcycleService;