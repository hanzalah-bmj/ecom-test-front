import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Catalog from './Catalog'; // Assuming Catalog component handles product display

const CategoryProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/by-category/${slug}`);
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByCategory();
  }, [slug]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="catalog">
      {/* Replace with your own catalog component or mapping */}
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.productName}</h2>
          <p>{product.productDes}</p>
          <img src={product.productImg} alt={product.productName} />
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
