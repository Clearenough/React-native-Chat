import {ITime} from '../@types/common';

export function formatTimeDifference(creationDateString: string): ITime {
  const currentDate = new Date();
  const creationDate = new Date(creationDateString);
  const timeDifference = Math.floor(
    (currentDate.getTime() - creationDate.getTime()) / 1000,
  );
  if (timeDifference > 86400) {
    const days = Math.floor(timeDifference / 86400);
    return {time: `${days} d${days !== 1 ? '' : ''}`, diff: timeDifference};
  }
  const hours = creationDate.getHours();
  const minutes = creationDate.getMinutes();

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return {time: `${formattedHours}:${formattedMinutes}`, diff: timeDifference};
}
