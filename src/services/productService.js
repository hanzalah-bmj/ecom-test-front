//productService.js
const API_URL = 'http://localhost:5000/products/';

const productService = {
  getProducts: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  },

  getProductDetails: async (productId) => {
    const response = await fetch(`${API_URL}${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return await response.json();
  },

  addProduct: async (productData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return await response.json();
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default productService;

