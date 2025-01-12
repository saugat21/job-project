import React from 'react'

const OrderSummary = ({ packages }) => {
  return (
    <div>
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
    </div>
  );
};

export default OrderSummary