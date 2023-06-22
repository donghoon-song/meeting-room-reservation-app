import { Calendar, Event, dayjsLocalizer } from "react-big-calendar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SyntheticEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Reservation } from "../../types/reservation";

dayjs.locale("ko");
const localizer = dayjsLocalizer(dayjs);

type Props = {
  // todo : Tevent type으로 바꾸기
  onSelectEvent?: (event: any, e: React.SyntheticEvent<HTMLElement>) => void;
};

export default function RoomCalendar({ onSelectEvent }: Props) {
  const supabase = createClientComponentClient();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      // TODO : 가져올 때  Event type으로 가져올 순 없을까?
      const { data, error } = await supabase
        .from("reservations")
        .select(
          "id, start_time, end_time, rooms ( name, capacity ), users ( name )"
        );
      if (data) {
        setEvents(
          data.map((reservation) => {
            return {
              id: reservation.id,
              start: new Date(reservation.start_time),
              end: new Date(reservation.end_time),
              rooms: {
                name: reservation.rooms.name,
                capacity: reservation.rooms.capacity,
              },
              users: {
                name: reservation.users.name,
              },
            };
          })
        );
      }
    };
    fetchReservations();
  }, [setEvents, supabase]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      style={{ width: "100%", height: 500 }}
      onSelectEvent={onSelectEvent}
    />
  );
}
