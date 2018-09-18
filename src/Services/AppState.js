import {AppState} from 'react-native';
import Observable from 'zen-observable';

class AppStateService {
  constructor() {
    this.createObservables();
  }

  state = {
    backgroundedTimestamp: null
  };

  setState = state => {
    this.state = {...this.state, ...state};
  };

  createObservables = () => {
    this.baseObservable = new Observable(observer => {
      const eventListener = nextAppState => {
        observer.next(nextAppState);
        if (nextAppState.match(/background/)) {
          this.setState({backgroundedTimestamp: new Date().getTime()});
        }
      };
      AppState.addEventListener('change', eventListener);
      return () => AppState.removeEventListener('change', eventListener);
    });
  };

  subscribeToActive = func =>
    this.baseObservable
      .filter(state => {
        return state.match(/active/);
      })
      .subscribe(func);

  subscribeToActiveAfterWhile = func =>
    this.baseObservable
      .filter(state => {
        if (!this.state.backgroundedTimestamp) return false;
        const timedelta =
          new Date().getTime() - this.state.backgroundedTimestamp;
        console.log(timedelta);
        return state.match(/active/) && timedelta >= 300000;
      })
      .subscribe(func);

  subscribeToBackground = func =>
    this.baseObservable
      .filter(state => {
        return state.match(/background/);
      })
      .subscribe(func);
}

export default new AppStateService();
