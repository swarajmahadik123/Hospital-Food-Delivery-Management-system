import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, ChevronRight } from "lucide-react";
import PatientDetails from "../../../pages/PatientDetails"
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../../../services/patientServices";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function PatientsSection() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handlePatientClick = async (patient) => {
    try {
      const patientData = await getPatientById(patient._id);
      setSelectedPatient(patientData);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleAddPatient = () => {
    setIsAddingPatient(true);
    setSelectedPatient({
      name: "",
      diseases: [],
      allergies: [],
      roomNumber: "",
      bedNumber: "",
      floorNumber: "",
      age: 0,
      gender: "",
      contactInfo: "",
      emergencyContact: "",
      additionalDetails: "",
    });
  };

  const handleSavePatient = async (updatedPatient) => {
    try {
      if (updatedPatient._id) {
        await updatePatient(updatedPatient._id, updatedPatient);
      } else {
        await createPatient(updatedPatient);
      }
      fetchPatients();
      setSelectedPatient(null);
      setIsAddingPatient(false);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(patientId);
      fetchPatients();
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Patient Management
      </h2>

      <AnimatePresence mode="wait">
        {selectedPatient || isAddingPatient ? (
          <motion.div key="details" {...fadeInUp}>
            <PatientDetails
              patient={selectedPatient}
              onSave={handleSavePatient}
              onDelete={handleDeletePatient}
              onCancel={() => {
                setSelectedPatient(null);
                setIsAddingPatient(false);
              }}
            />
          </motion.div>
        ) : (
          <motion.div key="list" {...fadeInUp} className="space-y-4">
            <button
              onClick={handleAddPatient}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="h-5 w-5" />
              <span>Add Patient</span>
            </button>

            <div className="space-y-3">
              {patients.map((patient) => (
                <motion.div
                  key={patient._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handlePatientClick(patient)}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-500">
                      Room {patient.roomNumber}, Bed {patient.bedNumber}
                    </p>
                  </div>
                  <ChevronRight className="text-[#4318FF] h-5 w-5" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
