import * as SendGrid from '@sendgrid/mail';
import { Injectable, Logger } from '@nestjs/common';
import { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } from '../../../environment';

@Injectable()
export class SendgridEmailService {
  async sendEmail(receiver: string, templateId: string, data: any) {
    SendGrid.setApiKey(SENDGRID_API_KEY);
    const msg = {
      from: SENDGRID_SENDER_EMAIL,
      to: receiver,
      templateId: templateId,
      dynamicTemplateData: data,
    };
    Logger.log(msg);
    const resp = await SendGrid.send(msg);
    Logger.log(resp);
  }
}
