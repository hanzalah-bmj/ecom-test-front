//categoryServices.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/categories'; // Replace with your API URL

// Fetch all categories
const getCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

// Add a new category
const addCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData);
  return response;
};

// Update an existing category
const updateCategory = async (categoryData) => {
  const response = await axios.put(`${API_URL}/${categoryData.id}`, categoryData);
  return response;
};

// Delete a category
const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${API_URL}/${categoryId}`);
  return response;
};

const categoryService = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
};

export default categoryService;

// //categoryServices.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/categories/'; // Replace with your API URL

// // Fetch all categories
// const getCategories = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       throw error;
//     }
// };

// export const addCategory = async (categoryData) => {
//     const response = await axios.post(API_URL, categoryData);
//     return response.data;  // Return response data directly
// };

// export const updateCategory = async (categoryData) => {
//     const response = await axios.put(`${API_URL}${categoryData.id}`, categoryData);
//     return response.data;
//   };

// // Delete a category
// const deleteCategory = async (categoryId) => {
//   const response = await axios.delete(`${API_URL}${categoryId}`);
//   return response.data;
// };

// const categoryService = {
//   getCategories,
//   addCategory,
//   updateCategory,
//   deleteCategory
// };

// export default categoryService;

