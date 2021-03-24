export interface IOneSignalSendNotificationByExternalIdsPayload {
  app_id?: string;
  include_external_user_ids: string[];
  contents?: { en: string };
  url?: string;
  data?: any;
  send_after?: string;
  web_url?: string;
  app_url?: string;
  ios_attachments?: any;
  big_picture?: string;
  chrome_web_image?: string;
  headings?: { en: string };
  subtitle?: { en: string };
}

export interface IOneSignalCancelNotificationByExternalIdsPayload {
  app_id?: string;
  id: string;
}
