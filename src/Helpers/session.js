import {TOKEN_KEY} from '../Consts/vars';
import {SecureStore, Util} from 'expo';

export const logOut = () => {
  SecureStore.deleteItemAsync(TOKEN_KEY).finally(Util.reload);
};

export const logIn = (token, initializeApp) => {
  SecureStore.setItemAsync(TOKEN_KEY, token).finally(initializeApp);
};
