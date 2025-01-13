import React, { useState } from "react";
import { FaArrowCircleRight, FaRegQuestionCircle } from "react-icons/fa";
import MenteeModalOpen from "./ModalOpen/MenteeModalOpen";
import MentorModalOpen from "./ModalOpen/MentorModalOpen";
import { useLocation } from "react-router-dom";

const CommonMainComponent = ({ classroomData }) => {
  const {
    class_code,
    class_name,
    created_by,
    day,
    start_time,
    end_time,
    link,
  } = classroomData;

  const location = useLocation();
  const isMentor = location.pathname.includes("/mentor");
  const isMentee = location.pathname.includes("/mentee");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mx-5 mt-10 flex flex-col gap-2">
        <div className="text-3xl text-lightBlack font-semibold flex items-center space-x-2">
          <span>
            {class_name} &#40; {class_code} &#41;{" "}
          </span>
          <button onClick={handleOpenModal} aria-label="Open Modal">
            <FaRegQuestionCircle size={20} />
          </button>
        </div>
        <div className="flex justify-between">
          <div
            className="flex flex-col justify-end cursor-pointer underline text-darkMint"
            onClick={() => window.open(`${link}`)}
          >
            Study LINK
          </div>
          <div className="flex">
            <div className="w-[20rem] flex flex-col justify-center items-center gap-3">
              <div className="inline-block">
                <div className="text-studyBlack">👑{created_by}</div>
                <div className="text-studyBlack">
                  {day} {start_time} ~ {end_time} ✏️
                </div>
              </div>
              <button className="flex gap-3 border-3 border-lightMint rounded-full px-4 py-3">
                <div className="text-darkMint tracking-tighter text-xl font-semibold">
                  스터디 방으로 이동
                </div>
                <FaArrowCircleRight color="#54CEA6" size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-2 bg-darkMint h-[3px] border-0 opacity-100" />

      {isMentor && (
        <MentorModalOpen isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      {isMentee && (
        <MenteeModalOpen isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CommonMainComponent;
