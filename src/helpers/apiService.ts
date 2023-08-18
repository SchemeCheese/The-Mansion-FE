import axios from 'axios';
import {
  apiEndPoint,
  headerWithAuthorization,
  headerWithAuthorizationUploadFile,
  iridiumApiEndPoint,
} from 'helpers';

export function putAPI(path: string, data: any) {
  return axios.put(apiEndPoint(path), data, {
    headers: headerWithAuthorization(),
  });
}

export function postAPI(
  path: string,
  data: any,
  server = 'pms',
  statusFormUpload: boolean = false,
) {
  if (server === 'iridium') {
    return axios.post(iridiumApiEndPoint(path), data, {
      headers: headerWithAuthorization(),
    });
  }

  if (statusFormUpload) {
    return axios.post(apiEndPoint(path), data, {
      headers: headerWithAuthorizationUploadFile(),
    });
  }

  return axios.post(apiEndPoint(path), data, {
    headers: headerWithAuthorization(),
  });
}

export function getAPI(path: string, server = 'pms', searchParam = {}) {
  if (server === 'iridium') {
    return axios.get(iridiumApiEndPoint(path), {
      headers: headerWithAuthorization(),
      params: searchParam,
    });
  }

  return axios.get(apiEndPoint(path), {
    headers: headerWithAuthorization(),
    params: searchParam,
  });
}
