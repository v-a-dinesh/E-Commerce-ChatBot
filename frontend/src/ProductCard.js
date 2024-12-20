// ProductCard.js (Frontend React.js)

import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
        </div>
    );
};

export default ProductCard;
