import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from "./component/page/MainPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
// import Login from "./component/page/LoginPage";
import LoginForm from "./component/form/LoginForm";
import RegisterForm from "./component/form/RegisterForm";
import AuthProvider from "./component/context/AuthProvider";
import Logout from "./component/form/Logout";
import { HttpHeadersContext } from "./component/context/HttpHeadersProvider";

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <HttpHeadersContext>
                    <MainTitleText>리액트 게시판</MainTitleText>
                    <Routes>
                        <Route index element={<MainPage />} />
                        <Route path="post-write" element={<PostWritePage />} />
                        <Route path="post/:postId" element={<PostViewPage />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="logout" element={<Logout />} />
                    </Routes>
                </HttpHeadersContext>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
