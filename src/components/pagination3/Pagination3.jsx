import React, { useEffect, useState } from "react";
import "../pagination/pagination.css"
import axios from "axios";
import ProductBox from "../ProductBox/ProductBox";
// import ProductBox from "../ProductBox/ProductBox";

const Pagination3 = () => {
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

  const totalPage = Math.ceil(products.length / itemPage);

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 2) pageNumbers.push(1);

    if (currentPage > 3) pageNumbers.push("...");

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPage - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPage - 2) pageNumbers.push("...");
    if (currentPage < totalPage) pageNumbers.push(totalPage);

    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== "..." && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const currrentItems = products.slice(
    (currentPage - 1) * itemPage,
    currentPage * itemPage
  );

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">
      <div className="container">
        {loading ? (
          <span>Loading...</span>
        ) : (
          currrentItems.map((item) => <ProductBox key={item.id} item={item} />)
        )}
      </div>

      <div className="currentPage">
        <h4>
          Sayfa: {currentPage} / {totalPage}
        </h4>
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Önceki
        </button>

        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(number)}
            className={currentPage === number ? "active" : ""}
            disabled={number === "..."}
          >
            {number}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPage}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Pagination3;
