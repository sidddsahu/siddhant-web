// // src/redux/slices/projectSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000//api/projects';

// /* ============================
//    ASYNC THUNKS
// ============================ */

// // Get all projects (with query support)
// export const fetchProjects = createAsyncThunk(
//   'projects/fetchAll',
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(API_URL, { params });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Get single project
// export const fetchProjectById = createAsyncThunk(
//   'projects/fetchById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/${id}`);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Create project (ADMIN)
// export const createProject = createAsyncThunk(
//   'projects/create',
//   async (projectData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API_URL, projectData);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Update project (ADMIN)
// export const updateProject = createAsyncThunk(
//   'projects/update',
//   async ({ id, projectData }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`${API_URL}/${id}`, projectData);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Delete project (ADMIN)
// export const deleteProject = createAsyncThunk(
//   'projects/delete',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Get active projects (Portfolio)
// export const fetchActiveProjects = createAsyncThunk(
//   'projects/fetchActive',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_URL}/portfolio/active`);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// /* ============================
//    SLICE
// ============================ */

// const projectSlice = createSlice({
//   name: 'projects',
//   initialState: {
//     projects: [],
//     activeProjects: [],
//     project: null,

//     pagination: {
//       page: 1,
//       pages: 1,
//       total: 0
//     },

//     loading: false,
//     error: null,
//     success: false
//   },

//   reducers: {
//     clearProjectState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     }
//   },

//   extraReducers: (builder) => {
//     builder

//       /* ---------- FETCH ALL ---------- */
//       .addCase(fetchProjects.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProjects.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projects = action.payload.data;
//         state.pagination = {
//           page: action.payload.page,
//           pages: action.payload.pages,
//           total: action.payload.total
//         };
//       })
//       .addCase(fetchProjects.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- FETCH ONE ---------- */
//       .addCase(fetchProjectById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProjectById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.project = action.payload;
//       })
//       .addCase(fetchProjectById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- CREATE ---------- */
//       .addCase(createProject.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createProject.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.projects.unshift(action.payload);
//       })
//       .addCase(createProject.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- UPDATE ---------- */
//       .addCase(updateProject.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateProject.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.projects = state.projects.map((proj) =>
//           proj._id === action.payload._id ? action.payload : proj
//         );
//       })
//       .addCase(updateProject.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- DELETE ---------- */
//       .addCase(deleteProject.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteProject.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projects = state.projects.filter(
//           (proj) => proj._id !== action.payload
//         );
//       })
//       .addCase(deleteProject.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- ACTIVE PROJECTS ---------- */
//       .addCase(fetchActiveProjects.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchActiveProjects.fulfilled, (state, action) => {
//         state.loading = false;
//         state.activeProjects = action.payload;
//       })
//       .addCase(fetchActiveProjects.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearProjectState } = projectSlice.actions;
// export default projectSlice.reducer;


// src/redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

/* ============================
   ASYNC THUNKS
============================ */

