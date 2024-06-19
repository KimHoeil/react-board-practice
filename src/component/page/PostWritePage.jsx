import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from "axios"; // axios를 임포트합니다.

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; // 필드를 살짝 위로 올립니다.
`;

const StyledForm = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px; // 폼과 버튼 사이의 간격을 조정합니다.
`;

const StyledTextInput = styled(TextInput)`
    width: calc(100% - 20px); // 오른쪽에 여백을 추가합니다.
    margin-bottom: 20px; // 입력 필드 사이의 간격을 조정합니다.
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SubmitButton = styled(Button)`
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

function PostWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 서버로 데이터를 전송하는 함수
    const handleSubmit = async () => {
        try {
            const response = await axios.post("여기에_서버_URL", {
                title: title,
                content: content,
            });
            console.log(response.data); // 응답 데이터를 콘솔에 출력합니다.
            navigate("/"); // 게시글 작성 후 홈으로 이동합니다.
        } catch (error) {
            console.error("게시글 작성이 실패했습니다.", error);
        }
    };

    return (
        <Wrapper>
            <StyledForm>
                <Title>게시글 작성하기</Title> {/* 타이틀 추가 */}
                <StyledTextInput
                    height={20}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                <StyledTextInput
                    height={480}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />
                <SubmitButton title="글 작성하기" onClick={handleSubmit} />
            </StyledForm>
        </Wrapper>
    );
}

export default PostWritePage;
