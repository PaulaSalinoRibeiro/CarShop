import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleList, motorcycleObjInput, motorcycleObjOutput } from '../../mocks/motorcycleMock';

const { expect } = chai;

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcylceService = new MotorcycleService(motorcycleModel);
  const WRONG_ID = "4edd40c86762e0fb12000xxx";

  before(async () => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleObjOutput);
    sinon.stub(motorcycleModel, 'read').resolves(motorcycleList);
    sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleObjOutput);
    sinon.stub(motorcycleModel, 'update').resolves(motorcycleObjOutput);
    sinon.stub(motorcycleModel, 'delete').resolves();

  });

  after(() => {
    sinon.restore();
  });

  describe('Create a new motorcycle', () => {
    it('should be create a new motorcycle', async () => {
      const result = await motorcylceService.create(motorcycleObjInput);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });
  });

  describe('List', () => {
    it('should return an array of objects', async () => {
      const result = await motorcylceService.list();
      expect(result).to.be.deep.equal(motorcycleList);
    });
  });

  describe('List One', () => {
    it('should return an object if id is correct', async () => {
      const result = await motorcylceService.listOne(motorcycleObjOutput._id);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });
    it('should throw a erro if id is wrong', async () => {
      try {
        await motorcylceService.listOne('12345');
      } catch (err:any) {
        expect(err.message).to.be.equal('Id must have 24 hexadecimal characters')
      }
    });
  });

  describe('Update', () => {
    it('should update a motorcycle', async () => {
      const result = await motorcylceService.update(motorcycleObjOutput._id, motorcycleObjInput);
      expect(result).to.be.deep.equal(motorcycleObjOutput);
    });
    it('should throw a error', async () => {
      try {
        await motorcylceService.update(WRONG_ID, motorcycleObjInput);
      } catch (err:any) {
        expect(err.message).to.be.equal('Object not found');
      }
    });
  });

  describe('Delete', () => {
    it('should delete a moto if id is correct', async () => {
      const result = await motorcylceService.delete(motorcycleObjOutput._id);
      expect(result).to.be.undefined;
    });
    it('should throw a error id id is worng', async () => {
      try {
        await motorcylceService.delete(WRONG_ID);
      } catch (err:any) {
        expect(err.message).to.be.equal('Object not found');
      }
    });
  });

});