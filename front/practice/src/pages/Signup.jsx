import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSignup = () => {
    // 회원가입 처리 로직을 구현합니다.
  };

  return (
    <div className="signup-container">
      <h2>회원가입 페이지</h2>
      <form className="signup-form">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">사용자명</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
        />

        <label htmlFor="phone-number">전화번호</label>
        <input
          type="text"
          id="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="role-selection">
          <label>회원 유형:</label>
          <div>
            <input
              type="radio"
              id="customer"
              value="customer"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
            />
            <label htmlFor="customer">고객</label>
          </div>
          <div>
            <input
              type="radio"
              id="seller"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
            />
            <label htmlFor="seller">판매자</label>
          </div>
        </div>

        <button onClick={handleSignup}>회원가입</button>

        <p className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
