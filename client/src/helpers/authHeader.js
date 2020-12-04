import { authService } from '../services';

export default function authHeader() {
  // return authorization header with jwt token
  const currentUser = JSON.parse(authService.currentUserValue);
  if (currentUser.user && currentUser.token) {
    return { 'x-access-token': currentUser.token };
  }
  return {};
}
