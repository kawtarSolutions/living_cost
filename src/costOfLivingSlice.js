import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCityData = createAsyncThunk("costOfLiving/fetchCityData", async (city) => {
    const response = await fetch(`http://localhost:5000/city/${encodeURIComponent(city)}`);
    if (!response.ok) throw new Error("Failed to fetch city data");
    return await response.json();
});

const initialState = {
  city: "",
  country: "",

  net_salary: {
    monthly_value: "",
  },

  bills_and_fees: {
    monthly_average_cost: "",
    monthly_details: {
      monthly_electricity_heating_water_cost: "",
      monthly_mobile: "",
      monthly_internet_cost: "",
    },
  },

  transportation: {
    monthly_average_cost: "",
    monthly_details: {
      monthly_public_transport_cost: "",
      monthly_gasoline_cost: "",
      transport_type: "",
    },
  },

  groceries: {
    monthly_average_cost: "",
    monthly_details: {
      milk: "",
      rice: "",
      eggs: "",
      bread: "",
      cheese: "",
      chicken: "",
      beef: "",
      fruits_veggies: "",
    },
  },

  entertainment: {
    monthly_total_cost: "",   
    monthly_details: {
      monthly_tennis_cost: "",
      monthly_cinema_cost: "",
      monthly_gym_cost: "",
      monthly_restaurant_cost: "",
      monthly_mcdo_cost: "",
    },
  },

  accommodations: {
    monthly_total_cost: "",  
    monthly_details: {
      monthly_studio_city_center_rent: "",
      monthly_studio_outside_center_rent: "",
      monthly_family_apartment_city_center_rent: "",
      monthly_family_apartment_outside_center_rent: "",
    },
  },

  summary: {
    total_monthly_expenses: "",
    remaining_income: "",
  },
  mode: "",
  error: "",
  loading: false,
};

const costOfLivingSlice = createSlice({
  name: "costOfLiving",
  initialState,
  reducers: {
    updateByCity(state, action) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityData.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.city = ""; // ← add this
     })
      .addCase(fetchCityData.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.net_salary = action.payload.net_salary;
        state.bills_and_fees = action.payload.bills_and_fees;
        state.transportation = action.payload.transportation;
        state.groceries = action.payload.groceries;
        state.entertainment = action.payload.entertainment;
        state.accommodations = action.payload.accommodations;
        state.summary = action.payload.summary;
        state.mode = action.payload.mode;
        state.error = action.payload.error || "";
      })
      .addCase(fetchCityData.rejected, (state) => {
        state.loading = false;
        state.error = "There was a problem fetching information regarding the requested city";
      });
  },
});

export const { updateByCity } = costOfLivingSlice.actions;
export default costOfLivingSlice.reducer;

export const getCity = (state) => state.costOfLiving.city;
export const getCountry = (state) => state.costOfLiving.country;
export const getLoading = (state) => state.costOfLiving.loading;
export const getError = (state) => state.costOfLiving.error;