import pino from 'pino';
export const logger = pino();
export const requestLogger = (req: any, res: any, next: any) => {
  logger.info({ method: req.method, url: req.url, user: req.user?.id });
  next();
};
