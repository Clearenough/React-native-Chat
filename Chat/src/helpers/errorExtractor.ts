import {IServerError} from '../@types/common';

export function errorExtractor(data: string | IServerError) {
  let message = '';
  if (typeof data === 'string') {
    message = data;
  } else if ('message' in data) {
    message = data.message;
  }
  return message;
}
