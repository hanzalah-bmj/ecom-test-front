// productService.js

const productService = {
    getProducts: async () => {
      try {
        const response = await fetch('http://localhost:5000/catalog');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        return products;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
  
  export default productService;