import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [packages, setPackages] = useState([]);

  // Fetch Products
  useEffect(() => {
    axios.get("http://localhost:5000/api/getproducts").then((response) => {
      setProducts(response.data);
    });
  }, []);

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

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleToggle(product)}
                checked={!!selectedProducts.find((p) => p._id === product._id)}
              />
              {product.name} - ${product.price} - {product.weight}g
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handlePlaceOrder}>Place Order</button>

      <h2>Order Summary</h2>
      {packages.length > 0 ? (
        packages.map((pkg, index) => (
          <div key={index}>
            <h3>Package {index + 1}</h3>
            <p>Items: {pkg.items.join(", ")}</p>
            <p>Total Weight: {pkg.totalWeight}g</p>
            <p>Total Price: ${pkg.totalPrice}</p>
            <p>Courier Price: ${pkg.courierPrice}</p>
          </div>
        ))
      ) : (
        <p>No packages yet.</p>
      )}
    </div>
  );
}

export default App