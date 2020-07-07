import React, { useState } from "react";
import ProductDataService from "../services/ProductService";

const AddProduct = () => {
  const initialProductState = {
    id: null,
    name: "",
    qty: 0,
    price: 0
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleInputChangeNumber = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: parseInt(value) });
  };

  const saveProduct = () => {
    var data = {
      name: product.name,
      qty: product.qty,
      price: product.price
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          name: response.data.name,
          qty: response.data.qty,
          price: response.data.price
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="qty">Qty</label>
            <input
              type="text"
              className="form-control"
              id="qty"
              required
              value={product.qty}
              onChange={handleInputChangeNumber}
              name="qty"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (prevent over posting sample) </label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={product.price}
              onChange={handleInputChangeNumber}
              name="price"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;