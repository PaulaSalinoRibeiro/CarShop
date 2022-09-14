import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsMolde';
import CarsService from '../../../services/CarsService';
import { carsObjInput, carsObjOutput } from '../../mocks/carsMock';

const { expect } = chai;

describe('CarsService', () => {

  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);


  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carsObjOutput);
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

});