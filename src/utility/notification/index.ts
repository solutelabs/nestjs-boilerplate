import { Injectable, HttpService, Logger } from '@nestjs/common';
import { ONE_SIGNAL_REST_API_KEY, ONE_SIGNAL_API_KEY } from '../../environment';
import {
  IOneSignalSendNotificationByExternalIdsPayload,
  IOneSignalCancelNotificationByExternalIdsPayload,
} from './interface/onesignal.interface';
@Injectable()
export class OnesignalService {
  constructor(private httpService: HttpService) {}
  async createNotificatioBaseOnExternalId(
    payload: IOneSignalSendNotificationByExternalIdsPayload,
  ) {
    payload.app_id = ONE_SIGNAL_API_KEY;
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${ONE_SIGNAL_REST_API_KEY}`,
    };
    try {
      return this.httpService
        .post(
          'https://onesignal.com:443/api/v1/notifications',
          JSON.stringify(payload),
          {
            headers: headers,
          },
        )
        .toPromise();
    } catch (error) {
      Logger.error(error, '', 'ONESIGNAL CREATE NOTIFICATION ERROR');
    }
  }
  async cancelNotificatioBaseOnExternalId(
    payload: IOneSignalCancelNotificationByExternalIdsPayload,
  ) {
    payload.app_id = ONE_SIGNAL_API_KEY;
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${ONE_SIGNAL_REST_API_KEY}`,
    };
    return this.httpService
      .delete(
        `https://onesignal.com:443/api/v1/notifications/${payload.id}?app_id=${payload.app_id}`,
        {
          headers: headers,
        },
      )
      .toPromise();
  }
}
