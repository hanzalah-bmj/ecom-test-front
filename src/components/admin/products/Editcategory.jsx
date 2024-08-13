import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCategory, fetchCategoryById } from '../../../reducers/categorySlice'; // Import necessary actions

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);
  
  const category = useSelector((state) =>
    state.category.categories.find((cat) => cat._id === id)
  );

  const [categoryName, setCatgoryName] = useState('');
  const [categorySlug, setCatgorySlug] = useState('');
  const [categoryDescription, setCatgoryDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('');

  useEffect(() => {
    if (category) {
      setCatgoryName(category.categoryName);
      setCatgorySlug(category.categorySlug);
      setCatgoryDescription(category.categoryDescription);
      setParentCategory(category.parentCategory || '');
    } else {
      dispatch(fetchCategoryById(id)); // Fetch category if not already available
    }
  }, [category, dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedSlug = categorySlug || categoryName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const categoryData = {
      id,
      categoryName,
      categorySlug: generatedSlug,
      categoryDescription,
      parentCategory: parentCategory || null,
    };
    dispatch(updateCategory(categoryData));
    navigate('/admin/products/categories');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Edit Category</h2>
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
            {categories.map((cat) => (
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
          Update Now
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
