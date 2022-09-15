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
    sinon.stub(Model, 'findOne').resolves(carsObjOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carsObjOutput);
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

  describe('Find a car by id', () => {
    it('shoult return a car', async () => {
      const car = await carsModel.readOne('632231a9c9b779b39ada8047');
      expect(car).to.be.deep.equal(carsObjOutput);
    });

    it('should throw a error Object not found', async () => {
      try {
        await carsModel.readOne('632231a9c9b779b39ada8048');
      } catch (error: any) {
        expect(error.message).to.be.equal('Object not found')
      }
    });
  });

  describe('Update a car', () => {
    it('should update a car', async () => {
      const carUpdate = await carsModel.update(carsObjOutput._id, carsObjInput);
      expect(carUpdate).to.be.deep.equal(carsObjOutput);
    });

    it('should throws error if id inválid', async () => {
      try {
        await carsModel.update('worng_id', carsObjInput);
      } catch ( err: any) {
        expect(err.message).to.be.equal('Inválid ID')
      }
    });
  });

});