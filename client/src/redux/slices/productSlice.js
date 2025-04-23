import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

// Get all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async (filters = {}, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams()

    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })

    const response = await axios.get(`/api/products?${queryParams.toString()}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch products")
  }
})

// Get product by ID
export const fetchProductById = createAsyncThunk("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/products/${id}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch product")
  }
})

// Get farmer's products
export const fetchFarmerProducts = createAsyncThunk(
  "products/fetchFarmerProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.get("/api/products/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch your products")
    }
  },
)

// Add new product
export const addProduct = createAsyncThunk("products/add", async (productData, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const formData = new FormData()

    // Append text fields
    Object.keys(productData).forEach((key) => {
      if (key !== "images") {
        formData.append(key, productData[key])
      }
    })

    // Append images
    if (productData.images) {
      for (let i = 0; i < productData.images.length; i++) {
        formData.append("images", productData.images[i])
      }
    }

    const response = await axios.post("/api/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to add product")
  }
})

// Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const formData = new FormData()

      // Append text fields
      Object.keys(productData).forEach((key) => {
        if (key !== "images") {
          formData.append(key, productData[key])
        }
      })

      // Append images
      if (productData.images) {
        for (let i = 0; i < productData.images.length; i++) {
          formData.append("images", productData.images[i])
        }
      }

      const response = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update product")
    }
  },
)

// Delete product
export const deleteProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete product")
  }
})

// Get product recommendations
export const fetchRecommendations = createAsyncThunk(
  "products/fetchRecommendations",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth
      const { user } = getState().auth

      const response = await axios.get(`/api/ml/recommend?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch recommendations")
    }
  },
)

// Get demand forecast
export const fetchDemandForecast = createAsyncThunk(
  "products/fetchDemandForecast",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.get(`/api/ml/forecast?productId=${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch demand forecast")
    }
  },
)

const initialState = {
  products: [],
  product: null,
  farmerProducts: [],
  recommendations: [],
  demandForecast: null,
  loading: false,
  error: null,
  success: false,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null
    },
    clearProductSuccess: (state) => {
      state.success = false
    },
    clearCurrentProduct: (state) => {
      state.product = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Fetch farmer products
      .addCase(fetchFarmerProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFarmerProducts.fulfilled, (state, action) => {
        state.loading = false
        state.farmerProducts = action.payload
      })
      .addCase(fetchFarmerProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.farmerProducts.push(action.payload)
        state.success = true
        toast.success("Product added successfully!")
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
        toast.error(action.payload)
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.farmerProducts = state.farmerProducts.map((product) =>
          product._id === action.payload._id ? action.payload : product,
        )
        state.success = true
        toast.success("Product updated successfully!")
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
        toast.error(action.payload)
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.farmerProducts = state.farmerProducts.filter((product) => product._id !== action.payload)
        toast.success("Product deleted successfully!")
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Fetch recommendations
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false
        state.recommendations = action.payload
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch demand forecast
      .addCase(fetchDemandForecast.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDemandForecast.fulfilled, (state, action) => {
        state.loading = false
        state.demandForecast = action.payload
      })
      .addCase(fetchDemandForecast.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearProductError, clearProductSuccess, clearCurrentProduct } = productSlice.actions
export default productSlice.reducer
