import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; // 전체 화면 높이
`;

const StyledForm = styled.form`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: calc(100% - 20px); // 오른쪽에 여백을 추가합니다.
    padding: 10px;
    margin-right: 20px; // 오른쪽 여백을 명시적으로 추가합니다.
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const CheckButton = styled.button`
    padding: 5px 10px;
    margin-left: 10px; // 버튼과 입력창 사이의 간격
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #e7e7e7;
    color: #333;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: #d7d7d7;
    }
`;

function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();
    const [userEmail, setuserEmail] = useState("");
    const [isuserEmailAvailable, setIsuserEmailAvailable] = useState(true);

    // 이메일 중복 확인 함수
    // const checkuserEmailAvailability = async (userEmail) => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:8080/api/check-userEmail?userEmail=${userEmail}`
    //         );
    //         setIsuserEmailAvailable(false);
    //     } catch (error) {
    //         console.error(error);
    //         alert("이미 사용 중인 이메일입니다!!!");
    //         setIsuserEmailAvailable(true);
    //         reset({
    //             userEmail: "",
    //             password: "",
    //             confirmPassword: "",
    //         });
    //     }
    // };

    // 이메일 중복 확인 버튼 클릭 핸들러
    // const handleCheckuserEmailClick = () => {
    //     checkuserEmailAvailability(userEmail);
    // };

    // const handleuserEmailChange = (event) => {
    //     setuserEmail(event.target.value);
    //     console.log(userEmail);
    // };

    // 이메일 입력 변경 시 중복 확인
    // const handleEmailChange = (event) => {
    //     console.log(userEmail);
    //     const emailValue = event.target.value;
    //     setuserEmail(emailValue);
    //     if (emailValue.includes("@")) {
    //         checkuserEmailAvailability(emailValue);
    //     }
    // };

    // 비밀번호 확인
    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            // 스프링 서버의 회원가입 API 엔드포인트로 POST 요청을 보냅니다.
            const response = await axios.post(
                "http://localhost:8080/api/register",
                data
            );
            console.log(data);
            // 회원가입 성공 후의 로직을 여기에 작성합니다.
            alert(`${data.userEmail}님 회원가입을 축하드립니다 🎊`);
            navigate("/login");
        } catch (error) {
            console.error(data);
            console.error(error);
            // 에러 처리 로직을 여기에 작성합니다.
            alert("이미 사용 중인 이메일입니다!");
            reset({
                userEmail: "",
                password: "",
                confirmPassword: "",
            });
        }
    };

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <FormField></FormField>
                <FormField>
                    <Label htmlFor="userEmail">이메일</Label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                            id="userEmail"
                            // onChange={handleEmailChange}
                            {...register("userEmail", {
                                required: "이메일은 필수 입력 사항입니다.",
                            })}
                        />
                        {/* &nbsp; &nbsp;
                        <button onClick={handleCheckuserEmailClick}>
                            중복 확인
                        </button> */}
                    </div>
                    {errors.userEmail && <p>{errors.userEmail.message}</p>}
                    {!isuserEmailAvailable && (
                        <p>이미 사용 중인 이메일입니다.</p>
                    )}{" "}
                </FormField>
                <FormField>
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "비밀번호는 필수 입력 사항입니다.",
                            minLength: {
                                value: 8,
                                message: "비밀번호는 8자 이상이어야 합니다.",
                            },
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </FormField>
                <FormField>
                    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            validate: (value) =>
                                value === password ||
                                "비밀번호가 일치하지 않습니다.",
                        })}
                    />
                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                    )}
                </FormField>
                <SubmitButton type="submit">회원가입</SubmitButton>
            </StyledForm>
        </FormWrapper>
    );
}
export default RegisterForm;
