import React, { useEffect, useState } from 'react'
import axios from "axios";
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import OrderSummary from './components/OrderSummary';
import Loader from './components/Loader';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setIsLoading(true); 
    axios
      .get("https://job-project-ld1b.onrender.com/api/getproducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const handleToggle = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.find((p) => p._id === product._id);
      const updatedSelectedProducts = isSelected
        ? prev.filter((p) => p._id !== product._id)
        : [...prev, product];

      updatePackages(updatedSelectedProducts);
      return updatedSelectedProducts;
    });
  };

  const updatePackages = (updatedSelectedProducts) => {
    if (updatedSelectedProducts.length === 0) {
      setPackages([]);
    } else {
      axios
        .post("https://job-project-ld1b.onrender.com/api/submitorder", {
          selectedProducts: updatedSelectedProducts,
        })
        .then((response) => {
          setPackages(response.data);
        });
    }
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
      {isLoading ? (
        <Loader />
      ) : (
        <ProductList
          products={products}
          selectedProducts={selectedProducts}
          handleToggle={handleToggle}
        />
      )}
      <OrderSummary packages={packages} />
      <AddProduct fetchProducts={fetchProducts} />
    </div>
  );
}

export default App