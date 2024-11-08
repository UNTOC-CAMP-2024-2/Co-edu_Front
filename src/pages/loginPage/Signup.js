import React, {useState} from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logoImg from "../../images/logoImg.png";
import { IoEyeOff, IoEye } from "react-icons/io5";

const Signup = () => {
    const [selectedRole, setSelectedRole] = useState("멘토");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repasswordVisible, setRePasswordVisible] = useState(false);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const PasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const RePasswordVisibility = () => {
        setRePasswordVisible(!repasswordVisible);
    }

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
            <div className = "flex flex-col items-center mt-[40px]">
                <h2 className = "text-3xl font-bold mb-[30px]">
                    회원가입
                </h2>
                <form className = "w-[600px] space-y-[40px]">
                    <div>
                        <h3 className="text-[16px] font-semibold mb-4">로그인 정보</h3>
                        <div className = "space-y-[17px]">
                            <div className = "flex justify-between items-center">
                                <label htmlFor="id" className = "text-[18px] w-[115px]">
                                    아이디
                                </label>
                                <input type = "text" 
                                id = "id" 
                                placeholder = "6~16자/영문 소문자, 숫자 사용가능"
                                className="text-[16px] w-[450px] px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"/>
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-[18px] w-[115px]">
                                    비밀번호
                                </label>
                                <div className="relative w-[450px]">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="password"
                                        placeholder="8~16자/문자,숫자,특수 문자 모두 혼용 가능"
                                        className="text-[16px] w-full px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                                    />
                                    <button
                                        type="button"
                                        onClick={PasswordVisibility}
                                        className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {passwordVisible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="confirmPassword" className="text-[18px] w-[115px]">
                                    비밀번호 확인
                                </label>
                                <div className="relative w-[450px]">
                                    <input
                                        type={repasswordVisible ? "text" : "password"}
                                        id="password"
                                        placeholder="비밀번호를 다시 입력해주세요"
                                        className="text-[16px] w-full px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                                    />
                                    <button
                                        type="button"
                                        onClick={RePasswordVisibility}
                                        className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {repasswordVisible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[16px] font-semibold mb-4">회원 정보</h3>
                        <div className = "space-y-[17px]">
                            <div className = "flex justify-between items-center">
                                <label htmlFor="name" className = "text-[18px] w-[115px]">
                                    이름
                                </label>
                                <input type = "text" 
                                id = "name" 
                                placeholder = "실명을 입력해주세요"
                                className="text-[16px] w-[450px] px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"/>
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="emil" className="text-[18px] w-[115px]">
                                    이메일
                                </label>
                                <div className = "relative w-[450px]">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="이메일을 입력해주세요 ex) coedu@gmail.com"
                                        className="text-[16px] px-[10px] w-full py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                                    />
                                    <button className="absolute right-[6px] top-1/2 transform -translate-y-1/2 px-4 py-1 bg-lightMint text-white font-semibold rounded-lg">인증</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="emailVerification" className="text-[18px] w-[115px]">
                                    이메일 인증
                                </label>
                                <div className = "relative w-[450px]">
                                    <input
                                        type="text"
                                        id="emailVerification"
                                        placeholder="이메일에 전송된 인증 코드를 입력해주세요"
                                        className="text-[16px] px-[10px] w-full py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                                    />
                                    <button className="absolute right-[6px] top-1/2 transform -translate-y-1/2 px-4 py-1 bg-lightMint text-white font-semibold rounded-lg">확인</button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[18px] w-[115px]">회원 유형</span>
                                <div className="flex w-[450px] justify-center space-x-[100px]">
                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect("멘토")}
                                        className={`px-[28px] py-[6px] text-[17px] ${
                                            selectedRole === "멘토"
                                                ? "bg-white border-[4px] border-lightMint rounded-full"
                                                : ""
                                        }`}
                                    >
                                        멘토
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect("멘티")}
                                        className={`px-[28px] py-[6px] text-[17px] ${
                                            selectedRole === "멘티"
                                                ? "bg-white border-[4px] border-lightMint rounded-full"
                                                : ""
                                        }`}
                                    >
                                        멘티
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/login" className="block w-full">
                        <button
                            type="button"
                            className="w-full py-[13px] bg-lightMint text-white font-bold text-[18px] rounded-lg hover:bg-darkMint"
                        >
                            가입하기
                        </button>
                    </Link>
                    <div className="h-[40px]"></div>
                </form>
            </div>
        </div>
        
    );
};

export default Signup;