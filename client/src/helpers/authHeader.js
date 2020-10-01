/* eslint-disable import/no-cycle */
import { authService } from '../services';

export default function authHeader() {
  // return authorization header with jwt token
  const currentUser = JSON.parse(authService.currentUserValue);
  if (currentUser && currentUser.token) {
    return { 'Access-Control-Allow-Origin': '*', 'x-access-token': currentUser.token };
  }
  return {};
}
