import IService from '../interfaces/IService';
import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import HandleError from '../util/HandleError';

class CarsService implements IService<ICar> {
  private carModel: IModel<ICar>;
  private static MIN_LENGTH = 24;

  constructor(model: IModel<ICar>) {
    this.carModel = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) throw new HandleError(400, 'Invalid fields');
    return this.carModel.create(obj);
  }

  public async list(): Promise<ICar[]> {
    return this.carModel.read();
  }

  public async listOne(id: string): Promise<ICar | null> {
    if (id.length < CarsService.MIN_LENGTH) {
      throw new HandleError(400, 'Id must have 24 hexadecimal characters');
    }
    
    const car = await this.carModel.readOne(id);
    
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const exist = await this.listOne(_id);
    if (!exist) throw new HandleError(404, 'Object not found');
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) throw new HandleError(400, 'Invalis fields');
    const carUpdated = await this.carModel.update(_id, obj);
    return carUpdated;
  }
}

export default CarsService;