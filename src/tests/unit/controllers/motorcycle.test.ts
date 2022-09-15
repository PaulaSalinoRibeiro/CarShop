import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { motorcycleList, motorcycleObjInput, motorcycleObjOutput } from '../../mocks/motorcycleMock';


const { expect } = chai;

describe('MotorcycleController', () => {

  const motoModel = new MotorcycleModel();
  const motoService = new MotorcycleService(motoModel);
  const motoController = new MotorcycleController(motoService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {

    sinon.stub(motoService, 'create').resolves(motorcycleObjOutput);
    sinon.stub(motoService, 'list').resolves(motorcycleList);
    sinon.stub(motoService, 'listOne').resolves(motorcycleObjOutput);
    sinon.stub(motoService, 'update').resolves(motorcycleObjOutput);
    sinon.stub(motoService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

  });

  after(() => {
    sinon.restore();
  });

  describe('Create', () => {
    it('should be create a new motocycle and return status 201', async () => {
      req.body = motorcycleObjInput
      await motoController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleObjOutput)).to.be.true;
    });
  });

  describe('List', () => {
    it('should return a list of motorcycles and status 200', async () => {
      await motoController.list(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleList)).to.be.true;
    });
  });

  describe('ListOne', () => {
    it('should retuns status 200 and an object', async () => {
      req.params = { id: motorcycleObjOutput._id }

      await motoController.listOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleObjOutput)).to.be.true;
    });
  });

  describe('Update', () => {
    it('should return status 200 and an object', async () => {
      req.params = { id: motorcycleObjOutput._id };
      req.body = motorcycleObjInput;

      await motoController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleObjOutput)).to.be.true;

    });
  });

  describe('Delete', () => {
    it('should retuns status 204', async () => {
      req.params = { id: motorcycleObjOutput._id };

      await motoController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
      
    });
  });

});