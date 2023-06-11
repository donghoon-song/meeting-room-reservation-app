"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Reservation } from "../../../types/reservation";
import Calendar from "@/components/RoomCalendar";

export default function CalendarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calendar />
    </main>
  );
}
