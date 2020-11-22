/* eslint-disable import/no-cycle */
import { authService } from '../services';

export default function handleResponse(res) {
  const { data } = res;
  if (res.status !== 200) {
    if ([401, 403].indexOf(res.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authService.logout();
      window.location.reload();
    }

    const error = (data && data.message) || res.statusText;
    return error;
  }

  return data;
}
