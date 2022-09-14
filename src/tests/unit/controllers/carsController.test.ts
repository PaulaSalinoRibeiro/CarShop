import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import CarsModel from '../../../models/CarsMolde';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import { carsObjInput, carsObjOutput } from '../../mocks/carsMock';


const { expect } = chai;

describe('CarsController', () => {

  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const req = {} as Request;
  const res = {} as Response;


  before(async () => {
    sinon.stub(carsService, 'create').resolves(carsObjOutput);

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
    })
  });

});