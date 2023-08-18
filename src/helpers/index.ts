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

export const headerWithAuthorizationUploadFile = (headers = {}): AnyObject => {
  const accessToken = localStorage.getItem('access_token');

  return {
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  };
};

export const apiEndPoint = (path: string): string => {
  return `${process.env.REACT_APP_API_HOST}/${path}`;
};

export const iotApiEndPoint = (path: string): string => {
  return `${process.env.REACT_APP_IOT_API_HOST}/${path}`;
};

export const iridiumApiEndPoint = (path: string): string => {
  return `${process.env.REACT_APP_IRIDIUM_HOST}/${path}`;
};

export const formatNumber = (data: number, emptyValue = ''): string => {
  if (!data && emptyValue !== '') {
    return emptyValue;
  }

  return new Intl.NumberFormat().format(data);
};

/* eslint no-bitwise: "warn" */
export const randomKey = (length: number) => {
  return new Array(length).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0)
      .toString(36)
      [Math.random() < 0.5 ? 'toString' : 'toUpperCase']();
  });
};

export const getDaysBetweenDates = function (startDate: any, endDate: any) {
  const now = startDate.clone();
  const dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format('YYYY-MM-DD'));
    now.add(1, 'days');
  }

  return dates;
};

export const onlyUnique = function (value: any, index: number, self: any) {
  return value && self.indexOf(value) === index;
};

export const mappingStatus = (status: string) => {
  switch (status) {
    case 'checkout':
      return 'Checked Out';
    case 'canceled':
      return 'Canceled';
    case 'in_house':
      return 'In House';
    case 'no_show':
      return 'No Show';
    case 'waitlist':
      return 'Waitlist';
    case 'reserved':
      return 'Reserved';
    default:
      return '';
  }
};

export const formatDate = 'YYYY-MM-DD';
