import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WEBHOOK_SECRET } from '../../environment';

@Injectable()
export class WebhookAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    let status = false;
    if (request.headers.webhook_secret === WEBHOOK_SECRET) {
      status = true;
    }
    return status;
  }
}
