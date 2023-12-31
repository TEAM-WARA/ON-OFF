import BottomNav from "../components/BottomNav";
import EventButton from "../components/EventButton";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderInformation from '../components/OrderInformation';
import OrderProducts from '../components/OrderProducts';
import "../components/CartComponents.css";
import Modal from 'react-modal';
import {
  message
} from "antd";

export default function Cart() {

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const [modalIsOpen, setModalIsOpen] = useState(false); //팝업창
  const CART_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DJANGO_CART_URL : process.env.REACT_APP_API_URL;
  let navigate = useNavigate();

  function purchaseFunc(e) {  //구매하기 기능
    console.log("구매");
    const selectedItems = selectedBread.filter(bread => checkList.includes(bread.cart_item_id)); // 선택된 아이템만 필터링

    if (selectedItems.length === 0) {
      message.error("선택된 상품이 없습니다.", 1);
      console.log("선택된 상품이 없습니다.");
      return;
    }
    else {
      navigate("/user/purchase", { state: { selectedItems: selectedItems, checkList: checkList } });
    }
  }

  const [selectedBread, setSelectedBread] = useState([]);
  const [checkList, setCheckList] = useState(); // 체크박스 리스트
  const [numberOfBread, setNumberOfBread] = useState(0);
  const [reload, setReload] = useState(false); // 장바구니 페이지 새로고침

  const changeSingleBox = (checked, id) => {
    if (checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter(el => el !== id));
    }
  };

  const changeAllBox = checked => {
    if (checked) {
      const allCheckBox = [];
      selectedBread.forEach(el => allCheckBox.push(el.cart_item_id));
      setCheckList(allCheckBox);
    } else {
      setCheckList([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NODE_ENV === 'development' ? 'http://' : ''}${CART_URL}cart/items/?user_email=` + email,
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
        console.log("성공");
        setSelectedBread(result);
        setNumberOfBread(result.length);

        const allCheckBox = [];
        selectedBread.forEach(el => allCheckBox.push(el.cart_item_id));
        setCheckList(allCheckBox);

        console.log(result);
      } else {
        console.log(response);
        console.log("실패");
      }
    };
    fetchData();

    // Event Listener 등록
    const handleOptionChange = () => setReload(Date.now());
    window.addEventListener('optionChanged', handleOptionChange);

    // Component가 unmount될 때 Event Listener 해제
    return () => window.removeEventListener('optionChanged', handleOptionChange);


  }, [reload]);


  useEffect(() => {
    const allCheckBox = [];
    selectedBread.forEach(el => allCheckBox.push(el.cart_item_id));
    setCheckList(allCheckBox);
  }, [selectedBread]);

  useEffect(() => {
    console.log("체크 박스 개수: " + numberOfBread);
    console.log("체크리스트 :" + checkList);
  }, [selectedBread, checkList]);



  function deleteFunc() {  //삭제 버튼 기능

    var deleteString = '';
    checkList.forEach(id => {
      deleteString += `&cart_item_id=${id}`;
    });

    console.log(deleteString);
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NODE_ENV === 'development' ? 'http://' : ''}${CART_URL}cart/items/?user_email=` + email + deleteString,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          },
        }
      );
      if (response.status === 204) {
        console.log("성공");
        setModalIsOpen(false);
        window.dispatchEvent(new CustomEvent('optionChanged'));
      }
      else {
        console.log(response);
        console.log("실패");
        console.log(response.status);
      }
    };
    fetchData();
  }

  return (
    <div className="cart-page">
      <Header />
      {selectedBread.length > 0 ? (
        <div className="shoppingBag">
          <div className="orderContainer">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center"}}>
                <OrderInformation
                  changeAllBox={changeAllBox}
                  checkList={checkList}
                  numberOfBread={numberOfBread}
                />
                <div style={{ width: "80px", alignItems: "center"}}>
                  <label style={{}}>전체선택</label>
                </div>
              </div>

              <button id="normal-button" style={{height:"2.5rem"}} onClick={() => setModalIsOpen(true)}>삭제</button>
            </div>

            <Modal className='Modal' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
              현재 선택된 상품을 <br/>
              삭제하시겠습니까?
              <div style={{ display: "flex" }}>
                <button className="changeOption" onClick={() => setModalIsOpen(false)} 
                style={{ width: "5rem", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)', height:"2.5rem"}}>취소</button>
                <div style={{ width: "0.5rem" }}></div>
                <button className="changeOption" 
                style={{ backgroundColor: "#32A4FF", color: "white", width: "5rem", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)', height:"2.5rem"}} onClick={deleteFunc}>삭제</button>
              </div>
            </Modal>
            {selectedBread.map(data =>
            (
              <OrderProducts
                selectedBread={selectedBread}
                key={data.cart_item_id}
                changeSingleBox={changeSingleBox}
                data={data}
                checkList={checkList}
              />
            ))}
          </div>
        </div>
       ) : (
        <h2>장바구니가 비어있습니다.</h2> // 상품이 없을 때 표시할 메시지 또는 컴포넌트
      )}
      <div style={{bottom: "1rem", position: "fixed", justifyContent:"center", transform: "translate(-50%, -50%)", left:"50%"}}>
      <EventButton  buttonText={"구매하기"} onClick={purchaseFunc} />
      </div>
      <BottomNav />
    </div>
  );
}