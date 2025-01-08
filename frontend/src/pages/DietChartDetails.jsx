import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit2,
  Cpu,
  Save,
  Coffee,
  Sunset,
  Moon,
  ArrowLeft,
  Loader, // Import Loader for the spinner
} from "lucide-react";
import {
  getFoodChartByPatientId,
  createFoodChart,
  updateFoodChart,
  generateDietChart,
} from "./../services/foodChartServices";

export default function DietChartDetails({ patient, onBack }) {
  const [isEditing, setIsEditing] = useState(true);
  const [dietChart, setDietChart] = useState({
    morningMeal: { ingredients: [], instructions: "" },
    eveningMeal: { ingredients: [], instructions: "" },
    nightMeal: { ingredients: [], instructions: "" },
  });
  const [isGenerating, setIsGenerating] = useState(false); // New state for button loading
  const [error, setError] = useState(null);
  const [isNewDietChart, setIsNewDietChart] = useState(false);

  // Fetch diet chart for the selected patient
  useEffect(() => {
    const fetchDietChart = async () => {
      try {
        const data = await getFoodChartByPatientId(patient._id);

        if (data) {
          setDietChart(data);
          setIsNewDietChart(false);
          setIsEditing(false);
        } else {
          setDietChart({
            morningMeal: { ingredients: [], instructions: "" },
            eveningMeal: { ingredients: [], instructions: "" },
            nightMeal: { ingredients: [], instructions: "" },
          });
          setIsNewDietChart(true);
          setIsEditing(true);
        }
      } catch (error) {
        setError("Failed to fetch diet chart. Please try again later.");
      }
    };

    fetchDietChart();
  }, [patient._id]);

  // Handle input changes for ingredients and instructions
  const handleChange = (mealType, field, value) => {
    setDietChart((prevChart) => ({
      ...prevChart,
      [mealType]: {
        ...prevChart[mealType],
        [field]: value,
      },
    }));
  };

  // Handle saving the diet chart
  const handleSave = async () => {
    try {
      let response;
      if (isNewDietChart) {
        response = await createFoodChart({
          ...dietChart,
          patientId: patient._id,
        });
        setIsNewDietChart(false);
      } else {
        response = await updateFoodChart(patient._id, dietChart);
      }
      setDietChart(response);
      setIsEditing(false);
    } catch (error) {
      setError("Failed to save diet chart. Please try again later.");
    }
  };

  // Handle generating a diet plan (AI or manual)
const handleGeneratePlan = async (type) => {
  if (type === "ai") {
    try {
      setIsGenerating(true); // Set button-specific loading state
      setError(null);

      // Prepare patient details
      const patientDetails = {
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        diseases: patient.diseases,
        allergies: patient.allergies,
      };

      // Call the backend to generate the diet chart
      const generatedDietChart = await generateDietChart(patientDetails);

      // Update the state with the generated diet chart
      setDietChart(generatedDietChart);
      console.log("Generated Diet Chart:", generatedDietChart);

      // Save the generated diet chart to the database
      let response;
      if (isNewDietChart) {
        response = await createFoodChart({
          ...generatedDietChart,
          patientId: patient._id,
        });
        setIsNewDietChart(false); // Diet chart is no longer new
      } else {
        response = await updateFoodChart(patient._id, generatedDietChart);
      }

      // Update the state with the saved diet chart
      setDietChart(response);
      setIsEditing(false); // Switch to view mode after saving
    } catch (error) {
      setError(
        "Failed to generate or save diet chart. Please try again later."
      );
    } finally {
      setIsGenerating(false); // Reset button-specific loading state
    }
  }
};

  // Meal types and their corresponding icons
  const mealTypes = [
    { type: "morningMeal", icon: Coffee, label: "Morning Meal" },
    { type: "eveningMeal", icon: Sunset, label: "Evening Meal" },
    { type: "nightMeal", icon: Moon, label: "Night Meal" },
  ];

  if (error) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center py-8"
      >
        {error}
      </motion.p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Back Navigation Button */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-[#4318FF]" />
        </motion.button>
        <h3 className="text-2xl font-bold text-gray-800">
          Diet Chart for {patient.name}
        </h3>
      </div>

      {/* Pencil icon to toggle edit mode */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditing(!isEditing)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Edit2 size={20} className="text-[#4318FF]" />
      </motion.button>

      {/* Generate with AI button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleGeneratePlan("ai")}
        disabled={isGenerating} // Disable the button while generating
        className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg flex items-center gap-2 shadow-md disabled:opacity-75"
      >
        {isGenerating ? (
          <Loader className="animate-spin" size={18} /> // Spinner animation
        ) : (
          <Cpu size={18} />
        )}
        {isGenerating ? "Generating..." : "Generate with AI"}
      </motion.button>

      <AnimatePresence mode="wait">
        {isEditing || isNewDietChart ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {mealTypes.map(({ type, icon: Icon, label }) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-gray-50 rounded-lg shadow-md"
              >
                <h4 className="font-medium capitalize flex items-center gap-2 text-lg text-gray-700">
                  <Icon size={20} />
                  {label}
                </h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ingredients
                    </label>
                    <input
                      type="text"
                      value={dietChart[type].ingredients.join(", ")}
                      onChange={(e) =>
                        handleChange(
                          type,
                          "ingredients",
                          e.target.value.split(", ")
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructions
                    </label>
                    <textarea
                      value={dietChart[type].instructions}
                      onChange={(e) =>
                        handleChange(type, "instructions", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent"
                      rows="3"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-4 py-2 bg-[#4318FF] text-white rounded-lg flex items-center gap-2 shadow-md"
            >
              <Save size={18} /> Save Diet Chart
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {mealTypes.map(({ type, icon: Icon, label }) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-gray-50 rounded-lg shadow-md"
              >
                <h4 className="font-medium capitalize flex items-center gap-2 text-lg text-gray-700 mb-3">
                  <Icon size={20} />
                  {label}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Ingredients:</strong>{" "}
                  {dietChart[type].ingredients.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Instructions:</strong> {dietChart[type].instructions}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
