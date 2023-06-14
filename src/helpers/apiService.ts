import axios from 'axios';
import { apiEndPoint, headerWithAuthorization } from 'helpers';

export function putAPI(path: string, data: any) {
  return axios.put(apiEndPoint(path), data, {
    headers: headerWithAuthorization(),
  });
}

export function postAPI(path: string, data: any) {
  return axios.put(apiEndPoint(path), data, {
    headers: headerWithAuthorization(),
  });
}

export function getAPI(path: string) {
  return axios.get(apiEndPoint(path), {
    headers: headerWithAuthorization(),
  });
}
