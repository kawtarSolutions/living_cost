import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecommendations = createAsyncThunk(
  "recommendations/fetchRecommendations",
  async (userPreferences, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPreferences),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Server error");
      }

      return data;
    } catch (err) {
      console.error("Fetch error:", err);         // ← will show the real error
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  recommendations: [], // array of up to 5 city objects from knn_rank
  loading: false,
  error: "",
};

const recommendationSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    clearRecommendations(state) {
      state.recommendations = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.recommendations = [];
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload; // array of { city, country, groceries, eating_out, transport, bills, accommodation, gym, tennis, cinema, total_expenses, savings }
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recommendations";
      });
  },
});

export const { clearRecommendations } = recommendationSlice.actions;
export default recommendationSlice.reducer;

// Selectors
export const getRecommendations = (state) => state.recommendations.recommendations;
export const getRecommendationsLoading = (state) => state.recommendations.loading;
export const getRecommendationsError = (state) => state.recommendations.error;