import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getAllPantryStaffUsers } from "../../../services/pantryStaffService";
import InputPantry from "./InputPantry";
import AssignFood from "./AssignFood";
import { getAllPatients, getPatientById } from "../../../services/patientServices";
import { Utensils, ClipboardList } from "lucide-react";
import { getUserProfile } from "../../../services/userServices";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function PantrySection() {
  const [allStaff, setAllStaff] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showPantryDetailsForm, setShowPantryDetailsForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffUsers = await getAllPantryStaffUsers();
        setAllStaff(staffUsers);
      } catch (error) {
        console.error("Failed to fetch pantry staff users:", error);
      }
    };

    const fetchPatients = async () => {
      try {
        const patientsData = await getAllPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchStaff();
    fetchPatients();
  }, []);

  const handleSave = (message, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setSuccessMessage("");
    } else {
      setSuccessMessage(message);
      setErrorMessage("");
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
        Pantry Management
      </h2>

      <AnimatePresence mode="wait">
        {successMessage && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-600 mb-4 p-2 bg-green-100 rounded-lg"
          >
            {successMessage}
          </motion.p>
        )}
        {errorMessage && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-600 mb-4 p-2 bg-red-100 rounded-lg"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPantryDetailsForm(true)}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
            showPantryDetailsForm
              ? "bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Utensils className="w-5 h-5" />
          Input Pantry Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPantryDetailsForm(false)}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
            !showPantryDetailsForm
              ? "bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          Assign Food Preparation Tasks
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showPantryDetailsForm ? (
          <motion.div
            key="inputPantry"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            <InputPantry
              allStaff={allStaff}
              onSave={handleSave}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="assignFood"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            <AssignFood
              patients={patients}
              allStaff={allStaff}
              onAssign={handleSave}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
