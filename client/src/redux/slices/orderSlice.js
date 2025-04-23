import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { clearCart } from "./cartSlice"

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth

      const response = await axios.post("/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Clear the cart after successful order
      dispatch(clearCart())

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create order")
    }
  },
)

// Get all orders for the current user (buyer or farmer)
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.get("/api/orders/user", {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch orders")
  }
})

// Get order by ID
export const fetchOrderById = createAsyncThunk("orders/fetchById", async (orderId, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch order")
  }
})

// Update order status (for farmers and admins)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.put(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order status")
    }
  },
)

// Get all orders (admin only)
export const fetchAllOrders = createAsyncThunk("orders/fetchAll", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch all orders")
  }
})

// Process payment
export const processPayment = createAsyncThunk(
  "orders/processPayment",
  async ({ orderId, paymentData }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.post(`/api/payments/${orderId}`, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Payment processing failed")
    }
  },
)

const initialState = {
  orders: [],
  order: null,
  allOrders: [],
  loading: false,
  error: null,
  success: false,
  paymentUrl: null,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null
    },
    clearOrderSuccess: (state) => {
      state.success = false
    },
    clearCurrentOrder: (state) => {
      state.order = null
    },
    clearPaymentUrl: (state) => {
      state.paymentUrl = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
        state.order = action.payload
        state.success = true
        toast.success("Order created successfully!")
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
        toast.error(action.payload)
      })

      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false

        // Update in orders array
        state.orders = state.orders.map((order) => (order._id === action.payload._id ? action.payload : order))

        // Update current order if it's the one being updated
        if (state.order && state.order._id === action.payload._id) {
          state.order = action.payload
        }

        // Update in allOrders array (for admin)
        state.allOrders = state.allOrders.map((order) => (order._id === action.payload._id ? action.payload : order))

        toast.success("Order status updated!")
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Fetch all orders (admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.allOrders = action.payload
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Process payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false
        state.paymentUrl = action.payload.paymentUrl
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { clearOrderError, clearOrderSuccess, clearCurrentOrder, clearPaymentUrl } = orderSlice.actions
export default orderSlice.reducer
