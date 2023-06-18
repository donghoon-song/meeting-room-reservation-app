"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Reservation } from "../../../types/reservation";
import Calendar from "@/components/RoomCalendar";
import ReservationModal from "@/components/ReservationModal";
import useModal from "@/hooks/useModal";

export default function CalendarPage() {
  const [isReservationModalOpen, openReservationModal, closeModal] = useModal();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calendar />
      <button className="btn" onClick={() => openReservationModal()}>
        예약하기
      </button>
      <ReservationModal
        open={isReservationModalOpen}
        onCancel={() => closeModal()}
      />
    </main>
  );
}
