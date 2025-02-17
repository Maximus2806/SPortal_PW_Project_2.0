import notificationService from '../services/notification.service';

export default async function () {
  if (process.env.ENVIRONMENT === 'ci') {
    await notificationService.postNotification(
      `Test run funished:\n link to report: https://anatoly-karpovich.github.io/aqa-pw-2/allure-report/#`
    );
  }
}
