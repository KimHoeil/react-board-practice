// // src/Login.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setLoggedIn }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // 간단한 검증
//         if (!email || !password) {
//             setError("Email and password are required");
//             return;
//         }

//         // 로그인 요청 (여기서는 가짜 API를 사용)
//         try {
//             const response = await fakeLoginApi(email, password);
//             if (response.success) {
//                 setLoggedIn(true);
//                 navigate("/board");
//             } else {
//                 setError(response.message);
//             }
//         } catch (err) {
//             setError("An unexpected error occurred");
//         }
//     };

//     const fakeLoginApi = (email, password) => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 if (email === "test@example.com" && password === "password") {
//                     resolve({ success: true });
//                 } else {
//                     resolve({
//                         success: false,
//                         message: "Invalid email or password",
//                     });
//                 }
//             }, 1000);
//         });
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
