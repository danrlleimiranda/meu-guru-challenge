import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: 'log',
      filename: 'informations.log',
      level: 'info',
      format: format.combine(format.json()),
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

export default logger;
