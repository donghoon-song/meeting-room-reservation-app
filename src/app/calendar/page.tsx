"use client";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.locale("ko");
const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    start: dayjs().toDate(),
    end: dayjs().add(1, "day").toDate(),
    title: "Some title",
  },
];

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default function CalendarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MyCalendar />
    </main>
  );
}
