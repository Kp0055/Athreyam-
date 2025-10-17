import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user/profileTypes";

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (formData: User) => {
    const response = await fetch("/api/users/profile/info/details", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return await response.json(); // returns updated profile data
  }
);
