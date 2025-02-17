import notificationService from '../services/notification.service';
import { ENVIRONMENT } from './environment';

export default async function () {
  if (ENVIRONMENT === 'ci') {
    await notificationService.postNotification(
      `Test run funished:
       link to report: https://anatoly-karpovich.github.io/aqa-pw-2/allure-report/#`
    );
  }
}
