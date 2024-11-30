import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logoImg from "../../images/logoImg.png";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useForm } from "react-hook-form";
import {
  useCheckEmailVertificationCode,
  useRegister,
  useSendEmailVertificationCode,
} from "../../hooks/useAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const watchId = watch("id");
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");
  const watchName = watch("name");
  const watchEmail = watch("email");
  const watchEmailVerification = watch("emailVerification");
  const [selectedRole, setSelectedRole] = useState(true);

  const sendEmailVertificationCodeMutation = useSendEmailVertificationCode();
  const checkEmailVertificationCodeMutation = useCheckEmailVertificationCode();
  const registerMutation = useRegister();

  const handleSendEmailVertificationCode = (e) => {
    e.preventDefault();
    sendEmailVertificationCodeMutation.mutate({
      user_id: watchId,
      email: watchEmail,
    });
  };

  const handleCheckEmailVertificationCode = (e) => {
    e.preventDefault();
    checkEmailVertificationCodeMutation.mutate({
      user_id: watchId,
      email: watchEmail,
      code: watchEmailVerification,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerMutation.mutate({
      user_id: watchId,
      password: watchPassword,
      name: watchName,
      email: watchEmail,
      is_mentor: selectedRole,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repasswordVisible, setRePasswordVisible] = useState(false);

  const PasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const RePasswordVisibility = () => {
    setRePasswordVisible(!repasswordVisible);
  };

  return (
    <div className="flex flex-col items-center mt-[40px]">
      <h2 className="text-3xl font-bold mb-[30px]">회원가입</h2>
      <form className="w-[600px] space-y-[40px]">
        <div>
          <h3 className="text-[16px] font-semibold mb-4">로그인 정보</h3>
          <div className="space-y-[17px]">
            <div className="flex justify-between items-center">
              <label htmlFor="id" className="text-[18px] w-[115px]">
                아이디
              </label>
              <input
                type="text"
                id="id"
                placeholder="6~16자/영문 소문자, 숫자 사용가능"
                className="text-[16px] w-[450px] px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                {...register("id", {
                  pattern: {
                    value: /^[a-zA-Z0-9]{6,16}$/,
                    message: "6~16자의 아이디로 입력해주세요",
                  },
                })}
              />
            </div>
            <span className="text-notSubmittedRed">
              {errors.id && errors.id.message}
            </span>
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
                  {...register("password", {
                    pattern: {
                      value: /^(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^&*]{8,16}$/,
                      message: "8~16자의 비밀번호로 입력해주세요",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={PasswordVisibility}
                  className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {passwordVisible ? (
                    <IoEye size={20} />
                  ) : (
                    <IoEyeOff size={20} />
                  )}
                </button>
              </div>
            </div>
            <span className="text-notSubmittedRed">
              {errors.password && errors.password.message}
            </span>
            <div className="flex justify-between items-center">
              <label
                htmlFor="confirmPassword"
                className="text-[18px] w-[115px]"
              >
                비밀번호 확인
              </label>
              <div className="relative w-[450px]">
                <input
                  type={repasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="비밀번호를 다시 입력해주세요"
                  className="text-[16px] w-full px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                  {...register("confirmPassword", {
                    validate: {
                      check: (val) => {
                        if (getValues("password") !== val) {
                          return "비밀번호가 일치하지 않습니다";
                        }
                      },
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={RePasswordVisibility}
                  className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {repasswordVisible ? (
                    <IoEye size={20} />
                  ) : (
                    <IoEyeOff size={20} />
                  )}
                </button>
              </div>
            </div>
            <span className="text-notSubmittedRed">
              {errors.confirmPassword && errors.confirmPassword.message}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-[16px] font-semibold mb-4">회원 정보</h3>
          <div className="space-y-[17px]">
            <div className="flex justify-between items-center">
              <label htmlFor="name" className="text-[18px] w-[115px]">
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="실명을 입력해주세요"
                className="text-[16px] w-[450px] px-[10px] py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                {...register("name", {
                  pattern: {
                    value: /^[가-힣]+$/,
                    message: "한글로 입력해주세요",
                  },
                })}
              />
            </div>
            <span className="text-notSubmittedRed">
              {errors.name && errors.name.message}
            </span>
            <div className="flex justify-between items-center">
              <label htmlFor="emil" className="text-[18px] w-[115px]">
                이메일
              </label>
              <div className="relative w-[450px]">
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요 ex) coedu@gmail.com"
                  className="text-[16px] px-[10px] w-full py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                  {...register("email")}
                />
                <button
                  onClick={handleSendEmailVertificationCode}
                  className="hover:bg-darkMint absolute right-[6px] top-1/2 transform -translate-y-1/2 px-4 py-1 bg-lightMint text-white font-semibold rounded-lg"
                >
                  인증
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="emailVerification"
                className="text-[18px] w-[115px]"
              >
                이메일 인증
              </label>
              <div className="relative w-[450px]">
                <input
                  type="text"
                  id="emailVerification"
                  placeholder="이메일에 전송된 인증 코드를 입력해주세요"
                  className="text-[16px] px-[10px] w-full py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                  {...register("emailVerification")}
                />
                <button
                  onClick={handleCheckEmailVertificationCode}
                  className="hover:bg-darkMint absolute right-[6px] top-1/2 transform -translate-y-1/2 px-4 py-1 bg-lightMint text-white font-semibold rounded-lg"
                >
                  확인
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[18px] w-[115px]">회원 유형</span>
              <div className="flex w-[450px] justify-center space-x-[100px]">
                <button
                  type="button"
                  onClick={() => setSelectedRole(true)}
                  className={`px-[28px] py-[6px] text-[17px] ${
                    selectedRole
                      ? "bg-white border-[4px] border-lightMint rounded-full"
                      : ""
                  }`}
                >
                  멘토
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole(false)}
                  className={`px-[28px] py-[6px] text-[17px] ${
                    !selectedRole
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
        <Link className="block w-full">
          <button
            type="button"
            className="w-full py-[13px] bg-lightMint text-white font-bold text-[18px] rounded-lg hover:bg-darkMint"
            onClick={handleRegister}
          >
            가입하기
          </button>
        </Link>
        <div className="h-[40px]"></div>
      </form>
    </div>
  );
};

export default Signup;
