import React, { useEffect, useState } from "react";
import "../pagination/pagination.css";
import "./new.css";
import axios from "axios";
import ProductBox from "../ProductBox/ProductBox";

const Pagination4 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemLimit = 20;

  const getApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://655f2b37879575426b44b8f7.mockapi.io/products?page=${page}&limit=${itemLimit}`
      );
      const newProducts = response.data;

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setLoading(false);

      if (newProducts.length < itemLimit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container-head">
      <div className="container">
        {products.map((item) => (
          <ProductBox key={item.id} item={item} />
        ))}
      </div>

      <div className="load">
        {!loading && hasMore && (
          <button onClick={loadMore} className="load-more">
            Daha cox...
          </button>
        )}
        {loading && <span>Loading...</span>}
        {!hasMore && <span> hamisi yüklendi</span>}
      </div>
    </div>
  );
};

export default Pagination4;
