import React from "react";
import Highlight from "react-highlight";
import { HiMiniUsers } from "react-icons/hi2";

const MentorDoFeedbackPage = () => {
  const code =
    "import pandas as pd\nfor i in range(4):\n\tprint('hello world')";

  return (
    <div className="flex h-full">
      <div className="h-full">
        <Highlight className="python">{code}</Highlight>
        <div>
          <HiMiniUsers color={"#54CEA6"} />
          <div className="text-darkMint font-semibold">김효정</div>
        </div>
      </div>
      <div>
        <div>과제 코드 총평</div>
        <div>
          <textarea className="w-[calc(100%-40px)] px-[15px] py-[10px] border-[2px] border-[#54CEA6] bg-[#F8FFF9] rounded-[10px] text-[16px] text-[#525252] leading-[24px] resize-none focus:outline-none"></textarea>
        </div>
      </div>
    </div>
  );
};

export default MentorDoFeedbackPage;
