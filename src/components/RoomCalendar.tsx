import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.locale("ko");
const localizer = dayjsLocalizer(dayjs);

type Props = {
  events: any[];
  // todo : Tevent type으로 바꾸기
  onSelectEvent?: (event: any, e: React.SyntheticEvent<HTMLElement>) => void;
};

export default function RoomCalendar({ events, onSelectEvent }: Props) {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      views={["month", "week", "day"]}
      style={{ width: "100%", height: 500 }}
      onSelectEvent={onSelectEvent}
    />
  );
}
