import { motion } from "framer-motion";
import { useState } from "react";
import { X, Plus, ArrowLeft } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function PatientDetails({
  patient,
  onSave,
  onDelete,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    ...patient,
    diseases: patient.diseases || [],
    allergies: patient.allergies || [],
  });

  const [diseaseInput, setDiseaseInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");

const predefinedDiseases = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Arthritis",
  "Cancer",
  "Alzheimer's Disease",
  "Parkinson's Disease",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Heart Disease",
  "Stroke",
  "HIV/AIDS",
  "Tuberculosis",
  "Malaria",
  "Hepatitis B",
  "Hepatitis C",
  "Dengue",
  "Chikungunya",
  "Zika Virus",
  "Influenza",
  "Pneumonia",
  "Bronchitis",
  "Gastroenteritis",
  "Irritable Bowel Syndrome (IBS)",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Celiac Disease",
  "Lupus",
  "Multiple Sclerosis",
  "Epilepsy",
  "Migraine",
  "Osteoporosis",
  "Osteoarthritis",
  "Rheumatoid Arthritis",
  "Gout",
  "Psoriasis",
  "Eczema",
  "Acne",
  "Rosacea",
  "Anemia",
  "Leukemia",
  "Lymphoma",
  "Melanoma",
  "Thyroid Disorders",
  "Hypothyroidism",
  "Hyperthyroidism",
  "Addison's Disease",
  "Cushing's Syndrome",
  "Polycystic Ovary Syndrome (PCOS)",
  "Endometriosis",
  "Fibromyalgia",
  "Chronic Fatigue Syndrome",
  "Autism Spectrum Disorder",
  "Attention Deficit Hyperactivity Disorder (ADHD)",
  "Bipolar Disorder",
  "Depression",
  "Anxiety Disorders",
  "Schizophrenia",
  "Obsessive-Compulsive Disorder (OCD)",
  "Post-Traumatic Stress Disorder (PTSD)",
  "Eating Disorders",
  "Substance Abuse Disorders",
];

const predefinedAllergies = [
  "Peanuts",
  "Tree Nuts",
  "Shellfish",
  "Fish",
  "Eggs",
  "Milk",
  "Soy",
  "Wheat",
  "Gluten",
  "Sesame",
  "Mustard",
  "Sulfites",
  "Pollen",
  "Dust Mites",
  "Mold",
  "Pet Dander",
  "Latex",
  "Insect Stings",
  "Penicillin",
  "Aspirin",
  "Ibuprofen",
  "Sulfa Drugs",
  "Chemotherapy Drugs",
  "Radiocontrast Dye",
  "Nickel",
  "Fragrances",
  "Preservatives",
  "Food Additives",
  "Sunlight",
  "Cold",
  "Heat",
  "Water",
  "Exercise",
  "Pollen-Food Allergy Syndrome (Oral Allergy Syndrome)",
  "Celery",
  "Carrots",
  "Apples",
  "Peaches",
  "Kiwi",
  "Bananas",
  "Avocado",
  "Tomatoes",
  "Potatoes",
  "Garlic",
  "Onions",
  "Chocolate",
  "Coffee",
  "Alcohol",
  "Spices",
  "Seeds",
  "Legumes",
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDisease = (disease) => {
    if (disease && !formData.diseases.includes(disease)) {
      setFormData((prevData) => ({
        ...prevData,
        diseases: [...prevData.diseases, disease],
      }));
    }
    setDiseaseInput("");
  };

  const handleAddAllergy = (allergy) => {
    if (allergy && !formData.allergies.includes(allergy)) {
      setFormData((prevData) => ({
        ...prevData,
        allergies: [...prevData.allergies, allergy],
      }));
    }
    setAllergyInput("");
  };

  const handleRemoveDisease = (disease) => {
    setFormData((prevData) => ({
      ...prevData,
      diseases: prevData.diseases.filter((d) => d !== disease),
    }));
  };

  const handleRemoveAllergy = (allergy) => {
    setFormData((prevData) => ({
      ...prevData,
      allergies: prevData.allergies.filter((a) => a !== allergy),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">
          {patient._id ? "Edit Patient" : "Add Patient"}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diseases
            </label>
            <div className="relative">
              <input
                type="text"
                value={diseaseInput}
                onChange={(e) => setDiseaseInput(e.target.value)}
                placeholder="Type or select a disease"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              />
              {diseaseInput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                  {predefinedDiseases
                    .filter((disease) =>
                      disease.toLowerCase().includes(diseaseInput.toLowerCase())
                    )
                    .map((disease) => (
                      <div
                        key={disease}
                        onClick={() => handleAddDisease(disease)}
                        className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        {disease}
                      </div>
                    ))}
                </motion.div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.diseases.map((disease) => (
                <motion.div
                  key={disease}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 bg-[#4318FF] text-white px-3 py-1 rounded-full"
                >
                  <span>{disease}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDisease(disease)}
                    className="text-white hover:text-red-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allergies
            </label>
            <div className="relative">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="Type or select an allergy"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              />
              {allergyInput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                  {predefinedAllergies
                    .filter((allergy) =>
                      allergy.toLowerCase().includes(allergyInput.toLowerCase())
                    )
                    .map((allergy) => (
                      <div
                        key={allergy}
                        onClick={() => handleAddAllergy(allergy)}
                        className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        {allergy}
                      </div>
                    ))}
                </motion.div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.allergies.map((allergy) => (
                <motion.div
                  key={allergy}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 bg-[#868CFF] text-white px-3 py-1 rounded-full"
                >
                  <span>{allergy}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(allergy)}
                    className="text-white hover:text-red-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bed Number
            </label>
            <input
              type="text"
              name="bedNumber"
              value={formData.bedNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Floor Number
            </label>
            <input
              type="text"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Info
            </label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </motion.button>
          {patient._id && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(patient._id)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </motion.button>
          )}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
