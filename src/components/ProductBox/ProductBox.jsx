import React from "react";
import "./ProductBox.css";

const ProductBox = ({ item }) => {
  return (
    <div className="box">
      <img src={item.image} />
      <div className="content">
        <h5>{item.title}</h5>
        <span>{item.price}</span>
      </div>
    </div>
  );
};

export default ProductBox;
