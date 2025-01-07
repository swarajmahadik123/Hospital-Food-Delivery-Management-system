import express from 'express';
import { createPatient ,getAllPatients, getPatientById, updatePatient, deletePatient} from "../controllers/adminController.js";

const router = express.Router();

// ==================== Patient Management ====================
router.post('/patients', createPatient);
router.get('/patients', getAllPatients);
router.get('/patients/:id', getPatientById);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

export default router;