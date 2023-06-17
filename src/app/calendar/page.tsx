"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Reservation } from "../../../types/reservation";
import Calendar from "@/components/RoomCalendar";
import Modal from "@/components/Modal";
import ReservationModal from "@/components/ReservationModal";

export default function CalendarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calendar />
      {/* Open the modal using ID.showModal() method */}
      <button
        className="btn"
        onClick={() => {
          window.my_modal_1.showModal();
        }}
      >
        open modal
      </button>

      <ReservationModal />
    </main>
  );
}
