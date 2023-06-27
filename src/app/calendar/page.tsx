"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SyntheticEvent, useEffect, useState } from "react";
import { Reservation } from "../../../types/reservation";
import RoomCalendar from "@/components/RoomCalendar";
import ReservationModal from "@/components/ReservationModal";
import useModal from "@/hooks/useModal";
import ReservationDetailModal from "@/components/ReservationDetailModal";
import { Event } from "react-big-calendar";

export default function CalendarPage() {
  const supabase = createClientComponentClient();
  const [events, setEvents] = useState<Event[]>([]);

  const [isReservationModalOpen, openReservationModal, closeReservationModal] =
    useModal();
  const [
    isReservationDetailModalOpen,
    openReservationDetailModal,
    closeReservationDetailModal,
  ] = useModal();
  const [reservationDetail, setReservationDetail] = useState<Reservation>();

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

  // TODO: any type 제거하기
  const handleSelectEvent = (
    event: any,
    e: SyntheticEvent<HTMLElement, globalThis.Event>
  ) => {
    setReservationDetail(event);
    openReservationDetailModal();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24 ">
      <RoomCalendar events={events} onSelectEvent={handleSelectEvent} />
      <button
        className="primary-button w-full h-10 mt-6"
        onClick={() => openReservationModal()}
      >
        예약하기
      </button>
      <ReservationModal
        open={isReservationModalOpen}
        onSuccess={() => closeReservationModal()}
        onCancel={() => closeReservationModal()}
      />
      <ReservationDetailModal
        open={isReservationDetailModalOpen}
        onCancel={() => closeReservationDetailModal()}
        reservationDetail={reservationDetail as Reservation}
      />
    </main>
  );
}
