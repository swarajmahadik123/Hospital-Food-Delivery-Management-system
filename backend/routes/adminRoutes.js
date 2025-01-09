import express from 'express';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  createFoodChart,
  getFoodChartByPatientId,
  updateFoodChart,
  deleteFoodChart,
  generateDietChart,
  getAllPantryStaff,
  createPantryStaff,
  getAllPantryStaffUsers,
  getAllFoodCharts,
  createMealTask,
  getAllTasks,
  markAsDelivered,
  getPantryStaffById,
  getAssignedMealTasks,
  markTaskStatus,
  getAllPreparedTasks,
  assignDeliveryPersonel,
} from "../controllers/adminController.js";
import { getAllDiliveryPersonnel } from '../controllers/userController.js';

const router = express.Router();

// ==================== Patient Management ====================
router.post('/patients', createPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatientById);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);


router.post("/food-charts", createFoodChart);
router.get("/food-charts/:patientId", getFoodChartByPatientId);
router.put("/food-charts/:patientId", updateFoodChart);
router.delete("/food-charts/:patientId", deleteFoodChart);
router.get("/food-charts-all",getAllFoodCharts);
router.post("/generate-diet-chart", generateDietChart);


router.get("/pantry-staff-users", getAllPantryStaffUsers);
router.post("/create-pantry-staff", createPantryStaff);
router.get("/pantry-staff/:id", getPantryStaffById);


router.post("/meal-tasks", createMealTask);
router.get("/meal-tasks-all",getAllTasks);
router.get("/assigned-meal-tasks/:id",getAssignedMealTasks);    
router.put("/meal-tasks/:id/mark-as-delivered", markAsDelivered);
router.put("/meal-tasks/:id/status",markTaskStatus);
router.get("/prepared-meal-tasks",getAllPreparedTasks);
router.put("/assign-delivery-personnel/:taskId",assignDeliveryPersonel);

router.get("/all-dilivery-personnel", getAllDiliveryPersonnel);



export default router;