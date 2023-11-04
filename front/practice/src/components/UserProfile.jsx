import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const email = sessionStorage.getItem("email");
  const userRole = sessionStorage.getItem("role");
  const storeId = sessionStorage.getItem("storeid");
  const token = sessionStorage.getItem("token");

  let url;

  const [isSeller, setIsSeller] = useState(false);

  const [user, setUser] = useState({
    name: "ON&OFF",
    profileImage: "https://via.placeholder.com/150x150",
    email: email,
    nickname: userRole,
    phoneNumber: "010-1234-5678",
  });

  useEffect(() => {
    if (userRole === "user") {
      setIsSeller(false);
    } else if (userRole === "seller") {
      setIsSeller(true);
    }
      const fetchData = async () => {
      const response = await fetch(
        'https://port-0-gateway-12fhqa2llofoaeip.sel5.cloudtype.app/user?email='+email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setUser({
          ...user, // 기존 user 객체를 복사합니다.
          email: result.email, // email 속성만 변경합니다.
          nickname: result.nickname, // nickname 속성만 변경합니다.
          profileImage: result.profileImage// profileImage 속성만 변경합니다.
        });
        console.log(result.profileImage);
  
      } else {
        console.log("실패");
      }
    };
  
    fetchData();


  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리 로직을 구현합니다.

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("storeid");
    // 페이지 이동
    navigate("/");
  };

  const handleConnectSeller = () => {
    // seller사이트 접속 처리 로직을 구현합니다.

    // 페이지 이동
    navigate("/seller");
  };

  return (
    <div className="user-profile">
      <div className="profile-section">
        <div className="profile-image">
          <img src={user.profileImage} alt="프로필 사진" />
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.nickname}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-btn-container">
        <Link to="/user/edit" className="user-link">
          <button className="edit-profile-btn">
            <span role="img" aria-label="pencil">
              ✏️
            </span>{" "}
            나의 회원정보 수정
            <div className="move-page-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </button>
        </Link>

        <Link to="/user/chattingList" className="user-link">
          <button className="chattingList-btn">
            <span role="img" aria-label="conversation">
              💬
            </span>{" "}
            나의 1대1 상담 내역
            <div className="move-page-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </button>
        </Link>
      </div>

      <div className="move-seller-page-btn-container">
        {isSeller && (
          <button
            className="move-seller-page-btn"
            onClick={handleConnectSeller}
          >
            사장님 페이지 연결
            <div className="move-page-icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </button>
        )}
      </div>

      <div className="user-logout-btn-container">
        <button className="user-logout-btn" onClick={handleLogout}>
          로그아웃
          <div className="move-page-icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
