import { AnyObject } from '@gilbarbara/helpers/lib';

export const headerWithAuthorization = (headers = {}): AnyObject => {
  const accessToken = localStorage.getItem('access_token');

  return {
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};

export const apiEndPoint = (path: string): string => {
  return `${process.env.REACT_APP_API_HOST}/${path}`;
};
