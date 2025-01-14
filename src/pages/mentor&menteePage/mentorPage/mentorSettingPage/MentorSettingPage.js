import React, { useState, useEffect, useContext } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CTimePicker } from "@coreui/react-pro";
import { IoCaretDownOutline } from "react-icons/io5";
import {
  useGetClassroomInfo,
  useApproveMember,
  useDenyMember,
  useKickMember,
  useEditClassInfo,
} from "../../../../hooks/useClassroom";
import { Context } from "../../../../AppProvider";

const MentorSettingPage = () => {
  const { token, classCode } = useContext(Context);
  const getClassroomInfoMutation = useGetClassroomInfo();

  const [members, setMembers] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  const initialState = {
    studyName: "",
    introduction: "",
    selectedDay: {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
    time: {
      start: "",
      end: "",
    },
    studyNumber: "",
    visibility: "",
    // pulbic -> 전체 공개
    // private -> 비공개
    joinType: "",
    // free -> 자유 가입제
    // approval -> 승인 가입제
    link: "",
  };
  const days = {
    월: "Mon",
    화: "Tue",
    수: "Wed",
    목: "Thu",
    금: "Fri",
    토: "Sat",
    일: "Sun",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [studentNumDropdown, setStudentNumDropdown] = useState(false);

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log("사용 중인 token:", token); // 디버깅용 로그
    console.log("사용 중인 classCode:", classCode);
    if (classCode && token) {
      getClassroomInfoMutation.mutate(
        { token, class_code: classCode },
        {
          onSuccess: (data) => {
            console.log("스터디룸 설정 정보 조회 성공", data);
            const when =
              data.class_info.day?.split(",").map((day) => day.trim()) || [];

            // 멤버와 가입 요청 데이터 설정

            setMembers(data.user_info || []);
            setJoinRequests(data.approval || []);
            console.log("클래스 정보 요일 데이터:", data.class_info.day);

            // 스터디룸 설정 정보 설정
            setState({
              studyName: data.class_info.class_name || "",
              introduction: data.class_info.description || "",
              selectedDay: Object.keys(days).reduce((acc, key) => {
                acc[days[key]] = when.includes(key) || false;
                return acc;
              }, {}),
              time: {
                start: data.class_info.start_time || "",
                end: data.class_info.end_time || "",
              },
              visibility: data.class_info.is_access ? "public" : "private",
              joinType: data.class_info.is_free ? "free" : "approval",
              link: data.class_info.link || "",
              studyNumber: data.class_info.max_member || "",
              createdBy: data.class_info.created_by || "",
            });

            setLoading(false);
          },
          onError: (error) => {
            console.error("스터디룸 설정 정보 조회 실패", error);
            setLoading(false);
          },
        }
      );
    }
  }, [token, classCode]);

  const { mutate: approveMember } = useApproveMember();
  const { mutate: denyMember } = useDenyMember();

  const handleApprove = (userId) => {
    // 승인할 사용자 정보 찾기
    const approvedUser = joinRequests.find((user) => user.user_id === userId);

    // 상태 즉시 업데이트
    setJoinRequests((prev) => prev.filter((user) => user.user_id !== userId));
    setMembers((prev) => [...prev, approvedUser]);

    // API 호출
    approveMember(
      { user_id: userId, class_code: classCode, token },
      {
        onSuccess: () => {
          alert("회원 승인이 완료되었습니다.");
        },
        onError: (error) => {
          console.error("회원 승인 실패:", error);

          // 상태 롤백
          setJoinRequests((prev) => [...prev, approvedUser]);
          setMembers((prev) => prev.filter((user) => user.user_id !== userId));

          alert("승인 중 문제가 발생했습니다.");
        },
      }
    );
  };

  const handleDeny = (userId) => {
    // 상태 즉시 업데이트
    const deniedUser = joinRequests.find((user) => user.user_id === userId);
    setJoinRequests((prev) => prev.filter((user) => user.user_id !== userId));

    // API 호출
    denyMember(
      { user_id: userId, class_code: classCode, token },
      {
        onSuccess: () => {
          alert("회원 거절이 완료되었습니다.");
        },
        onError: (error) => {
          console.error("회원 거절 실패:", error);

          // 상태 롤백
          setJoinRequests((prev) => [...prev, deniedUser]);

          alert("거절 중 문제가 발생했습니다.");
        },
      }
    );
  };

  const { mutate: kickMember } = useKickMember();

  const handleKick = (userId) => {
    // 강퇴된 사용자 정보 찾기
    const kickedUser = members.find((user) => user.user_id === userId);

    // 즉시 상태 업데이트 (화면에서 제거)
    setMembers((prev) => prev.filter((user) => user.user_id !== userId));

    // API 호출
    kickMember(
      { kick_user: userId, class_code: classCode, token },
      {
        onSuccess: () => {
          alert(`${userId} 멤버가 강퇴되었습니다.`);
        },
        onError: (error) => {
          console.error("강퇴 실패:", error);

          // 상태 롤백 (강퇴 취소)
          setMembers((prev) => [...prev, kickedUser]);

          alert("강퇴 중 문제가 발생했습니다.");
        },
      }
    );
  };

  const editClassInfoMutation = useEditClassInfo();
  const handleSave = () => {
    editClassInfoMutation.mutate(
      {
        class_code: classCode,
        class_name: state.studyName,
        description: state.introduction,
        max_member: state.studyNumber,
        day: Object.keys(state.selectedDay)
          .filter((day) => state.selectedDay[day])
          .join(","),
        start_time: state.time.start,
        end_time: state.time.end,
        is_access: state.visibility === "public",
        is_free: state.joinType === "free",
        link: state.link,
        token,
      },
      {
        onSuccess: () => {
          alert("클래스 정보가 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
          console.error("수정 중 오류 발생:", error);
          alert("클래스 정보를 수정하는 데 문제가 발생했습니다.");
        },
      }
    );
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mx-[195px] mt-10 mb-20">
      {/* 제목 */}
      <div className="text-center mt-[80px] mb-[60px]">
        <h1 className="text-[35px]">설정</h1>
      </div>

      {/* 스터디 명 */}
      <div className="mb-[35px]">
        <div className="flex items-end justify-between mb-[8px]">
          {/* Label */}
          <label
            htmlFor="Title"
            className="block text-[20px] ml-[15px] text-[#525252]"
          >
            스터디 명
          </label>

          <div className="flex items-center justify-end gap-4 mb-[35px]">
            {/* 저장하기 버튼 */}
            <button
              className="h-[45px] px-[25px] bg-[#54CEA6] text-white text-[20px] font-bold rounded-lg hover:bg-[#43A484]"
              onClick={handleSave}
            >
              저장 하기
            </button>
          </div>
        </div>
        <input
          type="text"
          id="Title"
          value={state.studyName}
          onChange={(e) => handleChange("studyName", e.target.value)}
          className="w-full h-[45px] px-[20px] border-[3px] border-[#E3F7EF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px]"
        />
      </div>

      {/* 스터디방 설명 */}
      <div className="mb-[50px]">
        <label
          htmlFor="studyIntroduction"
          className="block text-[20px] ml-[15px] mb-[8px] text-[#525252]"
        >
          한 줄 소개
        </label>
        <textarea
          id="studyIntroduction"
          value={state.introduction}
          onChange={(e) => handleChange("introduction", e.target.value)}
          className="w-full px-[15px] py-[12px] border-[3px] bg-[#E3F7EF] border-[#E3F7EF] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px] resize-none overflow-hidden"
          style={{ lineHeight: "30px", minHeight: "120px" }}
        ></textarea>
      </div>
      {/* 좌우 레이아웃 */}
      <div className="flex gap-8">
        {/* 왼쪽 패널 */}
        <div className="flex-1">
          {/* 요일 선택 */}
          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[6px] text-[#525252]">
              요일
            </div>
            <div className="flex justify-between mr-7">
              {Object.keys(days).map((day) => (
                <button
                  className={`text-[18px] text-black rounded-full w-10 h-10 ${
                    state.selectedDay[days[day]] && "bg-lightMint text-white"
                  }`}
                  onClick={() =>
                    setState({
                      ...state,
                      selectedDay: {
                        ...state.selectedDay,
                        [days[day]]: !state.selectedDay[days[day]],
                      },
                    })
                  }
                >
                  <div>{day}</div>
                </button>
              ))}
            </div>
          </div>
          {/* 수업 시간 */}
          <div>
            <div className="mb-[25px]">
              <div className="block text-[18px] ml-[18px] mb-[8px] text-[#525252]">
                수업시간
              </div>
              <div className="flex justify-between">
                <CTimePicker
                  className="w-[10rem]"
                  placeholder="시간 선택"
                  locale="ko"
                  seconds={false}
                  time={state.time.start}
                  onTimeChange={(time) =>
                    time &&
                    setState({
                      ...state,
                      time: {
                        ...state.time,
                        start: time.slice(0, 5),
                      },
                    })
                  }
                />
                <div className="font-semibold text-xl">~</div>
                <CTimePicker
                  className="w-[10rem]"
                  placeholder="시간 선택"
                  locale="ko"
                  seconds={false}
                  time={state.time.end}
                  onTimeChange={(time) =>
                    time &&
                    setState({
                      ...state,
                      time: {
                        ...state.time,
                        end: time.slice(0, 5),
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[5px] text-[#525252]">
              공개 여부
            </div>
            <div className="flex justify-evenly mr-[1rem]">
              <button
                className={`text-[18px] text-black py-2 px-5 rounded-full border-4 ${
                  state.visibility === "public"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setState({
                    ...state,
                    visibility: "public",
                  })
                }
              >
                전체 공개
              </button>
              <button
                className={`text-[18px] text-black py-2 px-5 rounded-full border-4 ${
                  state.visibility === "private"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setState({
                    ...state,
                    visibility: "private",
                  })
                }
              >
                비공개
              </button>
            </div>
          </div>
          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[5px] text-[#525252]">
              가입 방식
            </div>
            <div className="flex justify-evenly">
              <button
                className={`text-[18px] text-black  py-2 px-5 rounded-full border-4 ${
                  state.joinType === "free"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setState({
                    ...state,
                    joinType: "free",
                  })
                }
              >
                자유 가입제
              </button>
              <button
                className={`text-[18px] text-black py-2 px-5 rounded-full border-4 ${
                  state.joinType === "approval"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setState({
                    ...state,
                    joinType: "approval",
                  })
                }
              >
                승인 가입제
              </button>
            </div>
          </div>
          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[10px] text-[#525252]">
              채팅방 링크
            </div>
            <input
              className="bg-inputPlaceholder rounded-full w-full py-[5px] px-3"
              value={state.link}
              onChange={(e) =>
                setState({
                  ...state,
                  link: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="w-[1px] bg-[#D9D9D9] h-auto self-stretch"></div>
        {/* 오른쪽 패널 */}
        <div className="flex-1">
          {/* 스터디 인원 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="block text-[18px] ml-[25px] mb-[6px] text-[#525252]">
                스터디 인원
              </div>
              {/* 왼쪽 끝으로 위치 end */}
              <div className="flex itmems-center gap-4">
                <button
                  className="relative"
                  value={state.studyNumber}
                  onClick={() => setStudentNumDropdown((prev) => !prev)}
                >
                  <IoCaretDownOutline color="#A8E6CF" />
                  {studentNumDropdown && (
                    <ul className="absolute bg-white border-[1px] border-[#D9D9D9] rounded-xl mt-[3px] z-10 w-20 right-0">
                      {[2, 3, 4, 5, 6, 7].map((num) => (
                        <li
                          key={num}
                          onClick={() =>
                            setState({
                              ...state,
                              studyNumber: num,
                            })
                          }
                          className="font-semibold text-[16px] text-[#525252] px-4 py-[10px] hover:bg-lightMint hover:text-white cursor-pointer hover:rounded-xl"
                        >
                          {num} 명
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
                <div className="text-[18px] text-black mr-[40px]">
                  {state.studyNumber} 명
                </div>
              </div>
            </div>
          </div>

          {/* 멤버 */}
          <div className="border-[2px] border-[#D9D9D9] rounded-[20px] mr-[20px] mb-[30px]">
            {/* 상단 제목 */}
            <div className="flex justify-center items-center border-b-[2px] border-[#D9D9D9] py-[7px]">
              <p className="text-[18px] text-[#525252]">멤버</p>
            </div>

            {/* 멤버 리스트 */}
            <div className="px-6 py-[10px]">
              {members.length > 0 ? (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between px-6 py-[10px]"
                  >
                    <p className="text-[18px] text-black">{member.user_id}</p>
                    {member.user_id !== state.createdBy && (
                      <button
                        className="text-[16px] text-[#F56C6C] font-bold border-[3px] border-[#F56C6C] rounded-[10px] px-[10px] py-[3px] hover:bg-[#F56C6C] hover:text-white"
                        onClick={() => handleKick(member.user_id)}
                      >
                        강퇴
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-6">
                  <p className="text-[16px] text-[#969696]">멤버가 없습니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* 스터디 가입 신청 */}
          <div className="border-[2px] border-[#D9D9D9] rounded-[20px] mr-[20px]">
            {/* 상단 제목 */}
            <div className="flex justify-center items-center border-b-[2px] border-[#D9D9D9] py-[7px]">
              <p className="text-[18px] text-[#525252]">스터디 가입 신청</p>
            </div>

            {/* 멤버 리스트 */}
            <div className=" px-6 py-[10px]">
              {joinRequests.length > 0 ? (
                joinRequests.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between px-6 py-[10px]"
                  >
                    <p className="text-[18px] text-black">{user.user_id}</p>
                    <div className="flex gap-2">
                      <button
                        className="text-[16px] text-[#54CEA6] font-bold border-[3px] border-[#54CEA6] rounded-[10px] px-[10px] py-[3px] hover:bg-[#54CEA6] hover:text-white"
                        onClick={() => handleApprove(user.user_id)}
                      >
                        승인
                      </button>
                      <button
                        className="text-[16px] text-[#F56C6C] font-bold border-[3px] border-[#F56C6C] rounded-[10px] px-[10px] py-[3px] hover:bg-[#F56C6C] hover:text-white"
                        onClick={() => handleDeny(user.user_id)}
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-6">
                  <p className="text-[16px] text-[#969696]">
                    신청 목록이 없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSettingPage;
