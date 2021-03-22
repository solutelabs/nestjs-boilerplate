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

export const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;
export const POSTMARK_FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL;
export const POSTMARK_ADMIN_INVITATION_TEMPLATE_ID = +process.env
  .POSTMARK_ADMIN_INVITATION_TEMPLATE_ID;
export const POSTMARK_RESET_PASSWORD_LINK_TEMPLATE_ID = +process.env
  .POSTMARK_RESET_PASSWORD_LINK_TEMPLATE_ID;
export const POSTMARK_OTP_TEMPLATE_ID = +process.env.POSTMARK_OTP_TEMPLATE_ID;

export const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export const ONE_SIGNAL_REST_API_KEY = process.env.ONE_SIGNAL_REST_API_KEY;
export const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;
export const ONE_SIGNAL_WEB_URL = process.env.ONE_SIGNAL_WEB_URL;

export const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
