import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarsModel from '../../../models/CarsMolde';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import { carsListOutput, carsObjInput, carsObjOutput } from '../../mocks/carsMock';

const { expect } = chai;

describe('CarsController', () => {

  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request;
  const res = {} as Response;


  before(async () => {
    sinon.stub(carsService, 'create').resolves(carsObjOutput);
    sinon.stub(carsService, 'list').resolves(carsListOutput);
    sinon.stub(carsService, 'listOne').resolves(carsObjOutput);
    sinon.stub(carsService, 'update').resolves(carsObjOutput);
    sinon.stub(carsService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('create a new car', () => {
    it('should return status 201',  async () => {
      req.body = carsObjInput;
      await carsController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsObjOutput)).to.be.true;
    });
  });

  describe('list cars', () => {
    it('should returns status 200 and list of cars', async () => {
      await carsController.list(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsListOutput)).to.be.true;
    });
  });

  describe('ListOne', () => {
    it('should return status 200 and a car', async () => {
      req.params = {id : carsObjOutput._id }
      await carsController.listOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsObjOutput)).to.be.true;
    });
  });

  describe('Update a car', () => {
    it('should return status 200 and a car update', async () => {
      req.params = {id : carsObjOutput._id }
      req.body = carsObjInput;

      await carsController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsObjOutput)).to.be.true;
    });
  });

  describe('Delete a car', () => {
    it('shoud return status 204', async () => {
      req.params = {id : carsObjOutput._id }

      await carsController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });

});