import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user/profileTypes";

// Initial state
const initialState: User = {
  _id:"",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  gender: "",
  dob: "",
  role: "",
  loading: false,
  error: null,

};

//  Fetch profile from backend
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile/info/details", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch profile");
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

//  Update profile to backend
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updatedData: Partial<User>, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile/info/Edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to update profile");
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Create slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    //  fetchProfile reducers
  builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
        return { ...state, ...action.payload, loading: false, error: null };
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //  updateProfile reducers
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
        return { ...state, ...action.payload, loading: false, error: null };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
