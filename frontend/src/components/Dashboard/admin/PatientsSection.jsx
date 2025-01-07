import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import PatientDetails from "../../../pages/PatientDetails.jsx";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../../../services/patientServices.js"; // Import API functions

export default function PatientsSection() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

  // Fetch all patients on component mount
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

  // Handle clicking on a patient
  const handlePatientClick = async (patient) => {
    try {
      const patientData = await getPatientById(patient._id);
      setSelectedPatient(patientData);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  // Handle adding a new patient
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

  // Handle saving a patient (create or update)
  const handleSavePatient = async (updatedPatient) => {
    try {
      if (updatedPatient._id) {
        // Update existing patient
        await updatePatient(updatedPatient._id, updatedPatient);
      } else {
        // Add new patient
        await createPatient(updatedPatient);
      }
      fetchPatients(); // Refresh the patient list
      setSelectedPatient(null);
      setIsAddingPatient(false);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  // Handle deleting a patient
  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(patientId);
      fetchPatients(); // Refresh the patient list
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Patient Details</h2>

      {selectedPatient || isAddingPatient ? (
        // Show patient details for CRUD operations
        <PatientDetails
          patient={selectedPatient}
          onSave={handleSavePatient}
          onDelete={handleDeletePatient}
          onCancel={() => {
            setSelectedPatient(null);
            setIsAddingPatient(false);
          }}
        />
      ) : (
        // Show the list of patients
        <div className="space-y-4">
          <button
            onClick={handleAddPatient}
            className="flex items-center gap-2 px-4 py-2 bg-[#4318FF] text-white rounded-lg hover:bg-[#868CFF] transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Patient</span>
          </button>

          <div className="space-y-2">
            {patients.map((patient) => (
              <div
                key={patient._id}
                onClick={() => handlePatientClick(patient)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">
                    Room {patient.roomNumber}, Bed {patient.bedNumber}
                  </p>
                </div>
                <span className="text-[#4318FF]">View Details</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
