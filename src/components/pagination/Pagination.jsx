import React, { useEffect, useState } from "react";
import "./pagination.css";
import axios from "axios";
import ProductBox from "../ProductBox/ProductBox";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemPage = 8;

  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://655f2b37879575426b44b8f7.mockapi.io/products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  //   toplam sehife sayini hesablanan hisse
  const totalPage = Math.ceil(products.length / itemPage);
  // sehifedeki gorunen productlarin filterlenmesi
  const currrentItems = products.slice(
    (currentPage - 1) * itemPage,
    currentPage * itemPage
  );
  //   next
  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  //   prev
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="">
      <div className="container">
        {loading ? (
          <span>Loading</span>
        ) : (
          currrentItems.map((item) => <ProductBox key={item.id} item={item} />)
        )}
      </div>
      <div className="currentPage">
        <h4>
          sehife : {currentPage} /{totalPage}
        </h4>
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage == 1}> Evvelki</button>
        <button onClick={nextPage} disabled = {currentPage == totalPage}> Sonraki</button>
      </div>
    </div>
  );
};

export default Pagination;
