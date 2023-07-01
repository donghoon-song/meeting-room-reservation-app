"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SyntheticEvent, useEffect, useState } from "react";
import { Reservation } from "../../../types/reservation";
import RoomCalendar from "@/components/RoomCalendar";
import ReservationModal from "@/components/ReservationModal";
import useModal from "@/hooks/useModal";
import ReservationDetailModal from "@/components/ReservationDetailModal";
import useReservations from "@/hooks/useReservations";
import { Props as ReservationDetailModalProps } from "@/components/ReservationDetailModal";
import { Alert, Button, Space } from "antd";

export default function CalendarPage() {
  const supabase = createClientComponentClient();
  const [events, fetchReservations] = useReservations();

  const [isReservationModalOpen, openReservationModal, closeReservationModal] =
    useModal();
  const [
    isReservationDetailModalOpen,
    openReservationDetailModal,
    closeReservationDetailModal,
  ] = useModal();
  const [reservationDetail, setReservationDetail] =
    useState<ReservationDetailModalProps["reservationDetail"]>();

  useEffect(() => {
    fetchReservations();
  }, []);

  // TODO: any type 제거하기
  const handleSelectEvent = (
    event: any,
    e: SyntheticEvent<HTMLElement, globalThis.Event>
  ) => {
    setReservationDetail(event);
    openReservationDetailModal();
  };

  const handleClickFeedbackButton = () =>
    window.open("https://forms.gle/GQsaSJnzi9veFPCe8", "_blank");

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24 ">
      {/* alert의 width를 100%로 하기 위해 relative로 감싸줌 */}
      <div className="relative w-full">
        <Alert
          className="w-full absolute aa -top-16"
          message="소중한 피드백을 남겨주세요."
          type="info"
          action={
            <Button
              size="small"
              type="primary"
              className="bg-sky-300"
              onClick={handleClickFeedbackButton}
            >
              피드백 남기기
            </Button>
          }
          closable
        />
        <RoomCalendar events={events} onSelectEvent={handleSelectEvent} />
        <button
          className="primary-button w-full mt-6"
          onClick={() => openReservationModal()}
        >
          예약하기
        </button>
      </div>
      <ReservationModal
        open={isReservationModalOpen}
        onSuccess={() => {
          closeReservationModal();
          fetchReservations();
        }}
        onCancel={() => closeReservationModal()}
      />
      <ReservationDetailModal
        open={isReservationDetailModalOpen}
        onCancel={() => closeReservationDetailModal()}
        reservationDetail={reservationDetail}
      />
    </main>
  );
}
