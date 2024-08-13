import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaFilesThunk, deleteMediaFileThunk } from '../../../reducers/mediaSlice';
import { useNavigate } from 'react-router-dom';

const MediaLibrary = () => {
  const dispatch = useDispatch();
  const { mediaFiles, status, error } = useSelector(state => state.media);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMediaFilesThunk());
  }, [dispatch]);

  const handleView = (url) => {
    setSelectedImage(url);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteMediaFileThunk(id));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedImage(null);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const handleAddNewMedia = () => {
    navigate('/admin/uploads/newmedia/');
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleAddNewMedia}
        >
          Add new media
        </button>
      </div>
      <div>
        <h1>Media Library</h1>
        <div className="media-grid">
          {mediaFiles.length === 0 ? (
            <div>No media files available.</div>
          ) : (
            mediaFiles.map(file => (
              <div key={file._id} className="media-item">
                <img
                  src={file.url}
                  alt={file.originalname}
                  style={{ width: '150px', height: '150px', border: '1px solid blue' }}
                  onClick={() => handleView(file.url)}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if image fails to load
                    e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                  }}
                />
                <div className="media-actions">
                  <button onClick={() => handleView(file.url)}>View</button>
                  <button onClick={() => handleDelete(file._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>&times;</span>
              <img src={selectedImage} alt="Selected" style={{ width: '500px' }} />
            </div>
          </div>
        )}

<style>{`
  .media-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .media-item {
    position: relative;
    cursor: pointer;
  }
  .media-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-content {
    position: relative;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 100%;
    max-height: 100%;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
`}</style>
      </div>
    </>
  );
};

export default MediaLibrary;
