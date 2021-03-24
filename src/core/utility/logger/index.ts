import { createLogger, format, transports } from 'winston';

const { timestamp, align, printf } = format;

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  fileConf: {
    filename: 'logs/logs.log',
    handleExceptions: true,
    maxsize: 1048576, // 1GB
    maxFiles: 10,
  },
};

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] ${message}`;
});

export const Logger = createLogger({
  level: 'debug',
  levels: config.levels,
  format: format.combine(
    align(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [new transports.Console(), new transports.File(config.fileConf)],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  exitOnError: false,
});
