import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import HandleError from '../util/HandleError';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  private static message = 'InválidID';

  constructor(protected model = Model) {
    this.model = Model;
  }

  public async create(obj: T): Promise<T> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HandleError(400, MongoModel.message);
    return this.model.findOne({ id });
  }

  public async update(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HandleError(400, MongoModel.message);
    return this.model.findByIdAndUpdate(
      { id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HandleError(400, MongoModel.message);
    return this.model.findByIdAndDelete({ id });
  }
}