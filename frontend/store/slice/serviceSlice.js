// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// /* =========================
//    API CONFIG
// ========================= */
// const API_URL = "http://localhost:5000//api/services";

// /* =========================
//    ASYNC THUNKS (CRUD)
// ========================= */

// // CREATE
// export const createService = createAsyncThunk(
//   "services/create",
//   async (serviceData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API_URL, serviceData);
//       return res.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // READ ALL
// export const fetchServices = createAsyncThunk(
//   "services/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(API_URL);
//       return res.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // READ ONE
// export const fetchServiceById = createAsyncThunk(
//   "services/fetchById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/${id}`);
//       return res.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // UPDATE
// export const updateService = createAsyncThunk(
//   "services/update",
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`${API_URL}/${id}`, updatedData);
//       return res.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // DELETE
// export const deleteService = createAsyncThunk(
//   "services/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// /* =========================
//    SLICE
// ========================= */

// const serviceSlice = createSlice({
//   name: "services",
//   initialState: {
//     services: [],
//     service: null,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     clearService(state) {
//       state.service = null;
//     },
//     clearError(state) {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder

//       /* CREATE */
//       .addCase(createService.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createService.fulfilled, (state, action) => {
//         state.loading = false;
//         state.services.unshift(action.payload);
//       })
//       .addCase(createService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* READ ALL */
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.services = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* READ ONE */
//       .addCase(fetchServiceById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchServiceById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.service = action.payload;
//       })
//       .addCase(fetchServiceById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* UPDATE */
//       .addCase(updateService.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateService.fulfilled, (state, action) => {
//         state.loading = false;
//         state.services = state.services.map((item) =>
//           item._id === action.payload._id ? action.payload : item
//         );
//         state.service = action.payload;
//       })
//       .addCase(updateService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* DELETE */
//       .addCase(deleteService.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteService.fulfilled, (state, action) => {
//         state.loading = false;
//         state.services = state.services.filter(
//           (item) => item._id !== action.payload
//         );
//       })
//       .addCase(deleteService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// /* =========================
//    EXPORTS
// ========================= */

// export const { clearService, clearError } = serviceSlice.actions;
// export default serviceSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   API CONFIG
========================= */
const API_URL = "http://localhost:5000/api/services";

/* =========================
   ASYNC THUNKS (CRUD)
========================= */

// CREATE
export const createService = createAsyncThunk(
  "services/create",
  async (serviceData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, serviceData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// READ ALL
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// READ ONE
export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// UPDATE
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// DELETE
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    service: null,
    loading: false,
    error: null
  },
  reducers: {
    clearService(state) {
      state.service = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ FIX: keep first-added service first
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* READ ALL */
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* READ ONE */
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.service = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

/* =========================
   EXPORTS
========================= */

export const { clearService, clearError } = serviceSlice.actions;
export default serviceSlice.reducer;
