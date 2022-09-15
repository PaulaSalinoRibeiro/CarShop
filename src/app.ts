import express from 'express';
import 'express-async-errors';
import carsRouter from './routers/carsRouter';
import motoRouter from './routers/motoRouter';
import errorMiddleware from './middlewares/error';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);
app.use('/motorcycles', motoRouter);
app.use(errorMiddleware);

export default app;
