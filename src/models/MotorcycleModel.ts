import { model as moogoseCreateMode, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motoMoogoseSchema = new Schema({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false,
});

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = moogoseCreateMode('Motorcycle', motoMoogoseSchema)) {
    super(model);
  }
}