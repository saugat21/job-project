import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ fetchProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    weight: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.weight) {
      setError("All fields are required!");
      return;
    }

    setError("");
    axios.post("http://localhost:5000/api/addproduct", newProduct).then(() => {
      fetchProducts();
      setNewProduct({ name: "", price: "", weight: "" });
      document.getElementById("closeModalButton").click();
    });
  };

  return (
    <div
      className="modal fade"
      id="addProductModal"
      tabIndex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductModalLabel">
              Add New Product
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeModalButton"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddProduct}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight (g)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={newProduct.weight}
                  onChange={handleInputChange}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct