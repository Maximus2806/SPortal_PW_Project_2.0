import notificationService from '../services/notification.service';
import { CI } from './environment';
import { test as teardown } from '../../src/fixtures/apiServices.fixture';

teardown('SLACK NOTIFICATION', async () => {
  console.log('TEARDOWN NOTIFICATION - LAUNCHED');
  if (CI) {
    await notificationService.postNotification(
      `Test run funished:
       link to report: https://maximus2806.github.io/SPortal_PW_Project_2.0/report/`
    );
  }
  console.log('TEARDOWN NOTIFICATION - FINISHED');
});
