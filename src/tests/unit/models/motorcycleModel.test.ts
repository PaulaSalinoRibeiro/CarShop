import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { motorcycleList, motorcycleObjInput, motorcycleObjOutput } from '../../mocks/motorcycleMock';

const { expect } = chai;

describe('Motorcycle Model', () => {

  const motocycleModel = new MotorcycleModel();
  const WRONG_ID = "4edd40c86762e0fb12000xxx";
  
  before(async () => {

    sinon.stub(Model, 'create').resolves(motorcycleObjOutput);
    sinon.stub(Model, 'find').resolves(motorcycleList);
    sinon.stub(Model, 'findOne').resolves(motorcycleObjOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleObjOutput);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleObjOutput);

  });

  after(() => {
    sinon.restore();
  });

  describe('Create a new motorcycle', () => {
    it('should be create a new motocycle', async () => {
      const result = await motocycleModel.create(motorcycleObjInput);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });
  });

  describe('List all motorcycles', () => {
    it('should return an array', async () => {
      const result = await motocycleModel.read();
      expect(result).to.be.deep.equal(motorcycleList)
    });
  });

  describe('Find One', () => {
    it('should return a motrcycle if id is correct', async () => {
      const result = await motocycleModel.readOne(motorcycleObjOutput._id);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });

    it('should throw a erro if id is invalid', async () => {
      try {
        await motocycleModel.readOne(WRONG_ID);
      } catch (err: any) {
        expect(err.message).to.be.equal('Object not found');
      }
    });
  });

  describe('Update a motorcycle', () => {
    it('should updated and return a motorcycle object', async () => {
      const result = await motocycleModel.update(motorcycleObjOutput._id, motorcycleObjInput);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });

    it('should throw a erro if id is invalid', async () => {
      try {
        await motocycleModel.update(WRONG_ID, motorcycleObjInput);
      } catch (err:any) {
        expect(err.message).to.be.equal('Inválid ID');
      }
    });
  });

  describe('Delete', () => {
    it('should possible delete if id is correct', async () => {
      const result = await motocycleModel.delete(motorcycleObjOutput._id);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });

    it('should throw a erroif id is wrong', async () => {
      try {
        await motocycleModel.delete(WRONG_ID);
      } catch (err:any) {
        expect(err.message).to.be.equal('Inválid ID');
      }
    });
  });
});