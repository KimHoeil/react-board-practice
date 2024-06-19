import React, { useState } from "react";
import Toolbar from "./Toolbar";

function LandingPage(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickLogin = () => {
        setIsLoggedIn(true);
    };

    const onClikLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Toolbar
                isLoggedIn={isLoggedIn}
                onClickLogin={onClickLogin}
                onClikLogout={onClikLogout}
            ></Toolbar>
            {/* <div style={{ padding: 16 }}>리액트 게시판 만들기!</div> */}
        </div>
    );
}

export default LandingPage;
