import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Modal({ children }: Props) {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        {/* <form method="dialog" className="modal-box"> */}
        <>{children}</>
        {/* </form> */}
      </div>
    </dialog>
  );
}
