import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const formatStringDateToISOString = (dayString: string) => {
  return dayjs(dayString, 'DD-MM-YYYY')
    .set('hour', 12)
    .set('minute', 30)
    .set('second', 0)
    .set('millisecond', 0)
    .toISOString();
};

export const formatPartialStringDateToISOString = (dayString: string) => {
  return dayjs(dayString, 'MM-YYYY').toISOString();
};

export const formatISODateToStringDate = (date: Date) => {
  const isoString = date.toISOString();
  return `${isoString.slice(5, 7)}-${isoString.slice(0, 4)}`;
};
