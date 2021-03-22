import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';
import {
  TWILIO_FROM_NUMBER,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} from '../../environment/index';
@Injectable()
export class SmsService {
  private client: Twilio;

  constructor() {
    const accountSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    this.client = new Twilio(accountSid, authToken);
  }

  async sendSms(contactNumber: string, message: string) {
    const smsBody = {
      body: message,
      from: TWILIO_FROM_NUMBER,
      to: contactNumber,
    };
    try {
      await this.client.messages
        .create(smsBody)
        .then(msg => Logger.log(msg.sid, 'MESSAGE SID'));
    } catch (error) {
      return error;
    }
  }
}
