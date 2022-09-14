import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  const { status, message } = err;
  if (!status) {
    return res.status(500).json({ message: 'internal error! =/' });
  }
  return res.status(status).json({ error: message });
};

export default errorMiddleware;