import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const AuthorText = styled.p`
    font-size: 16px;
    color: #555; // 작성자 이름의 색상을 설정합니다.
    margin-bottom: 4px; // 제목과의 간격을 설정합니다.
`;

function PostListItem(props) {
    const { post, onClick } = props;

    return (
        <Wrapper onClick={onClick}>
            <AuthorText>작성자: {post.userEmail}</AuthorText>
            <TitleText>{post.title}</TitleText>
        </Wrapper>
    );
}

export default PostListItem;
