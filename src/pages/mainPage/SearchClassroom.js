import React, { useEffect, useState } from "react";
import StudyComponent from "./Components/StudyComponent";
import StudyDetailModal from "./Components/StudyDetailModal";
import { useLocation } from "react-router-dom";

const SearchClassroom = () => {
  const searchedData = useLocation().state;
  const [isStudyDetailModalOpen, setIsStudyDetailModalOpen] = useState(null);

  useEffect(() => {
    console.log(searchedData);
  });

  return (
    <div className="mx-20 min-h-[calc(100vh-110px)] flex flex-col pt-10 ">
      <div className="mx-[2.2rem] flex flex-wrap gap-x-[3rem]">
        <StudyComponent
          detail={{
            title: "이것은 스터디인가 토크쇼인가 C++ 이해하기",
            name: "김태우",
            day: "월, 화, 수",
            time: "16 : 30 ~ 18 : 30",
          }}
          onClick={() =>
            setIsStudyDetailModalOpen({
              title: "이것은 스터디인가 토크쇼인가 C++ 이해하기",
              name: "김태우",
              day: "월, 화, 수",
              time: "16 : 30 ~ 18 : 30",
            })
          }
        />
      </div>
      {isStudyDetailModalOpen && (
        <StudyDetailModal
          setIsStudyDetailModalOpen={setIsStudyDetailModalOpen}
        />
      )}
    </div>
  );
};

export default SearchClassroom;
