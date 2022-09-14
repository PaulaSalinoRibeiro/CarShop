import IService from '../interfaces/IService';
import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import HandleError from '../util/HandleError';

class CarsService implements IService<ICar> {
  private carModel: IModel<ICar>;

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
}

export default CarsService;