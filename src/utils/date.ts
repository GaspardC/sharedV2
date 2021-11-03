import { parse, parseISO, format } from "date-fns";
import { returnNumberValueSafeLargeNull } from ".";
const ONE_D_MLS = 1000 * 3600 * 24;

export const getIntervalFromDate = (date: string) => {
  if (!date) return null;

  const today = new Date();
  const intervalDate = getDateFromString(date);
  if (!intervalDate) return null;

  let interval = today.getFullYear() - intervalDate.getFullYear();
  const m = today.getMonth() - intervalDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < intervalDate.getDate())) {
    interval--;
  }
  return interval;
};

export const getDateFromString = (date: string) => {
  try {
    if (!date) return null;
    //dd.mm.yyy to yyy-mm-dd
    const dateSplit = date.split(".");
    const interDay = dateSplit[0];
    const interMonth = dateSplit[1];
    const interYear = dateSplit[2];
    const inter = `${interYear}-${interMonth}-${interDay}`;
    return new Date(inter);
  } catch (e) {
    console.log("problem parsing date str", e);
    return null;
  }
};

export const getDateXMonthesBefore = (
  date?: string | null,
  months?: number
) => {
  try {
    if (!date || !months) return null;
    const dateMl = parseDate(date).valueOf();
    const echeanceDateMl = dateMl - ONE_D_MLS * months * 30;
    return new Date(echeanceDateMl);
  } catch (e) {
    console.log("problem parsing date str", e);
    return null;
  }
};

export const getDateXMonthesAfter = (date: string, months: number) => {
  if (!date || !months) return null;
  const dateMl = parseDate(date).valueOf();
  const echeanceDateMl = dateMl + ONE_D_MLS * months * 30;
  return new Date(echeanceDateMl);
};

export const isDateInRange = (
  date: Date | null,
  dateMin: Date,
  dateMax: Date
) => {
  if (!date) return false;
  return (
    date.setHours(0, 0, 0, 0) - dateMin.setHours(0, 0, 0, 0) > 0 &&
    dateMax.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0) > 0
  );
};

export const DATE_DB_FORMAT = "yyyy-MM-dd";
export const DATE_FORMAT = "dd.MM.yyyy";
const now = new Date();

export const simpleDateFormat = ({
  date = now,
  dateFormat = DATE_FORMAT
}: {
  date?: Date | string;
  dateFormat?: string;
}) => {
  const _date = date != null ? date : now;
  const dateToFormat = (
    typeof _date === "string" && isDateDBFormat(_date)
      ? parse(_date, DATE_DB_FORMAT, now)
      : _date
  ) as Date;
  return format(dateToFormat, dateFormat);
};
export const formatDate = (dateStr = "") =>
  dateStr && dateStr.includes("-")
    ? format(parse(dateStr, "yyyy-MM-dd", now), DATE_FORMAT)
    : "";

export const parseDate = (dateStr) =>
  dateStr ? parse(dateStr, DATE_FORMAT, now) : now;

export const getStringFromDate = (date?: Date) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}.${month}.${year}`;
};

//////// NEW functions date //////////////

export const getDateFromStr = (
  datetime: string,
  format = !isDateDBFormat(datetime) ? DATE_FORMAT : DATE_DB_FORMAT
) => {
  return parse(datetime, format, now);
};

export const getDateToDBFormat = (date: Date) => format(date, DATE_DB_FORMAT);
export const transformFormat = ({
  dateStr = "",
  formatFrom = DATE_FORMAT,
  formatTo = DATE_DB_FORMAT
}) => {
  try {
    if (dateStr?.split("-")?.length === 3 && formatTo === DATE_DB_FORMAT)
      return dateStr;

    const date = parse(dateStr, formatFrom, now);
    return format(date, formatTo);
  } catch (e) {
    console.error("format Date", e, dateStr);
    return "";
  }
};

export const getFormattedDateFromDateDB = (datetime?: string) => {
  if (!datetime) return null;
  return !isDateDBFormat(datetime)
    ? datetime
    : format(getDateFromStr(datetime, DATE_DB_FORMAT), DATE_FORMAT);
};

export const getDateDBFormatted = (datetime?: string) => {
  if (!datetime) return null;
  return isDateDBFormat(datetime)
    ? datetime
    : format(getDateFromStr(datetime, DATE_FORMAT), DATE_DB_FORMAT);
};

export const isDateDBFormat = (date = "") => {
  if (!date) return false;
  return date?.includes("-");
};

export const getDurationFromInterval = (
  startTime?: string,
  endTime?: string
) => {
  if (!startTime) return 0;
  const startDate = getDateFromStr(startTime);
  const endDate = endTime ? getDateFromStr(endTime) : null;
  const startMl = startDate.valueOf();
  const endMl = endDate ? endDate.valueOf() : Date.now();
  const duration = (endMl - startMl) / (1000 * 60 * 60 * 24);
  const safeValueDuration = returnNumberValueSafeLargeNull(duration);
  return Math.trunc(Math.round((safeValueDuration + Number.EPSILON) * 10) / 10);
};

export const isDateSoonerThan = (date1: Date, date2: Date) => {
  return date1.valueOf() - date2.valueOf() < 0;
};

export const sortByDate = (dateA?: Date, dateB?: Date) => {
  if (!dateA && dateB) return 1;
  if (!dateB && dateA) return -1;
  if (!dateA || !dateB) return -1;
  return dateA.valueOf() - dateB.valueOf() > 0 ? -1 : 1;
};
