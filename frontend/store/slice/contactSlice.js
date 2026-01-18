// // store/slices/contactSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000//api/contact';

// // Async thunk for submitting contact form
// export const submitContact = createAsyncThunk(
//   'contact/submit',
//   async (contactData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/submit`, contactData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || {
//         message: 'Failed to send message'
//       });
//     }
//   }
// );

// const contactSlice = createSlice({
//   name: 'contact',
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//     message: '',
//     submittedData: null
//   },
//   reducers: {
//     resetContactState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.message = '';
//       state.submittedData = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//       state.message = '';
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitContact.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//         state.message = '';
//       })
//       .addCase(submitContact.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.error = null;
//         state.message = action.payload.message || 'Message sent successfully!';
//         state.submittedData = action.payload.data;
//       })
//       .addCase(submitContact.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload?.message || 'Failed to send message';

//         // Handle validation errors
//         if (action.payload?.errors) {
//           const errors = action.payload.errors;
//           if (Array.isArray(errors)) {
//             state.error = errors.map(err => {
//               const field = Object.keys(err)[0];
//               return `${field}: ${err[field]}`;
//             }).join(', ');
//           } else if (typeof errors === 'string') {
//             state.error = errors;
//           }
//         }
//       });
//   }
// });

// export const { resetContactState, clearError } = contactSlice.actions;
// export default contactSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contact";

/* ===================== SUBMIT CONTACT ===================== */
export const submitContact = createAsyncThunk(
  "contact/submit",
  async (contactData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/submit`, contactData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to send message" }
      );
    }
  }
);

/* ===================== ADMIN: GET ALL CONTACTS ===================== */
export const fetchContacts = createAsyncThunk(
  "contact/fetchAll",
  async ({ page = 1, limit = 10, search = "", status = "" }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/admin`, {
        params: { page, limit, search, status }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch contacts" }
      );
    }
  }
);

/* ===================== ADMIN: MARK AS READ ===================== */
export const markContactAsRead = createAsyncThunk(
  "contact/markAsRead",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/admin/${id}/read`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update contact" }
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    // submit
    loading: false,
    success: false,
    message: "",
    error: null,
    submittedData: null,

    // admin
    contacts: [],
    pagination: null,
    adminLoading: false,
    adminError: null
  },

reducers: {
  resetContactState: (state) => {
    state.loading = false;
    state.success = false;
    state.message = "";
    state.error = null;
    state.submittedData = null;
  },
  clearError: (state) => {
    state.error = null;
  },
  clearAdminError: (state) => {
    state.adminError = null;
  }
},


  extraReducers: (builder) => {
    builder

      /* ========== SUBMIT CONTACT ========== */
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.submittedData = action.payload.data;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to send message";
      })

      /* ========== ADMIN FETCH CONTACTS ========== */
      .addCase(fetchContacts.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.contacts = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload?.message || "Failed to load contacts";
      })

      /* ========== MARK AS READ ========== */
      .addCase(markContactAsRead.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.contacts = state.contacts.map((item) =>
          item._id === updated._id ? updated : item
        );
      });
  }
});

export const {
  resetContactState,
  clearError,
  clearAdminError
} = contactSlice.actions;

export default contactSlice.reducer;
