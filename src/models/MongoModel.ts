import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import HandleError from '../util/HandleError';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  private static message = 'Inválid ID';
  protected _model: Model<T>;

  // Pq a Model do moogose permite passar um generic?
  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HandleError(404, 'Object not found');
    return this._model.findOne({ _id });
  }

  public async update(_id: string, obj:Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HandleError(400, MongoModel.message);
    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HandleError(400, MongoModel.message);
    return this._model.findByIdAndDelete({ _id });
  }
}