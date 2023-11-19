import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "./Card"; // Card 컴포넌트 임포트
import "./Card.css";

function CardList({ category }) {
  const { id } = useParams();

  const userId = sessionStorage.getItem("email");
  const userRole = sessionStorage.getItem("role");
  const storeId = sessionStorage.getItem("storeid");
  const token = sessionStorage.getItem("token");

  const [categoryData, setCategoryData] = useState(null); // 상태 추가
  var result;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://port-0-gateway-12fhqa2llofoaeip.sel5.cloudtype.app/product/user/category/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json(); // response.json()이 완료될 때까지 기다림

        setCategoryData(data); // 상태 업데이트

        console.log(data[0].productId);
        console.log(data);
        console.log("성공");
      } else {
        console.log("실패");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card-list">
      {categoryData &&
        categoryData.map((result) => (
          <Link
            to={`/item/${result.productId}`}
            key={result.productId}
            className="card-link"
          >
            <Card
              key={result.productId}
              title={result.productName}
              subTitle={result.productCategory}
              price={result.options[0].productPrice}
              mainImage={result.productUrls[0]}
              count={result.options[0].productStock}
            />
          </Link>
        ))}
    </div>
  );
}

export default CardList;
