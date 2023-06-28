import Modal from "antd/es/modal/Modal";
import { Reservation } from "../../types/reservation";
import dayjs from "dayjs";

export type Props = {
  open: boolean;
  onCancel: () => void;
  reservationDetail?: {
    start: Date;
    end: Date;
    rooms: {
      name: string;
      capacity: number;
    };
    users: {
      name: string;
    };
  };
};

export default function ReservationDetailModal({
  open,
  onCancel,
  reservationDetail,
}: Props) {
  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-lg font-bold">회의실 예약 정보</div>
        </div>
        <div className="flex flex-col">
          <div className="text-base ">
            {reservationDetail?.rooms.name} {reservationDetail?.rooms.capacity}
            인
          </div>
          <div className="text-base">
            {dayjs(reservationDetail?.start).format("YYYY-MM-DD HH:mm")} ~{" "}
            {dayjs(reservationDetail?.end).format("YYYY-MM-DD HH:mm")}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="text-base text-gray-500">
            {reservationDetail?.users.name}
          </div>
        </div>
      </div>
    </Modal>
  );
}
