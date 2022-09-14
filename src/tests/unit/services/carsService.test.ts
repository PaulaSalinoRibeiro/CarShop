import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsMolde';
import CarsService from '../../../services/CarsService';
import { carsListOutput, carsObjInput, carsObjOutput } from '../../mocks/carsMock';

const { expect } = chai;

describe('CarsService', () => {

  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);


  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carsObjOutput);
    sinon.stub(carsModel, 'read').resolves(carsListOutput);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a new car', () => {
    it('should return a new car', async () => {
      const newCar = await carsService.create(carsObjInput);
      expect(newCar).to.be.deep.equal(carsObjOutput);
    });
  });

  describe('List cars', () => {
    it('should return list with cars', async () => {
      const listCars = await carsService.list();
      expect(listCars).to.be.deep.equal(carsListOutput);
    });
  });

});