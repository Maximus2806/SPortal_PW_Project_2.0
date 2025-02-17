import { AxiosApiClient } from '../api/apiClients/axios.apiClient';
import { SLACK_NOTIFICATION_URL } from '../config/environment';
import { IRequestOptions } from '../data/types/api.types';

class SlackService {
  constructor(private apiClient = new AxiosApiClient()) {}

  async postNotification(text: string) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: `https://hooks.slack.com/`,
      url: SLACK_NOTIFICATION_URL,
      headers: {
        'Content-type': 'application/json'
      },
      data: { text }
    };
    return this.apiClient.send(options);
  }
}

export default new SlackService();
