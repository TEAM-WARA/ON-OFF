import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";

export default function ChattingList() {
  const [visitorUserEmails, setVisitorUserEmails] = useState([]);
  const userId = localStorage.getItem("email"); // 실제 userId 값으로 대체
  const token = localStorage.getItem("token"); // 실제 token 값으로 대체
  const { id } = useParams();
  const CHATTING_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DJANGO_CHATTING_URL : process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [roundImage, setRoundImage] = useState(
    "https://via.placeholder.com/150x150"
  );

  // 서버에서 채팅 목록을 불러오는 기능 추가
  useEffect(() => {
    async function fetchChattingList() {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://' : ''}${CHATTING_URL}chat/rooms/?email=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

        // userId와 visitor_user_email이 다른 경우만 남깁니다.
        data = data.filter((room) => room.shop_user_email !== userId);

        const userRoomInfoPromises = data.map(async (room) => {
          const image = await fetchImage(room.shop_user_email);
          return {
            email: room.shop_user_email,
            latestMessage: room.latest_message,
            image: image,
          };
        });

        const userRoomInfo = await Promise.all(userRoomInfoPromises);
        setVisitorUserEmails(userRoomInfo);
      } catch (error) {
        console.error("Error getting visitor_user_emails:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchChattingList();
  }, [userId]);

  const fetchImage = async (email) => {
    const response = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://' : ''}${process.env.REACT_APP_API_URL}user?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      setRoundImage(result.profileImage); // 상태 업데이트
      console.log("성공");
      console.log(result.email);
      console.log(result.profileImage);
      return result.profileImage;
    } else {
      console.log("실패");
    }
  };

  const navigate = useNavigate();

  const handleConnectChatting = (user) => {
    // 채팅버튼 클릭 시 로그인 상태 체크 후 라우팅 진행.
    if (userId === null) {
      navigate("/login");
    } else if (userId !== null) {
      navigate(`/chatting/${user.email}`, {
        state: { seller: user.email },
      });
    }
  };
  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  } else {
    return (
      <div className="chatting-list">
        <Header />
        <div className="chatting-list-container">
          <div className="chatting-lists">
            {visitorUserEmails.map((user, index) => (
              <div key={index} className="list-item">
                <div
                  className="button-link"
                  onClick={() => handleConnectChatting(user)}
                >
                  <div className="list-item-content">
                    <img src={user.image} alt="User" className="round-image" />
                    <div className="user-details">
                      <h2>{user.email}</h2>
                      <p>최근 메세지: {user.latestMessage}</p>
                    </div>
                  </div>
                </div>
                <div className="card-separator"></div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }
}
