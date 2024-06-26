import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import MainPage from "../page/MainPage";
import { AuthContext } from "../context/AuthProvider";
import { useState, useContext } from "react";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; // 필드를 살짝 위로 올립니다.
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

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);

    const onSubmit = async (data) => {
        try {
            // 스프링 서버의 로그인 api 엔드포인트로 post 요청을 보낸다.
            const response = await axios
                .post("http://localhost:8080/api/user/login", data)
                .then((res) => {
                    // JWT 토큰 저장
                    let accessToken = res.headers.authorization;
                    localStorage.setItem("access_token", accessToken);
                });
            console.log(data);
            //로그인 성공 후의 로직을 여기에 작성한다.
            alert(data.userEmail + "님, 성공적으로 로그인 되었습니다 🔐");

            // localStorage.setItem("bbs_access_token", data.token);
            // localStorage.setItem("id", data.userEmail);

            setAuth(data.userEmail);
            navigate("/");
        } catch (error) {
            console.error(error);
            console.log(data);
            // 에러처리 로직을 여기에 작성한다.
            alert("이메일 또는 비밀번호가 틀렸습니다.🔐");
            reset({ userEmail: "", password: "" }); // 이메일과 비밀번호 필드를 빈 문자열로 초기화합니다.
        }
    };

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Title>로그인</Title>
                <FormField>
                    <Label htmlFor="userEmail">이메일</Label>
                    <Input
                        id="userEmail"
                        type="userEmail"
                        {...register("userEmail", {
                            required: "이메일은 필수 입력 사항입니다.",
                        })}
                    />
                    {errors.userEmail && <p>{errors.userEmail.message}</p>}
                </FormField>
                <FormField>
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "비밀번호는 필수 입력 사항입니다.",
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </FormField>
                <SubmitButton type="submit">로그인</SubmitButton>
            </StyledForm>
        </FormWrapper>
    );
}

export default LoginForm;
