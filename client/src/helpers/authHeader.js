/* eslint-disable import/no-cycle */
import { authService } from '../services';

export default function authHeader() {
  // return authorization header with jwt token
  const currentUser = authService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { 'x-access-token': currentUser.token };
  }
  return {};
}