// Get all projects (with query support) - FOR ADMIN
export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, search = '', status = '' } = params;
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(status && { status })
      }).toString();

      const res = await axios.get(`${API_URL}?${queryParams}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get single project - FOR DETAIL PAGE
export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create project (ADMIN)
export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, { rejectWithValue }) => {
    try {
      // Format arrays from comma-separated strings
      const formattedData = {
        ...projectData,
        tags: Array.isArray(projectData.tags) ? projectData.tags :
             (typeof projectData.tags === 'string' ? projectData.tags.split(',').map(t => t.trim()).filter(t => t) : []),
        features: Array.isArray(projectData.features) ? projectData.features :
                 (typeof projectData.features === 'string' ? projectData.features.split(',').map(f => f.trim()).filter(f => f) : []),
        challenges: Array.isArray(projectData.challenges) ? projectData.challenges :
                   (typeof projectData.challenges === 'string' ? projectData.challenges.split(',').map(c => c.trim()).filter(c => c) : []),
        images: Array.isArray(projectData.images) ? projectData.images :
               (typeof projectData.images === 'string' ? projectData.images.split(',').map(i => i.trim()).filter(i => i) : []),
      };

      const res = await axios.post(API_URL, formattedData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update project (ADMIN)
export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      // Format arrays from comma-separated strings
      const formattedData = {
        ...projectData,
        tags: Array.isArray(projectData.tags) ? projectData.tags :
             (typeof projectData.tags === 'string' ? projectData.tags.split(',').map(t => t.trim()).filter(t => t) : []),
        features: Array.isArray(projectData.features) ? projectData.features :
                 (typeof projectData.features === 'string' ? projectData.features.split(',').map(f => f.trim()).filter(f => f) : []),
        challenges: Array.isArray(projectData.challenges) ? projectData.challenges :
                   (typeof projectData.challenges === 'string' ? projectData.challenges.split(',').map(c => c.trim()).filter(c => c) : []),
        images: Array.isArray(projectData.images) ? projectData.images :
               (typeof projectData.images === 'string' ? projectData.images.split(',').map(i => i.trim()).filter(i => i) : []),
      };

      const res = await axios.put(`${API_URL}/${id}`, formattedData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete project (ADMIN)
export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get active projects (Portfolio) - FOR FRONTEND PORTFOLIO SECTION
export const fetchActiveProjects = createAsyncThunk(
  'projects/fetchActive',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { limit = 20 } = params;
      const res = await axios.get(`${API_URL}/portfolio/active`, {
        params: { limit }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================
   SLICE
============================ */

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    // All projects for admin panel
    projects: [],

    // Active projects for portfolio section
    activeProjects: [],

    // Current project for detail page
    currentProject: null,

    // Pagination info
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
      limit: 10
    },

    // UI states
    loading: false,
    error: null,
    success: false,
    operation: null, // 'create', 'update', 'delete', 'fetch'

    // Filters
    filters: {
      search: '',
      status: 'all'
    }
  },

  reducers: {
    // Clear project state
    clearProjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.operation = null;
      state.currentProject = null;
    },

    // Clear current project (for detail page cleanup)
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },

    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset success
    resetSuccess: (state) => {
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ALL (ADMIN) ---------- */
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'fetch';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data || [];
        state.pagination = {
          page: action.payload.page || 1,
          pages: action.payload.pages || 1,
          total: action.payload.total || 0,
          limit: action.payload.limit || 10
        };
        state.operation = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch projects';
        state.operation = null;
        state.projects = [];
      })

      /* ---------- FETCH BY ID (DETAIL PAGE) ---------- */
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'fetch';
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        state.operation = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch project';
        state.currentProject = null;
        state.operation = null;
      })

      /* ---------- CREATE (ADMIN) ---------- */
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'create';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects.unshift(action.payload); // Add to beginning
        state.pagination.total += 1; // Update total count
        state.operation = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create project';
        state.success = false;
        state.operation = null;
      })

      /* ---------- UPDATE (ADMIN) ---------- */
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.operation = 'update';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Update in projects array
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }

        // Update current project if it's the same
        if (state.currentProject && state.currentProject._id === action.payload._id) {
          state.currentProject = action.payload;
        }

        // Update in active projects if present
        const activeIndex = state.activeProjects.findIndex(p => p._id === action.payload._id);
        if (activeIndex !== -1 && action.payload.status === 'active') {
          state.activeProjects[activeIndex] = action.payload;
        } else if (activeIndex !== -1 && action.payload.status !== 'active') {
          // Remove from active projects if status changed
          state.activeProjects = state.activeProjects.filter(p => p._id !== action.payload._id);
        }

        state.operation = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update project';
        state.success = false;
        state.operation = null;
      })

      /* ---------- DELETE (ADMIN) ---------- */
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'delete';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;

        // Remove from projects array
        state.projects = state.projects.filter(proj => proj._id !== action.payload);

        // Remove from active projects
        state.activeProjects = state.activeProjects.filter(proj => proj._id !== action.payload);

        // Clear current project if it's the deleted one
        if (state.currentProject && state.currentProject._id === action.payload) {
          state.currentProject = null;
        }

        // Update pagination total
        state.pagination.total = Math.max(0, state.pagination.total - 1);

        state.operation = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete project';
        state.operation = null;
      })

      /* ---------- FETCH ACTIVE (PORTFOLIO) ---------- */
      .addCase(fetchActiveProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.operation = 'fetch_active';
      })
      .addCase(fetchActiveProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.activeProjects = action.payload || [];
        state.operation = null;
      })
      .addCase(fetchActiveProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch active projects';
        state.activeProjects = [];
        state.operation = null;
      });
  }
});

export const {
  clearProjectState,
  clearCurrentProject,
  setFilters,
  clearError,
  resetSuccess
} = projectSlice.actions;

export default projectSlice.reducer;