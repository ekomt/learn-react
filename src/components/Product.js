import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";

const Product = props => {
  const initialProductState = {
    id: null,
    name: "",
    qty: 0,
    price: 0
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleInputChangeNumber = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: parseInt(value) });
  };

  const updatePublished = status => {
    var data = {
      id: currentProduct.id,
      name: currentProduct.name,
      qty: currentProduct.qty,
      published: status
    };

    ProductDataService.update(currentProduct.id, data)
      .then(response => {
        setCurrentProduct({ ...currentProduct, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct.id, currentProduct)
      .then(response => {
        console.log(response.data);
        setMessage("The product was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="qty">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                value={currentProduct.qty}
                onChange={handleInputChangeNumber}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteProduct}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;