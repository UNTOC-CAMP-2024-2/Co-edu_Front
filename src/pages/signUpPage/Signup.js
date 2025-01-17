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
  const [button1, setButton1] = useState(true);
  const [button2, setButton2] = useState(false);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const sendEmailVertificationCodeMutation = useSendEmailVertificationCode();
  const checkEmailVertificationCodeMutation = useCheckEmailVertificationCode();
  const registerMutation = useRegister();

  useEffect(() => {
    if (!errors.email) {
      setButton1(false);
    }
  }, [errors.email]);

  const handleSendEmailVertificationCode = (e) => {
    e.preventDefault();
    setButton1(true);
    sendEmailVertificationCodeMutation.mutate(
      {
        user_id: watchId,
        email: watchEmail,
      },
      {
        onSuccess: (data) => {
          setMessage1(data.여부);

          setTimeout(() => {
            setMessage1("");
          }, 3000);
        },
        onError: (error) => {
          setMessage1(error.response.data.detail);

          setTimeout(() => {
            setMessage1("");
          }, 3000);
        },
      }
    );

    setTimeout(() => {
      setButton1(false);
    }, 4000);
  };

  const handleCheckEmailVertificationCode = (e) => {
    e.preventDefault();
    setButton2(true);
    checkEmailVertificationCodeMutation.mutate(
      {
        user_id: watchId,
        email: watchEmail,
        code: watchEmailVerification,
      },
      {
        onSuccess: (data) => {
          setMessage2(data.여부);

          setTimeout(() => {
            setMessage2("");
          }, 3000);
        },
        onError: (error) => {
          setMessage2(error.response.data.detail);

          setTimeout(() => {
            setMessage2("");
          }, 3000);
        },
      }
    );

    setTimeout(() => {
      setButton2(false);
    }, 2000);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // 모든 필수 항목 확인
    if (
      !watchId ||
      !watchPassword ||
      !watchConfirmPassword ||
      !watchName ||
      !watchEmail ||
      !watchEmailVerification
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 이메일 인증 확인이 되었는지도 체크하고 싶다면
    // message2 상태를 활용해서 체크할 수 있습니다
    if (!message2 || !message2.includes("인증이 완료되었습니다")) {
      // 성공 메시지 문구에 맞게 수정 필요
      alert("이메일 인증을 완료해주세요.");
      return;
    }

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
                  placeholder="이메일을 입력해주세요 ex) coedu@pusan.ac.kr"
                  className="text-[16px] px-[10px] w-full py-[8px] border-[1.7px] border-[#CED4DA] rounded-lg focus:outline-none focus:border-lightMint"
                  {...register("email", {
                    pattern: {
                      value: /^[a-zA-Z0-9]+@pusan\.ac\.kr$/,
                      message: "이메일 형식에 맞게 입력해주세요",
                    },
                  })}
                />
                <button
                  disabled={errors.email || button1}
                  onClick={handleSendEmailVertificationCode}
                  className={`${
                    errors.email || button1 ? "bg-lightMint" : "bg-darkMint"
                  } absolute right-[6px] top-1/2 transform -translate-y-1/2 px-4 py-1 text-white font-semibold rounded-lg`}
                >
                  인증
                </button>
              </div>
            </div>
            <span className="text-notSubmittedRed">
              {errors.email && errors.email.message}
            </span>
            <div></div>
            <span className="text-notSubmittedRed">{message1 && message1}</span>

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
                  disabled={button2}
                  onClick={handleCheckEmailVertificationCode}
                  className={`${
                    button2 ? "bg-lightMint" : "bg-darkMint"
                  } absolute right-[6px] top-1/2 transform -translate-y-1/2 px-4 py-1 text-white font-semibold rounded-lg`}
                >
                  확인
                </button>
              </div>
            </div>
            <span className="text-notSubmittedRed">{message2 && message2}</span>
            {/* <div className="flex justify-between items-center">
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
            </div> */}
          </div>
        </div>
        <Link className="block w-full">
          <button
            type="button"
            className="w-full py-[13px] text-white font-bold text-[18px] rounded-lg bg-darkMint"
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
