import React from 'react'

const ProductList = ({ products, selectedProducts, handleToggle }) => {
  return (
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
  );
};

export default ProductList