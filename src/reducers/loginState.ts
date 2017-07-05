import { Reducers } from 'sn-redux';

export const getLoginState = (state) => {
  return Reducers.getAuthenticationStatus(state);
}