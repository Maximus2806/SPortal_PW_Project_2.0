import notificationService from '../services/notification.service';
import { CI } from './environment';
import { test as teardown } from '../../src/fixtures/apiServices.fixture';

const message = 'Test run funished: link to report: https://maximus2806.github.io/SPortal_PW_Project_2.0/report/';
teardown('SLACK NOTIFICATION', async () => {
  console.log('TEARDOWN NOTIFICATION - LAUNCHED');
  if (CI) {
    await Promise.all([
      notificationService.postNotification(message),
      notificationService.sendTelegramNotification(message)
    ]);    
  }
  console.log('TEARDOWN NOTIFICATION - FINISHED');
});
