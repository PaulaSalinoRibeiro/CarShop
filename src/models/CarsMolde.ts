import { model as moogoseCreateMode, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMoogoseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
}, {
  versionKey: false,
});

export default class CarsModel extends MongoModel<ICar> {
  constructor(model = moogoseCreateMode('Cars', carsMoogoseSchema)) {
    super(model);
  }
}