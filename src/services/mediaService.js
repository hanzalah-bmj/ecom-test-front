//meidaService.js
import axios from 'axios';

// Define the API endpoint
const API_URL = 'http://localhost:5000/media';

// Upload files function
export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Function to fetch media files (if needed)
export const fetchMediaFiles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching media files');
  }
};

// Delete media file function
export const deleteMediaFile = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/media/${id}`);
  } catch (error) {
    throw new Error('Error deleting media file');
  }
};
