import dayjs from "dayjs";

export const isWeekday = (date: Date) => {
  const day = dayjs(date).get("day");
  return day !== 0 && day !== 6;
};

export const filterPassedTime = (time: Date) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};
