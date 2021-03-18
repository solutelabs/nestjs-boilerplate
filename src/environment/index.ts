export const PORT: number = +process.env.PORT;

export const DATABASE_TYPE: any = process.env.DATABASE_TYPE;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_DB = process.env.DATABASE_DB;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN_DAYS = +process.env.JWT_EXPIRES_IN_DAYS;
export const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const MIN_PASSWORD_LENGTH = +process.env.MIN_PASSWORD_LENGTH;
export const MAX_PASSWORD_LENGTH = +process.env.MAX_PASSWORD_LENGTH;

export const RESET_PASSWORD_SLUG = process.env.RESET_PASSWORD_SLUG;
export const INVITE_SLUG = process.env.INVITE_SLUG;

export const ENVIRONMENT = process.env.ENVIRONMENT;

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
export const AWS_S3_REGION = process.env.AWS_S3_REGION;

export const REDIS_QUEUE_URL = process.env.REDIS_QUEUE_URL;
