//AddProducts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaFilesThunk } from '../../../reducers/mediaSlice';
import ImageSelector from './ImageSelector';

const AddProducts = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [regularPrice, setRegularPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [sku, setSku] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [stockStatus, setStockStatus] = useState('inStock'); // Default to 'inStock'
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [productId, setProductId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const dispatch = useDispatch();
  const { mediaFiles } = useSelector((state) => state.media);

  const categoryUrl = 'http://localhost:5000/categories';
  const productUrl = 'http://localhost:5000/products';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoryUrl);
        setCategoryList(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    dispatch(fetchMediaFilesThunk()); // Fetch media files on component mount
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(cat => cat !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      productImg: mainImage?.url || '', // Use the URL of the main image
      productImgs: additionalImages.map(img => ({ src: img.url })),
      productDes: productDescription,
      productPrice: regularPrice,
      discountedPrice: salePrice,
      SKU: sku,
      Category: selectedCategories.join(', '),
      Status: isActive ? 'Active' : 'Inactive',
      stockStatus,
    };

    try {
      let response;
      if (isUpdateMode && productId) {
        response = await axios.put(`${productUrl}/${productId}`, productData);
        setSuccessMessage('Product updated successfully');
      } else {
        response = await axios.post(productUrl, productData);
        setSuccessMessage('Product added successfully');
        setIsUpdateMode(true);
        setProductId(response.data._id); // Assuming the server returns the new product ID
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleImageSelect = (image) => {
    if (!mainImage) {
      setMainImage(image); // Set the selected image as the main image if not already set
    } else if (!additionalImages.find(img => img._id === image._id)) {
      setAdditionalImages(prev => [...prev, image]); // Add to additional images if main image is set
    }
    setShowImageModal(false); // Close the modal
  };

  const handleImageDeselect = (imageId) => {
    setAdditionalImages(prev => prev.filter(img => img._id !== imageId));
  };

  return (
    <div className="flex flex-col md:flex-row-reverse">
      {/* Sidebar with Categories */}
      <div className="md:w-1/4 p-4 border-l border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="flex flex-col space-y-2">
          {categoryList.length > 0 ? (
            categoryList.map(category => (
              <label key={category._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category._id}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes(category._id)}
                  className="form-checkbox h-5 w-5"
                />
                <span>{category.categoryName}</span>
              </label>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 p-4">
        <section>
          <div className="p-5">
            <form onSubmit={handleSubmit} className="mt-8">
              <h1 className="text-4xl">{isUpdateMode ? 'Update Product' : 'Add New Product'}</h1>

              {successMessage && (
                <div className="my-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {successMessage}
                </div>
              )}

              <label className="block my-5">
                <span className="text-gray-700">Product name</span>
                <input
                  type="text"
                  className="form-input p-2 mt-1 block w-full border-solid border-2 border-black"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </label>

              <label className="block my-5">
                <span className="text-gray-700">Product description</span>
                <textarea
                  className="form-textarea p-2 mt-1 block w-full h-75 border-solid border-2 border-black"
                  rows="5"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </label>

              <div className="flex flex-col my-5">
                <label className="mb-2">Main Image</label>
                {mainImage && (
                  <div className="relative mb-4">
                    <img src={mainImage.url} alt="Main" className="w-24 h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => setMainImage(null)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Select Image
                </button>
              </div>

              <div className="flex flex-col my-5">
                <label className="mb-2">Additional Images</label>
                <div className="grid grid-cols-3 gap-4">
                  {additionalImages.map((image) => (
                    <div key={image._id} className="relative">
                      <img
                        src={image.url}
                        alt="Additional"
                        className="w-24 h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDeselect(image._id)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Select More Images
                </button>
              </div>

              <label className="block my-5">
                <span className="text-gray-700">Regular price (₨)</span>
                <input
                  type="number"
                  className="form-input p-2 mt-1 block w-full border-solid border-2 border-black"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                />
              </label>

              <label className="block my-5">
                <span className="text-gray-700">Sale price (₨)</span>
                <input
                  type="number"
                  className="form-input p-2 mt-1 block w-full border-solid border-2 border-black"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </label>

              <label className="block my-5">
                <span className="text-gray-700">SKU</span>
                <input
                  type="text"
                  className="form-input p-2 mt-1 block w-full border-solid border-2 border-black"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </label>

              <label className="block my-5">
                <span className="text-gray-700">Stock Status</span>
                <select
                  className="form-select p-2 mt-1 block w-full border-solid border-2 border-black"
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                >
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </label>

              <label className="block my-5">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(prev => !prev)}
                />
                <span className="ml-2 text-gray-700">Active</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                {isUpdateMode ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>

          {/* Image Selector Modal */}
          {showImageModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-md">
                <h2 className="text-lg mb-4">Select an Image</h2>
                <ImageSelector onSelect={handleImageSelect} />
                <button
                  type="button"
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowImageModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AddProducts;