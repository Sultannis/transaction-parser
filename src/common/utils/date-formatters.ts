import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const formatStringDateToISOString = (dayString: string) => {
  return dayjs(dayString, 'DD-MM-YYYY')
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
    .toISOString();
};
