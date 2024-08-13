import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService';

// Thunks
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await categoryService.getCategories();
    return response.data; // Only return the data
});

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData, { rejectWithValue }) => {
      try {
        const response = await categoryService.addCategory(categoryData);
        return response;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const updateCategory = createAsyncThunk('categories/updateCategory', async (categoryData) => {
    const response = await categoryService.updateCategory(categoryData);
    return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
    await categoryService.deleteCategory(categoryId);
    return categoryId;
});

export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (categoryId) => {
    const response = await categoryService.fetchCategoryById(categoryId);
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
      categories: [],
      status: 'idle',
      error: null,
      count: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.categories = action.payload.categories;
          state.count = action.payload.count;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
          state.categories.push(action.payload);
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          const index = state.categories.findIndex(cat => cat._id === action.payload._id);
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.categories = state.categories.filter(cat => cat._id !== action.payload);
        });
    }
});

export default categorySlice.reducer;
