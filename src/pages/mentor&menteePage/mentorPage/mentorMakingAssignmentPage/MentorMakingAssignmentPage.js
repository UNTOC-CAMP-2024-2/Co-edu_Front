import React from "react";

const MentorMakingAssignmentPage = () => {
  return (
    <div className="mx-[195px] mt-10 mb-20">
      {/* 제목 */}
      <div className="text-center mt-[80px] mb-[60px]">
        <h1 className="text-[35px]">과제 생성</h1>
      </div>

      {/* 과제 명 */}
      <div className="mb-[35px]">
        <div className="flex items-end justify-between mb-[8px]">
          {/* Label */}
          <label
            htmlFor="assignmentTitle"
            className="block text-[20px] ml-[15px] text-[#525252]"
          >
            과제 명
          </label>

          {/* 업로드하기 버튼 */}
          <button
            className="h-[45px] px-[25px] bg-[#54CEA6] text-white text-[20px] font-bold rounded-lg hover:bg-[#43A484]"
            onClick={() => alert("업로드되었습니다!")}
          >
            업로드 하기
          </button>
        </div>
        <input
          type="text"
          id="assignmentTitle"
          placeholder="과제 명을 여기에 입력해주세요."
          className="w-full h-[45px] px-[20px] border-[3px] border-[#E3F7EF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px]"
        />
      </div>

      {/* 과제 설명 */}
      <div className="mb-[50px]">
        <label
          htmlFor="assignmentDescription"
          className="block text-[20px] ml-[15px] mb-[8px] text-[#525252]"
        >
          과제 설명
        </label>
        <textarea
          id="assignmentDescription"
          placeholder="과제에 대하여 설명을 입력하여 주세요."
          className="w-full px-[15px] py-[12px] border-[3x] bg-[#E3F7EF] border-[#E3F7EF] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px] resize-none overflow-hidden"
          style={{ lineHeight: "30px", minHeight: "120px" }}
          onInput={(e) => {
            e.target.style.height = "auto"; // 높이 초기화
            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
          }}
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            {/* 예제 입력 */}
            <div>
              <label
                htmlFor={`exampleInput${num}`}
                className="block text-[18px] mb-[5px] ml-[15px]"
              >
                예제 입력 {num}
              </label>
              <div className="relative mt-1 mb-[20px]">
                <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              </div>
              <textarea
                id={`exampleOutput${num}`}
                rows={1}
                className="w-full px-[15px] py-[10px] border-[1px] border-[#969696] rounded-xl text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[18px] resize-none overflow-hidden"
                style={{ lineHeight: "30px", minHeight: "40px" }}
                onInput={(e) => {
                  e.target.style.height = "auto"; // 높이 초기화
                  e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
                }}
              ></textarea>
            </div>

            {/* 예제 출력 */}
            <div>
              <label
                htmlFor={`exampleOutput${num}`}
                className="block text-[18px] mb-[5px] ml-[15px]"
              >
                예제 출력 {num}
              </label>
              <div className="relative mt-1 mb-[20px]">
                <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              </div>
              <textarea
                id={`exampleOutput${num}`}
                rows={1}
                className="w-full px-[15px] py-[10px] border-[1px] border-[#969696] rounded-xl text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[18px] resize-none overflow-hidden"
                style={{ lineHeight: "30px", minHeight: "40px" }}
                onInput={(e) => {
                  e.target.style.height = "auto"; // 높이 초기화
                  e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
                }}
              ></textarea>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MentorMakingAssignmentPage;
