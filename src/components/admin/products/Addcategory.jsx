import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../../reducers/categorySlice';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [categoryName, setCatgoryName] = useState('');
  const [categorySlug, setCatgorySlug] = useState('');
  const [categoryDescription, setCatgoryDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedSlug = categorySlug || categoryName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const categoryData = {
        categoryName: categoryName, // Changed this line
      categorySlug: generatedSlug, // Changed this line
      categoryDescription: categoryDescription, // Changed this line
      parentCategory: parentCategory || null,
    };
    dispatch(addCategory(categoryData));
    navigate('/admin/products/categories');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCatgoryName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
          <input
            type="text"
            value={categorySlug}
            onChange={(e) => setCatgorySlug(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category slug (optional)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={categoryDescription}
            onChange={(e) => setCatgoryDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Parent Category</label>
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">None</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Now
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
