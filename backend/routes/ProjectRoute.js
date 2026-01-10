const express = require('express');
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getActiveProjects
} = require('../controllers/projectController');
// const { authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/portfolio/active', getActiveProjects);
router.get('/:id', getProject);

// Protected routes (Admin only) — middleware removed
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;