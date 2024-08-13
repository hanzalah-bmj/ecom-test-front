// Newmedia.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFilesThunk, fetchMediaFilesThunk } from '../../../reducers/mediaSlice';

const UploadMedia = () => {
  const dispatch = useDispatch();
  const { mediaFiles, status, message, error } = useSelector(state => state.media);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]); // New state for tracking upload status

  useEffect(() => {
    dispatch(fetchMediaFilesThunk());
  }, [dispatch]);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setUploadStatus(selectedFiles.map(file => ({
      name: file.name,
      status: 'Pending'
    })));
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      setUploadStatus(uploadStatus.map(fileStatus => ({
        ...fileStatus,
        status: 'Uploading'
      })));

      try {
        await dispatch(uploadFilesThunk(files)); // Adjusted to handle multiple files
        setUploadStatus(uploadStatus.map(fileStatus => ({
          ...fileStatus,
          status: 'Done'
        })));
      } catch (err) {
        setUploadStatus(uploadStatus.map(fileStatus => ({
          ...fileStatus,
          status: 'Failed'
        })));
      }

      setFiles([]); // Reset file input
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFilesChange} multiple />
      <button onClick={handleUpload} disabled={status === 'loading'}>
        {status === 'loading' ? 'Uploading...' : 'Upload Files'}
      </button>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}

      {uploadStatus.length > 0 && (
        <div>
          <h3>Upload Status:</h3>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {uploadStatus.map((fileStatus, index) => (
                <tr key={index}>
                  <td>{fileStatus.name}</td>
                  <td>{fileStatus.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadMedia;
