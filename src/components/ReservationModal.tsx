"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DatePicker from "react-datepicker";
import { isWeekday, filterPassedTime } from "@/utils/date";
import dayjs from "dayjs";
import { getUserInfo } from "@/atoms/auth";

import "react-datepicker/dist/react-datepicker.css";
import { useRecoilValue } from "recoil";
import { UserInfo } from "@/types/auth";
import { useRouter } from "next/navigation";

export default function ReservationModal() {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const userInfo = useRecoilValue<UserInfo>(getUserInfo);

  const [rooms, setRooms] = useState<any[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().toLocaleDateString())
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().toLocaleDateString())
  );

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("id, description");
      if (data) {
        setRooms(
          data.map((room) => ({ value: room.id, label: room.description }))
        );
        // 초기값 세팅
        setRoomId(data[0].id);
      }
    };
    fetchRooms();
  }, [setRooms, supabase]);

  const handleReservation = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      router.push("/");
      return;
    }
    try {
      const { error } = await supabase.from("reservations").insert([
        {
          start_time: startDate,
          end_time: endDate,
          room_id: roomId,
          user_id: userInfo.id,
        },
      ]);
      if (error) {
        throw new Error("예약에 실패했습니다.");
      }
    } catch (error) {
      console.error("handleReservation error : ", error);
    }
  };

  return (
    <Modal>
      <div className="modal-header">
        <h3>예약하기</h3>
      </div>
      <div className="modal-body">
        <div className="form-control">
          <label htmlFor="room">회의실</label>
          {rooms.length === 0 ? (
            <div>loading...</div>
          ) : (
            <select
              name="room"
              id="room"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              {rooms.map((room, index) => (
                <option key={room.value} value={room.value}>
                  {room.label}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="start">시작 시간</label>
          <DatePicker
            selected={startDate}
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            filterDate={isWeekday}
            filterTime={filterPassedTime}
            minDate={new Date()}
            maxDate={dayjs().add(5, "month").toDate()}
            onChange={(date: any) => setStartDate(date)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="end">종료 시간</label>
          <DatePicker
            selected={endDate}
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            filterDate={isWeekday}
            filterTime={filterPassedTime}
            minDate={new Date()}
            maxDate={dayjs().add(5, "month").toDate()}
            onChange={(date: any) => setEndDate(date)}
          />
        </div>
      </div>
      <div className="modal-action">
        <button className="btn" onClick={handleReservation}>
          예약하기
        </button>
        <form method="dialog">
          <button id="close" className="btn">
            돌아가기
          </button>
        </form>
      </div>
    </Modal>
  );
}
