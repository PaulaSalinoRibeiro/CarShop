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
    sinon.stub(carsModel, 'readOne').resolves(carsObjOutput);
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

  describe('FindOne car', () => {
    it('should return a car if right id', async () => {
      const car = await carsService.listOne(carsObjOutput._id);
      expect(car).to.be.deep.equal(carsObjOutput);
    });

    it('should throw erro if id.length is small that 24 characters', async () => {
      try {
        await carsService.listOne('wrong_id');
      } catch(err: any) {
        expect(err.message).to.be.equal('Id must have 24 hexadecimal characters');
      }
    });
  });

});