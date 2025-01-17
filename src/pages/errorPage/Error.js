import React from "react";
import { useRouteError } from "react-router-dom";
import errorImage from "../../images/error404.png";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={errorImage} alt="Error 404" className="w-[500px] mb-[20px]" />
      <h1 className="text-[30px] font-bold text-[#525252] mb-[15px]">
        죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
      </h1>
      <p className="text-center text-[#686868] text-[18px]">
        페이지 주소가 잘못 입력되었거나,
        <br />
        주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
      </p>
    </div>
  );
};

export default Error;
