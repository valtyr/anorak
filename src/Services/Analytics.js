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
    try {
      this.mixpanel = new ExpoMixpanelAnalytics(MIXPANEL_TOKEN);
    } catch (e) {
      console.log(e);
    }
  };

  identify = id => {
    try {
      if (!this.mixpanel) return;
      this.mixpanel.identify(id);
    } catch (e) {
      console.log(e);
    }
  };

  track = (event, data) => {
    try {
      if (!this.mixpanel) return;
      this.mixpanel.track(event, data);
    } catch (e) {
      console.log(e);
    }
  };

  pageHit = pageName => {
    try {
      if (!this.mixpanel) return;
      this.mixpanel.track('Page View', pageName);
    } catch (e) {
      console.log(e);
    }
  };

  userInfo = info => {
    try {
      if (!this.mixpanel) return;
      this.mixpanel.people_set(info);
    } catch (e) {
      console.log(e);
    }
  };
}

export default new Analytics();
