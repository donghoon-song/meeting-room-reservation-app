import dayjs from "dayjs";

export const isWeekday = (date: Date) => {
  const day = dayjs(date).get("day");
  return day !== 0 && day !== 6;
};

// 지난 시간은 선택할 수 없도록 필터링
export const filterPassedTime = (time: Date) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);
  return currentDate.getTime() < selectedDate.getTime();
};

// 시작 시간 이전은 선택할 수 없도록 필터링
export const filterStartTime = (time: Date, startTime: Date) => {
  const currentDate = new Date();
  const selectedDate = new Date(time);
  return startTime.getTime() < selectedDate.getTime();
};

// 30분 단위로 시간 선택
export const getNextHalfHourMark = (dateTime: Date) => {
  const now = dayjs(dateTime);
  const minutes = now.get("minutes");
  const nextHalfHourMark = now.add(30 - (minutes % 30), "minute");
  return nextHalfHourMark.second(0).toDate();
};
