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

export const formatISOStringToStringDate = (isoString: string) => {
  return dayjs(isoString);
};
