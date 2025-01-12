import React, { useEffect, useState } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    weight: "",
  });
  const [error, setError] = useState("");

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/getproducts").then((response) => {
      setProducts(response.data);
    });
  };

  // Handle Checkbox Toggle
  const handleToggle = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.find((p) => p._id === product._id);
      if (isSelected) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Place Order
  const handlePlaceOrder = () => {
    axios
      .post("http://localhost:5000/api/submitorder", { selectedProducts })
      .then((response) => {
        setPackages(response.data);
      });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Add New Product
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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Product Management Test</h1>
      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          Add New Product
        </button>
      </div>
      <ul className="list-group mb-4">
        {products.map((product) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={product._id}
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                onChange={() => handleToggle(product)}
                checked={!!selectedProducts.find((p) => p._id === product._id)}
              />
              {product.name} - ${product.price} - {product.weight}g
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mb-4">
        <button className="btn btn-success" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      <h2>Order Summary</h2>
      {packages.length > 0 ? (
        packages.map((pkg, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Package {index + 1}</h5>
              <p>Items: {pkg.items.join(", ")}</p>
              <p>Total Weight: {pkg.totalWeight}g</p>
              <p>Total Price: ${pkg.totalPrice}</p>
              <p>Courier Price: ${pkg.courierPrice}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No packages yet.</p>
      )}

      {/* Add Product Modal */}
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
    </div>
  );
}

export default App