import React, { useContext, useEffect, useState } from "react";
import StudyComponent from "./Components/StudyComponent";
import StudyDetailModal from "./Components/StudyDetailModal";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Context } from "../../AppProvider";

const SearchClassroom = () => {
  const { token } = useContext(Context);
  const searchedData = useLocation().state; // API로부터 받은 데이터
  const queryClient = useQueryClient();
  const [isStudyDetailModalOpen, setIsStudyDetailModalOpen] = useState(null);

  const { data: cachedData } = useQuery({
    queryKey: ["searchedClassrooms"],
    queryFn: () => Promise.resolve(searchedData), // 이미 받은 데이터를 Promise로 래핑
    initialData: () =>
      queryClient.getQueryData(["searchedClassrooms"]) || searchedData, // 초기 데이터
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
  });

  useEffect(() => {
    console.log(searchedData); // 검색 결과 확인
    if (searchedData) {
      queryClient.setQueryData(["searchedClassrooms"], searchedData);
    }
  }, [searchedData, queryClient]);

  return (
    <div className="mx-20 min-h-[calc(100vh-110px)] flex flex-col pt-10 ">
      <div className="mx-[2.2rem] flex flex-wrap gap-x-[3rem]">
        {cachedData?.data?.length > 0 ? (
          cachedData.data.map((study, index) => (
            <StudyComponent
              key={index}
              detail={{
                title: study.class_name, // 클래스 이름
                name: study.description, // 설명
                day: study.day, // 요일
                time: `${study.start_time} ~ ${study.end_time}`, // 시간
              }}
              onClick={() =>
                setIsStudyDetailModalOpen({
                  title: study.class_name,
                  name: study.description,
                  day: study.day,
                  startTime: study.start_time,
                  endTime: study.end_time,
                  mentor: study.created_by,
                  studyNumber: study.max_member,
                  joiningMethod: study.is_free ? "자유 가입제" : "승인 가입제",
                  classcode: study.class_code,
                  token,
                })
              }
            />
          ))
        ) : (
          <p>검색된 데이터가 없습니다.</p>
        )}
      </div>
      {isStudyDetailModalOpen && (
        <StudyDetailModal
          isStudyDetailModalOpen={isStudyDetailModalOpen}
          setIsStudyDetailModalOpen={setIsStudyDetailModalOpen}
        />
      )}
    </div>
  );
};

export default SearchClassroom;
