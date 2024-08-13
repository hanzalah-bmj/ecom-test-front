import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import categoryReducer from './reducers/categorySlice';
import mediaReducer from './reducers/mediaSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    category: categoryReducer,
    media: mediaReducer,

  },
});
