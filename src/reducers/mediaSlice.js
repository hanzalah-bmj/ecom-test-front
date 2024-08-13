// // mediaSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { uploadFiles, fetchMediaFiles, deleteMediaFile } from '../services/mediaService';

// export const uploadFilesThunk = createAsyncThunk(
//   'media/uploadFiles',
//   async (files, { rejectWithValue }) => {
//     try {
//       const data = await uploadFiles(files);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchMediaFilesThunk = createAsyncThunk(
//   'media/fetchMediaFiles',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await fetchMediaFiles();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteMediaFileThunk = createAsyncThunk(
//   'media/deleteMediaFile',
//   async (id, { rejectWithValue }) => {
//     try {
//       await deleteMediaFile(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// const mediaSlice = createSlice({
//   name: 'media',
//   initialState: {
//     mediaFiles: [],
//     fileUrls: [],
//     message: '',
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     resetState: (state) => {
//       state.message = '';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMediaFilesThunk.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMediaFilesThunk.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.mediaFiles = action.payload;
//       })
//       .addCase(fetchMediaFilesThunk.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(deleteMediaFileThunk.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteMediaFileThunk.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.mediaFiles = state.mediaFiles.filter(file => file._id !== action.payload);
//       })
//       .addCase(deleteMediaFileThunk.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetState } = mediaSlice.actions;
// export default mediaSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadFiles, fetchMediaFiles, deleteMediaFile } from '../services/mediaService';

// Thunks
export const uploadFilesThunk = createAsyncThunk(
  'media/uploadFiles',
  async (files, { rejectWithValue }) => {
    try {
      const data = await uploadFiles(files);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMediaFilesThunk = createAsyncThunk(
  'media/fetchMediaFiles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchMediaFiles();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMediaFileThunk = createAsyncThunk(
  'media/deleteMediaFile',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMediaFile(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  mediaFiles: [], // Store all media files
  selectedImage: null, // Store currently selected image
  status: 'idle', // Loading status
  error: null, // Error message
};

// Slice
const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    selectImage: (state, action) => {
      state.selectedImage = action.payload; // Set selected image
    },
    clearSelectedImage: (state) => {
      state.selectedImage = null; // Clear selected image
    },
    resetState: (state) => {
      state.status = 'idle'; // Reset status
      state.error = null; // Reset error
      state.message = ''; // Reset message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaFilesThunk.pending, (state) => {
        state.status = 'loading'; // Set loading status
      })
      .addCase(fetchMediaFilesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded status
        state.mediaFiles = action.payload; // Store fetched media files
      })
      .addCase(fetchMediaFilesThunk.rejected, (state, action) => {
        state.status = 'failed'; // Set failed status
        state.error = action.payload; // Store error message
      })
      .addCase(deleteMediaFileThunk.pending, (state) => {
        state.status = 'loading'; // Set loading status
      })
      .addCase(deleteMediaFileThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded status
        state.mediaFiles = state.mediaFiles.filter(file => file._id !== action.payload); // Remove deleted file
      })
      .addCase(deleteMediaFileThunk.rejected, (state, action) => {
        state.status = 'failed'; // Set failed status
        state.error = action.payload; // Store error message
      });
  },
});

export const { selectImage, clearSelectedImage, resetState } = mediaSlice.actions;
export default mediaSlice.reducer;

