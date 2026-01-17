import { createSlice } from '@reduxjs/toolkit';

const favoriteSlicer = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite(state, action) {
      const safe_Items = Array.isArray(state.items) ? state.items : [];
      const existingItem = safe_Items.find(
        item => item.idMeal === action.payload.idMeal,
      );

      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...(state.items || []), action.payload],
      };
    },
    removeFavorite(state, action) {
      const safeItems = Array.isArray(state.items) ? state.items : [];

      return {
        ...state,
        items: safeItems.filter(item => item.idMeal !== action.payload.idMeal),
      };
    },
  },
});

export default favoriteSlicer.reducer;
export const { addFavorite, removeFavorite } = favoriteSlicer.actions;
