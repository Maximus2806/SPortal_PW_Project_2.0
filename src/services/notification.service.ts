import slackService from './slack.service';
import { sendNotification as sendTelegramMessage } from './telegram.service';

class NotificationService {
  constructor(
    private service = slackService,
    private telegram = sendTelegramMessage
  ) {}

  async postNotification(notification: string) {
    await this.service.postNotification(notification);
  }

  async sendTelegramNotification(notification: string) {
    await this.telegram(notification);
  }
}

export default new NotificationService();
