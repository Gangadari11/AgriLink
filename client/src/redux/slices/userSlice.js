import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

// Get all users (admin only)
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.get("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users")
  }
})

// Get user by ID
export const fetchUserById = createAsyncThunk("users/fetchById", async (userId, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch user")
  }
})

// Update user (profile)
export const updateUser = createAsyncThunk("users/update", async (userData, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    const response = await axios.put("/api/users/profile", userData, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update profile")
  }
})

// Update user role (admin only)
export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ userId, role }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth

      const response = await axios.put(
        `/api/users/${userId}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user role")
    }
  },
)

// Delete user (admin only)
export const deleteUser = createAsyncThunk("users/delete", async (userId, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth

    await axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return userId
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete user")
  }
})

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null
    },
    clearUserSuccess: (state) => {
      state.success = false
    },
    clearCurrentUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.success = true
        toast.success("Profile updated successfully!")
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
        toast.error(action.payload)
      })

      // Update user role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user))
        toast.success("User role updated!")
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter((user) => user._id !== action.payload)
        toast.success("User deleted successfully!")
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { clearUserError, clearUserSuccess, clearCurrentUser } = userSlice.actions
export default userSlice.reducer
