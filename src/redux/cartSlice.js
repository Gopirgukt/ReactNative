// cartSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchAll = createAsyncThunk('cart/fetchAll', async () => {
  const response2 = await fetch('https://dummyjson.com/products');
  const data2 = await response2.json();
  return data2;
});

const initialState = {
  products: [],
  products2: [],
  items: [],
  cartCount: 0,
  loading: false, // Add loading state
  error: null, // Add error state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    additem_into_cart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // If the item is not in the cart, add it with quantity 1
        state.items.push({...newItem, quantity: 1});
      }
      state.cartCount += 1;
    },
    remove_item_cart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.cartCount = state.items.length;
    },
    increment_item_quantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      }

      state.cartCount += 1;
    },
    decrement_item_quantity: (state, action) => {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === itemId,
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.cartCount -= 1;
        } else {
          // Remove the item if its quantity is 1
          state.items.splice(existingItemIndex, 1);
          state.cartCount -= 1;
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null; // Reset error when starting to fetch
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Update error state
      })
      .addCase(fetchAll.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.products2 = action.payload;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  additem_into_cart,
  remove_item_cart,
  increment_item_quantity,
  decrement_item_quantity,
} = cartSlice.actions;
export default cartSlice.reducer;
