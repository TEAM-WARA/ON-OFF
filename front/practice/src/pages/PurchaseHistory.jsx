import { Link, useNavigate } from "react-router-dom";
import Data from "../DB/Data.json";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card"; // Card 컴포넌트 임포트
import EventButton from "../components/EventButton";
import Header from "../components/Header";
import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import PurchaseProduct from "../components/PurchaseProduct";
import "../components/CartComponents.css";
import PurchaseHistoryCard from "../components/PurchaseHistoryCard";

export default function PurchaseHistory() {

    const [purchaseItems, setPurchaseItems] = useState ([]);
  const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");


    // 총 금액
//   const totalPrice = purchaseItems.reduce((acc, item) => acc + (item.product.price), 0);


  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          `http://52.79.186.117:8000/api/payment/read/user/${email}`,
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
          console.log(result);

          if(result.result === "success"){
            setPurchaseItems(result.data);

            result.data.map(data => {
            
            let productId = data.productId;
            let optionId = data.optionId;

            // const response = fetch(
            //     `http://52.79.186.117:8000/api/product/all/${productId}/option/${optionId}`,
            //     {
            //       method: "GET",
            //       headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `${token}`
            //       },
            //     }
            //   );
            //  const result = response.json();
            //   if (response.status === 200) {
            //     console.log("성공");
            //     console.log(result);
            //   } else {
            //     console.log("실패");
            //   }
            });
          }
          else{
            console.log("구매내역 없음");
          }

        } else {
          console.log("실패");
        }
      };
      fetchData();

  }, []);



  return (
    <div className="cart-page">
      <Header />
      <div>
        {purchaseItems.length && ( 
            <div className="Cart">
    {purchaseItems.map(data =>(
        <PurchaseHistoryCard
            data={data}
            // checkList={checkList}
        />
        ))}
        </div>
        )}
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px'}}>
        <div>
          <label>구매 상품 개수: </label>
          <span>{purchaseItems.length}</span>
        </div>
        <div>
          <label>결제 총 금액: </label>
          {/* <span>{totalPrice.toLocaleString()}원</span>  */}
        </div>
      </div>

      {/* <EventButton buttonText={"결제"} onClick={clickPurchase} /> */}
      <BottomNav />
    </div>
  );
}