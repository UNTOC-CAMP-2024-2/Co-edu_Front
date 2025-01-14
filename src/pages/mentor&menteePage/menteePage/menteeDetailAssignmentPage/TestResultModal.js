import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const TestResultModal = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[12rem] w-[30rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={onClose}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
        </div>
        <ul className="py-[15px] px-[10px] flex flex-col items-center">
          <p className="pb-[15px] text-[20px] text-[#686868] font-bold">
            TESTCASE : <span className="text-[#FF6E6E]">{result.total}</span>개
            중 <span className="text-[#FF6E6E]">{result.passed}</span>개
            통과하였습니다.
          </p>
          <p className="text-[20px] text-[#686868] font-bold">
            점수 : {result.score}점
          </p>
        </ul>
      </div>
    </div>
  );
};

export default TestResultModal;
