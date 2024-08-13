// src/components/admin/products/ImageSelector.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaFilesThunk } from '../../../reducers/mediaSlice';

const ITEMS_PER_PAGE = 12; // Number of images per page

const ImageSelector = ({ onSelect, onClose }) => {
  const dispatch = useDispatch();
  const { mediaFiles, status } = useSelector((state) => state.media);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchMediaFilesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setTotalPages(Math.ceil(mediaFiles.length / ITEMS_PER_PAGE));
    }
  }, [mediaFiles, status]);

  const handleImageClick = (image) => {
    onSelect(image); // Pass selected image back to parent component
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the images to be displayed on the current page
  const indexOfLastImage = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstImage = indexOfLastImage - ITEMS_PER_PAGE;
  const currentImages = mediaFiles.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className="p-4">
      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && currentImages.length === 0 && <p>No images available</p>}
        {status === 'succeeded' && currentImages.map((image) => (
          <div key={image._id} className="relative">
            <img
              src={image.url}
              alt={image.name}
              className="w-24 h-24 object-cover cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {status === 'succeeded' && totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
