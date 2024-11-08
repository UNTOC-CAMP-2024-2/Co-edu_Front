import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logoImg from "../../images/logoImg.png";

const Login = () => {
    return (
        <div className="mx-20">
            <div className = "pt-6 mx-2">
                <div className="flex justify-end">
                    <Link to = "/login" className = "text-[0.8rem] text-[#C4C4C4] mr-[3px]"> 
                    로그인 / 회원가입   
                    </Link>
                </div>
            <div className = "flex justify-between items-end">
                <div className = "flex space-x-5">
                    <Link to = "/">
                        <img src = {logoImg} alt = "로고이미지"/>
                    </Link>
                    <form className = "flex items-center bg-inputPlaceholder rounded-full h-[2.7rem] p-[0.3rem]"
                        onSubmit = {(e) => e.preventDefault()}
                    >
                        <input className = "outline-none w-[25rem] mx-3 bg-transparent"/>
                        <button
                        type = "submit"
                        className= "bg-lightMint rounded-full p-[0.4rem]">
                            <IoSearch color = "white" size = "18"/>
                        </button>
                    </form>
                </div>
                <div className="flex space-x-12 mb-1 font-semibold text-[#686868]">
                    <Link>공지사항</Link>
                    <Link>스터디 개설</Link>
                    <Link>나의 스터디룸</Link>
                </div>
                </div>
            </div>
            <hr className="my-2 bg-hrColor h-[1px] border-0" />
            <div className = "flex flex-col items-center mt-[90px]">
                <h2 className = "text-3xl font-bold mb-8">
                    로그인
                </h2>
                <form className = "w-[350px]">
                    <div className = "mb-[20px]">
                        <label htmlFor = "id" className = "block text-gray-700 text-base mb-[5px] pl-[5px]">
                            아이디
                        </label>
                        <input type = "text" id = "id" placeholder = "아이디" className="w-full px-[10px] py-[12px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint" />
                    </div>
                    <div className = "mb-[45px]">
                        <label htmlFor = "password" className="block text-gray-700 text-base mb-[5px] pl-[5px]">
                            비밀번호
                        </label>
                        <input type = "password" id = "password" placeholder="비밀번호" className = "w-full px-[10px] py-[12px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"/>
                    </div>
                    <button type = "submit" className="w-full py-[13px] bg-lightMint text-white font-bold text-[18px] rounded-lg hover:bg-darkMint">로그인</button>
                </form>
                <div className="flex justify-center mt-4 space-x-2 text-[14px] text-[#969696]">
                    <Link to="#" className="hover:text-darkMint">아이디 찾기</Link>
                    <span>|</span>
                    <Link to="#" className="hover:text-darkMint">비밀번호 찾기</Link>
                    <span>|</span>
                    <Link to="/signup" className="hover:text-darkMint">회원가입</Link>
                </div>
            </div>
        </div>
        
    );
};

export default Login;