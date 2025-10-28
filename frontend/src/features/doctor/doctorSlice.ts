// doctorSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { docState } from "../../types/doctor/doctorType";

// ✅ Initial State
const initialState: docState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: 0,
  bio: "",
  gender: "",
  experience: "",
  dob: "",
  city: "",
  state: "",
  country: "",
  languages: [],
  role: "doctor",
  loading: false,
  error: null,
  imageUrl: "",
};

 const API = process.env.REACT_APP_API_URL;

// ✅ Fetch Logged-in Doctor Profile
export const fetchProfile = createAsyncThunk(
  "doctor/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API}/api/Doctor/profile`, {
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        return thunkAPI.rejectWithValue(
          errData.message || "Failed to fetch profile"
        );
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// ✅ Fetch Doctor by ID (for public view)
export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchDoctorById",
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`${API}/api/user/getDoctor/${id}`, {
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        return thunkAPI.rejectWithValue(
          errData.message || "Failed to fetch doctor data"
        );
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// ✅ Doctor Slice
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetDoctorState: () => initialState,
  },
  extraReducers: (builder) => {
    // Common handler for both thunks
    const handleFulfilled = (state: docState, action: any) => {
      const {
        _id,
        firstName,
        lastName,
        email,
        phoneNumber,
        bio,
        gender,
        experience,
        dob,
        city,
        state: stateValue,
        country,
        languages,
        imageUrl,
      } = action.payload;

      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.bio = bio;
      state.gender = gender;
      state.experience = experience;
      state.dob = dob;
      state.city = city;
      state.state = stateValue;
      state.country = country;
      state.languages = languages;
      state.imageUrl = imageUrl;
      state.loading = false;
      state.error = null;
    };

    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, handleFulfilled)
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchDoctorById
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, handleFulfilled)
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDoctorState } = doctorSlice.actions;
export default doctorSlice.reducer;
