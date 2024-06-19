import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import data from "../../data.json";
import axios from "axios";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    // console.log(postId);
    const [post, setPost] = useState(null); // 게시글 상태를 null로 초기화합니다.

    // const post = data.find((item) => {
    //     return item.id == postId;
    // });

    const [comment, setComment] = useState("");

    // 서버로부터 게시글을 불러오는 함수
    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/post/${postId}`,{headers:{"Authorization":localStorage.getItem('access_token')}});
            console.log("콘솔찍히나?")
            console.log(response)
            return response.data.response
            // setPost(response.data.response); // 서버로부터 받은 데이터로 상태를 업데이트합니다.
        } catch (error) {
            console.error("게시글을 불러오는 데 실패했습니다.", error);
        }
    };

    const foo = async () => {
        const data = await fetchPost();
        setPost(data)
        console.log("setpost")
        console.log(data)
    }
    
    // 컴포넌트가 마운트될 때 fetchPost 함수를 호출합니다.
    useEffect( () => {
        foo();
    }, []); // postId가 변경될 때마다 fetchPost 함수를 호출합니다.

    // 게시글이 로드되지 않았을 때 로딩 표시 또는 대체 UI를 제공할 수 있습니다.
    if (!post) {
        return <div>로딩 중...</div>;
    }

    return (
        <Wrapper>
            <Container>
                <Button
                    title="뒤로 가기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.contents}</ContentText>
                </PostContainer>

                {/* <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments} /> */}

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title="댓글 작성하기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;