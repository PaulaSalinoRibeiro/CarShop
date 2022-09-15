import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleObjInput, motorcycleObjOutput } from '../../mocks/motorcycleMock';

const { expect } = chai;

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcylceService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleObjOutput);
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

});