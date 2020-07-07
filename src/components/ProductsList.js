import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  const removeAllProducts = () => {
    ProductDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    ProductDataService.findByName(searchName)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Products List</h4>

        <ul className="list-group">
          {products &&
            products.map((product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProducts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Product</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentProduct.name}
            </div>
            <div>
              <label>
                <strong>Qty:</strong>
              </label>{" "}
              {currentProduct.qty}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentProduct.price}
            </div>

            <Link
              to={"/products/" + currentProduct.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;