import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logoImg from "../../images/logoImg.png";
import { useLogin } from "../../hooks/useAuth";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = (e) => {
    console.log({ user_id: id, password: password });
    e.preventDefault();
    loginMutation.mutate({ user_id: id, password: password });
  };

  return (
    <div className="flex flex-col items-center mt-[90px]">
      <h2 className="text-3xl font-bold mb-8">로그인</h2>
      <form className="w-[350px]">
        <div className="mb-[20px]">
          <label
            htmlFor="id"
            className="block text-gray-700 text-base mb-[5px] pl-[5px]"
          >
            아이디
          </label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
            id="id"
            placeholder="아이디"
            className="w-full px-[10px] py-[12px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
          />
        </div>
        <div className="mb-[45px]">
          <label
            htmlFor="password"
            className="block text-gray-700 text-base mb-[5px] pl-[5px]"
          >
            비밀번호
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="비밀번호"
            className="w-full px-[10px] py-[12px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-[13px] bg-lightMint text-white font-bold text-[18px] rounded-lg hover:bg-darkMint"
        >
          로그인
        </button>
      </form>
      <div className="flex justify-center mt-4 space-x-2 text-[14px] text-[#969696]">
        <Link to="#" className="hover:text-darkMint">
          아이디 찾기
        </Link>
        <span>|</span>
        <Link to="#" className="hover:text-darkMint">
          비밀번호 찾기
        </Link>
        <span>|</span>
        <Link to="/signup" className="hover:text-darkMint">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
