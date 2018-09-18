import {
  Analytics as GoogleAnalytics,
  PageHit as GAPageHit
} from 'expo-analytics';
import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';

const DEBUG = true;
const GA_KEY = '';
const MIXPANEL_TOKEN = '33c4583843e8b109469180d847d81e57';

class Analytics {
  // constructor() {
  //   this.googleAnalyticsInstance = new Analytics(GA_KEY, null, {
  //     debug: DEBUG
  //   });
  // }

  init = () => {
    this.mixpanel = new ExpoMixpanelAnalytics(MIXPANEL_TOKEN);
  };

  track = (event, data) => {
    this.mixpanel.track(event, data);
  };

  pageHit = pageId => {};
}

export default new Analytics();
