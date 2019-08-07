import {TOKEN_KEY} from '../Consts/vars';
import {Updates} from 'expo';
import * as SecureStore from 'expo-secure-store';

export const logOut = () => {
  SecureStore.deleteItemAsync(TOKEN_KEY).finally(Updates.reload);
};

export const logIn = (token, initializeApp) => {
  SecureStore.setItemAsync(TOKEN_KEY, token).finally(initializeApp);
};
