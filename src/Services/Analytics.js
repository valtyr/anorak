import {
  Analytics as GoogleAnalytics,
  PageHit as GAPageHit
} from 'expo-analytics';
import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';

const DEBUG = true;
const GA_KEY = '';
const MIXPANEL_TOKEN = '33c4583843e8b109469180d847d81e57';

class Analytics {
  init = () => {
    this.mixpanel = new ExpoMixpanelAnalytics(MIXPANEL_TOKEN);
  };

  identify = id => {
    if (!this.mixpanel) return;
    this.mixpanel.identify(id);
  };

  track = (event, data) => {
    if (!this.mixpanel) return;
    this.mixpanel.track(event, data);
  };

  pageHit = pageName => {
    if (!this.mixpanel) return;
    this.mixpanel.track('Page View', pageName);
  };

  userInfo = info => {
    if (!this.mixpanel) return;
    this.mixpanel.people_set(info);
  };
}

export default new Analytics();
