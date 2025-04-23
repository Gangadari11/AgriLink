import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

// Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetchItems", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch cart")
  }
})

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.post(
        "/api/cart",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart")
    }
  },
)

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.put(
        `/api/cart/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart item")
    }
  },
)

// Remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeItem", async (productId, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    await axios.delete(`/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return productId
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to remove item from cart")
  }
})

// Clear cart
export const clearCart = createAsyncThunk("cart/clearItems", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    await axios.delete("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })

    return null
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to clear cart")
  }
})

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.totalItems = action.payload.totalItems
        state.totalAmount = action.payload.totalAmount
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.totalItems = action.payload.totalItems
        state.totalAmount = action.payload.totalAmount
        toast.success("Item added to cart!")
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.totalItems = action.payload.totalItems
        state.totalAmount = action.payload.totalAmount
        toast.success("Cart updated!")
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((item) => item.product._id !== action.payload)
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
        state.totalAmount = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
        toast.success("Item removed from cart!")
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false
        state.items = []
        state.totalItems = 0
        state.totalAmount = 0
        toast.success("Cart cleared!")
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { clearCartError } = cartSlice.actions
export default cartSlice.reducer
