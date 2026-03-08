import { message } from 'antd';

export const notify = {
  success: (content: string) => message.success(content),
  error: (content: string) => message.error(content),
  warn: (content: string) => message.warning(content),
  warning: (content: string) => message.warning(content),
  info: (content: string) => message.info(content),
  loading: (content: string) => message.loading(content),
};
