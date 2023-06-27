import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback } from "react";

dayjs.locale("ko");
const localizer = dayjsLocalizer(dayjs);

type Props = {
  events: any[];
  // todo : Tevent type으로 바꾸기
  onSelectEvent?: (event: any, e: React.SyntheticEvent<HTMLElement>) => void;
};

export default function RoomCalendar({ events, onSelectEvent }: Props) {
  // TODO: any 없애기
  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event?.rooms.name.includes("내부") && {
        style: {
          backgroundColor: "#31ada8",
        },
      }),
    }),
    []
  );

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      views={["month", "week", "day"]}
      style={{ width: "100%", height: 500 }}
      eventPropGetter={eventPropGetter}
      onSelectEvent={onSelectEvent}
    />
  );
}
