"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DatePicker from "react-datepicker";
import { isWeekday, filterPassedTime } from "@/utils/date";
import dayjs from "dayjs";
import { getUserInfo } from "@/atoms/auth";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/react-datepicker-custom.css";
import { useRecoilValue } from "recoil";
import { UserInfo } from "@/types/auth";
import { useRouter } from "next/navigation";
import Modal from "antd/es/modal/Modal";
import { Select } from "antd";

export default function ReservationModal({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) {
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

  const checkRoomAvailable = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("id, start_time, end_time")
      .eq("room_id", roomId)
      .gte("start_time", startDate.toISOString())
      .lte("end_time", endDate.toISOString());
    if (data) {
      if (data.length > 0) {
        alert("이미 예약된 시간입니다.");
        return false;
      }
    }
    return true;
  };

  const handleReservation = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      router.push("/");
      return;
    }
    try {
      // 그 시간에 예약할 수 있는지 체크
      const isAvailable = await checkRoomAvailable();
      if (!isAvailable) return;

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
      alert("예약에 성공했습니다.");
    } catch (error) {
      console.error("handleReservation error : ", error);
    }
  };

  return (
    <Modal
      title="예약하기"
      open={open}
      onCancel={onCancel}
      width="16rem"
      centered
      footer={null}
    >
      <div className="">
        <div className="input-wrapper space-y-1">
          <div>회의실</div>
          {rooms.length === 0 ? (
            <div>loading...</div>
          ) : (
            <Select
              className="w-full"
              options={rooms.map((room, index) => {
                return {
                  value: room.value,
                  label: room.label,
                };
              })}
              defaultValue={rooms[0].value}
              onChange={(value) => setRoomId(value)}
            />
          )}
        </div>
        <div className="input-wrapper space-y-1">
          <label htmlFor="start">시작 시간</label>
          <DatePicker
            className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full"
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
        <div className="input-wrapper space-y-1">
          <label htmlFor="end">종료 시간</label>
          <DatePicker
            className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full"
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
        <div className="flex flex-col mt-4 space-y-2">
          <button onClick={handleReservation} className="primary-button h-10">
            예약하기
          </button>

          <button
            className="bg-gray-800 text-white hover:text-white h-10 rounded-lg hover:bg-gray-900"
            onClick={onCancel}
          >
            돌아가기
          </button>
        </div>
      </div>
    </Modal>
  );
}
