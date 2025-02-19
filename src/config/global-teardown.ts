import notificationService from '../services/notification.service';
import { ENVIRONMENT } from './environment';
import { test as teardown } from '../../src/fixtures/apiServices.fixture';

teardown('SLACK NOTIFICATION', async () => {
  console.log('TEARDOWN NOTIFICATION - LAUNCHED');
  if (ENVIRONMENT === 'ci') {
    await notificationService.postNotification(
      `Test run funished:
       link to report: TODO ADD LINK TO REPORT IN REPO`
    );
  }
  console.log('TEARDOWN NOTIFICATION - FINISHED');
});

// export default async function () {
//   if (ENVIRONMENT === 'ci') {
//     await notificationService.postNotification(
//       `Test run funished:
//        link to report: https://anatoly-karpovich.github.io/aqa-pw-2/allure-report/#`
//     );
//   }
// }
