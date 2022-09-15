import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsMolde';
import CarsService from '../../../services/CarsService';
import { carsListOutput, carsObjInput, carsObjOutput } from '../../mocks/carsMock';
import { ICar } from '../../../interfaces/ICar';

const { expect } = chai;

describe('CarsService', () => {

  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);


  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carsObjOutput);
    sinon.stub(carsModel, 'read').resolves(carsListOutput);
    sinon.stub(carsModel, 'readOne').resolves(carsObjOutput);
    sinon.stub(carsModel, 'update').resolves(carsObjOutput);
    sinon.stub(carsModel, 'delete').resolves();
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

  describe('Update a car', () => {
    it('should update a car id right id', async () => {
      const carUpdate = await carsService.update(carsObjOutput._id, carsObjInput);
      expect(carUpdate).to.be.deep.equal(carsObjOutput);
    });

    it('should throw a error if worng id', async () => {
      try {
        await carsService.update('632231a9c9b779b39ada8040', carsObjInput);
      } catch (err: any) {
        expect(err.message).to.be.equal('Object not found')
      }
    });
  });

  it('should throw a error if worng body',  async () => {
    try {
      await carsService.update(carsObjOutput._id, {} as ICar);
    } catch (err: any) {
      expect(err.message).to.be.equal('Invalis fields')
    }
  });

  describe('Delete a car', () => {
    it('should returns null if id is correct', async () => {
      const carDelete = await carsService.delete(carsObjOutput._id);
      expect(carDelete).to.be.undefined;
    });

    it('should throw error if id id invalid', async () => {
      try {
        await carsService.delete('632231a9c9b779b39ada8040');
      } catch (err:any) {
        expect(err.message).to.be.equal('Object not found')
      }
    });
  });

});