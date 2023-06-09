import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Event } from "react-big-calendar";
import { Database } from "../../types/supabase";

const useReservations = (): [Event[], () => void] => {
  const [events, setEvents] = useState<Event[]>([]);
  const supabase = createClientComponentClient<Database>();

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
              name: reservation.rooms ? reservation.rooms.name : "",
              capacity: reservation.rooms ? reservation.rooms.capacity : "",
            },
            users: {
              name: reservation.users ? reservation.users.name : "",
            },
          };
        })
      );
    }
  };

  return [events, fetchReservations];
};

export default useReservations;
