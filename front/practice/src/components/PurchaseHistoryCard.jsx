import React, { useState } from 'react';
import '../components/OrderProducts.css';

export default function PurchaseHistoryCard({data}) {

    // const [quantity, setQuantity] = useState(selectedBread.product.quantity); //수량
    // const perPrice = parseInt (selectedBread.product.price); // Product당 가격 * 개수 값
return (
    <div className="orderProductList"> 
    {/* <div style={{display: 'flex', height:'3vh'}}>
    <label>{selectedBread.product.p_name}</label>
    </div>
    <div style={{display:'flex',justifyContent:'space-around'}}>
     <div className="imageWrapper">
     <img src={selectedBread.product.p_image} alt="bread" className="breadImage" />
    </div>
        <span className="dayOption">{selectedBread.product.color + ", " + selectedBread.product.size}</span> 
        <label>{quantity} 개</label>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
        <label>{perPrice}원</label> 
    </div>
        </div> */}
</div>
);
}