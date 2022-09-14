import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarsModel from '../../../models/CarsMolde';
import { carsObjInput, carsObjOutput, carsListOutput } from '../../mocks/carsMock';

const { expect } = chai;


describe('CarsModel', () => {

  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carsObjOutput);
    sinon.stub(Model, 'find').resolves(carsListOutput);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a new Car', () => {
    it('should return a new car', async () => {
      const newCars = await carsModel.create(carsObjInput);
      expect(newCars).to.be.deep.equal(carsObjOutput);
    });
  });

  describe('List cars', () => {
    it('should returns a list with cars', async () => {
      const listCars = await carsModel.read();
      expect(listCars).to.be.deep.equal(carsListOutput);
    });
  });

});