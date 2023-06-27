"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SyntheticEvent, useEffect, useState } from "react";
import { Reservation } from "../../../types/reservation";
import RoomCalendar from "@/components/RoomCalendar";
import ReservationModal from "@/components/ReservationModal";
import useModal from "@/hooks/useModal";
import ReservationDetailModal from "@/components/ReservationDetailModal";

export default function CalendarPage() {
  const [isReservationModalOpen, openReservationModal, closeReservationModal] =
    useModal();
  const [
    isReservationDetailModalOpen,
    openReservationDetailModal,
    closeReservationDetailModal,
  ] = useModal();
  const [reservationDetail, setReservationDetail] = useState<Reservation>();

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
      <RoomCalendar onSelectEvent={handleSelectEvent} />
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
