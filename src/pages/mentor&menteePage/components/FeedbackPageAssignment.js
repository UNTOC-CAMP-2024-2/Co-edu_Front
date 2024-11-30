import React, { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import { FaRegCircle } from "react-icons/fa";
import { PiTriangleBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const FeedbackPageAssignment = ({ type }) => {
  const [showDescription, setShowDescription] = useState(false);

  const dct = {
    done: <FaRegCircle color="#54CEA6" size={20} />,
    undone: <IoClose color="#FF6E6E" size={28} />,
    halfDone: <PiTriangleBold color="#FF6E6E" size={23} />,
    gotFeedback: <FaBookmark color="#FF6E6E" size={25} />,
    gaveFeedbackAll: <FaCheck color="#54CEA6" size={23} />,
    notGaveFeedbackAll: <PiTriangleBold color="#FF6E6E" size={23} />,
    gaveFeedbackFew: <IoClose color="#FF6E6E" size={28} />,
  };

  const icon = dct[type];

  return (
    <div
      className={`border-2 rounded-xl w-[50rem] py-[0.7rem] px-3 cursor-pointer ${
        type === "gotFeedback"
          ? "border-darkRed bg-lightRed"
          : showDescription
          ? "border-lightMint bg-white"
          : "border-gray bg-[#F5F5F5]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 flex justify-center">{icon}</div>
        <div className="text-lightBlack font-semibold text-lg">
          별 찍기 과제
        </div>
        <div className="flex-grow flex justify-end items-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지
              setShowDescription((prev) => !prev);
            }}
          >
            {showDescription ? (
              <VscTriangleUp
                color={type === "gotFeedback" ? "#FF8B8B" : "#a8e6cf"}
                size={25}
              />
            ) : (
              <VscTriangleDown
                color={type === "gotFeedback" ? "#FF8B8B" : "#c4c4c4"}
                size={25}
              />
            )}
          </button>
        </div>
      </div>
      {showDescription && (
        <div className="text-lightBlack pt-3 pb-1 px-3">
          Answer the frequently asked question in s simple sentences, a longish
          aragraph, or even in a list.asdf asdfasd fasdf fadds
        </div>
      )}
    </div>
  );
};

export default FeedbackPageAssignment;
