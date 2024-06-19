import React, {
    Children,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../list/PostList";
import Button from "../ui/Button";
import data from "../../data.json";
import Toolbar from "../Toolbar";
import AuthProvider from "../context/AuthProvider";
import { AuthContext } from "../context/AuthProvider";
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

const Header = styled.header`
    width: 100%;
    max-width: 720px;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

const Spacer = styled.div`
    flex: 1; // 이 부분이 헤더의 왼쪽 공간을 차지합니다.
`;

const NavigationButton = styled(Button)`
    margin-left: auto; // 버튼을 오른쪽으로 정렬합니다.
`;

function MainPage(props) {
    // const { auth, username, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    // const [posts, setPosts] = useState([]); // 게시글 목록 상태를 관리합니다.

    // 서버로부터 게시글 목록을 불러오는 함수
    // const fetchPosts = async () => {
    //     try {
    //         const response = await axios.get("여기에_서버_URL");
    //         setPosts(response.data); // 서버로부터 받은 데이터로 상태를 업데이트합니다.
    //     } catch (error) {
    //         console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
    //         alert("게시글 불러오기 실패!");
    //     }
    // };

    // 컴포넌트가 마운트될 때 fetchPosts 함수를 호출합니다.
    // useEffect(() => {
    //     fetchPosts();
    // }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 호출되도록 합니다.

    return (
        <Wrapper>
            <Header>
                <Spacer /> {/* 여기에 Spacer 컴포넌트를 추가합니다. */}
                <div>
                    {auth ? (
                        <>
                            <span>{auth}님, 환영합니다! </span>
                            <NavigationButton
                                title="로그아웃"
                                onClick={() => {
                                    navigate("/logout");
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <NavigationButton
                                title="로그인"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            />
                            <NavigationButton
                                title="회원가입"
                                onClick={() => {
                                    navigate("/register");
                                }}
                            />
                        </>
                    )}
                </div>
            </Header>
            <Container>
                <Button
                    title="글 작성하기"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />
                <PostList
                    // posts={posts} // 상태로 관리되는 posts 배열을 PostList 컴포넌트에 전달합니다.
                    // onClickItem={(item) => {
                    //     navigate(`/post/${item.id}`);
                    // }}
                    posts={data}
                    onClickItem={(item) => {
                        navigate(`/post/${item.id}`);
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default MainPage;
