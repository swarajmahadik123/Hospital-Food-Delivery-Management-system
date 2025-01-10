import { motion } from "framer-motion";
import { StatsCard } from "../StatCard";
import { Users, Utensils, UserPlus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllusers,
  getUserProfile,
  sendNotification,
} from "../../../services/userServices";
import {
  getAllPatients,
  getPatientById,
} from "../../../services/patientServices";
import { getAllMealTasks } from "../../../services/pantryStaffService";

export default function DashboardSection() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalMealTasks, setTotalMealTasks] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pantryAlerts, setPantryAlerts] = useState([]);
  const [deliveryAlerts, setDeliveryAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to calculate the time difference in minutes
  const getTimeDifferenceInMinutes = (timestamp) => {
    const currentTime = new Date();
    const taskTime = new Date(timestamp);
    return (currentTime - taskTime) / (1000 * 60); // Convert milliseconds to minutes
  };

  // Function to format minutes into hours and minutes
  const formatMinutesToHoursAndMinutes = (minutes) => {
    if (minutes < 60) {
      return `${Math.floor(minutes)} minutes`; // If less than 60 minutes, return as is
    }
    const hours = Math.floor(minutes / 60); // Get the number of hours
    const remainingMinutes = Math.floor(minutes % 60); // Get the remaining minutes
    return `${hours} hours ${remainingMinutes} minutes`; // Return formatted string
  };

  const handleNotify = async (alertData, type, index) => {
    try {
      // Update the specific alert's notifying state
      if (type === "pantry") {
        setPantryAlerts((prev) =>
          prev.map((alert, i) =>
            i === index ? { ...alert, notifying: true } : alert
          )
        );
      } else if (type === "delivery") {
        setDeliveryAlerts((prev) =>
          prev.map((alert, i) =>
            i === index ? { ...alert, notifying: true } : alert
          )
        );
      }

      let message = "";
      if (type === "pantry") {
        message = `Prepare the ${alertData.mealType} meal for ${alertData.patientName}.`;
      } else if (type === "delivery") {
        message = `Deliver the ${alertData.mealType} meal to ${alertData.patientName}.`;
      }

      const userId = alertData.assignedTo; // Use the assignedTo field for notifications

      // Call the sendNotification service
      await sendNotification(userId, message);

      // Show success message
      window.alert("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      window.alert("Failed to send notification.");
    } finally {
      // Reset the specific alert's notifying state
      if (type === "pantry") {
        setPantryAlerts((prev) =>
          prev.map((alert, i) =>
            i === index ? { ...alert, notifying: false } : alert
          )
        );
      } else if (type === "delivery") {
        setDeliveryAlerts((prev) =>
          prev.map((alert, i) =>
            i === index ? { ...alert, notifying: false } : alert
          )
        );
      }
    }
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total patients
        const patientsResponse = await getAllPatients();
        setTotalPatients(patientsResponse.length);

        // Fetch total employees
        const usersResponse = await getAllusers();
        const employees = usersResponse.filter(
          (user) =>
            user.role === "pantry_staff" || user.role === "delivery_personnel"
        );
        setTotalEmployees(employees.length);

        // Fetch meal tasks
        const mealTasks = await getAllMealTasks();
        setTotalMealTasks(mealTasks.length);

        // Process meal tasks for pantry and delivery alerts
        const pantryAlertsList = [];
        const deliveryAlertsList = [];

        // Fetch patient and user details in parallel
        const fetchDetails = async (task) => {
          // Fetch patient details if patientId exists
          const patient = task.patientId
            ? await getPatientById(task.patientId).catch(() => null)
            : null;

          // Fetch assigned user details if assignedTo exists
          const assignedUser = task.assignedTo
            ? await getUserProfile(task.assignedTo).catch(() => null)
            : null;

          // Fetch delivery personnel details if deliveryPersonnelId exists
          const deliveryPersonnel = task.deliveryPersonnelId
            ? await getUserProfile(task.deliveryPersonnelId).catch(() => null)
            : null;

          return {
            patientName: patient?.name || "Unknown Patient",
            assignedUserName: assignedUser?.name || "Unknown User",
            deliveryPersonnelName: deliveryPersonnel?.name || "Unknown User",
          };
        };

        for (const task of mealTasks) {
          const timeDifference = getTimeDifferenceInMinutes(task.createdAt);

          // Fetch patient and user names
          const { patientName, assignedUserName, deliveryPersonnelName } =
            await fetchDetails(task);

          // Check for pantry alerts (preparationStatus is not "prepared" for more than 30 minutes)
          if (task.preparationStatus !== "prepared" && timeDifference > 1) {
            pantryAlertsList.push({
              mealType: task.mealType,
              patientName, // Use patient name instead of ID
              assignedUserName, // Use assigned user name instead of ID
              deliveryPersonnelName, // Use delivery personnel name instead of ID
              createdAt: task.createdAt,
              assignedTo: task.assignedTo, // Include assignedTo for notifications
              notifying: false, // Add notifying state for each alert
            });
          }

          // Check for delivery alerts (deliveryStatus is "out_for_delivery" for more than 15 minutes)
          if (
            task.deliveryStatus === "out_for_delivery" &&
            timeDifference > 1
          ) {
            deliveryAlertsList.push({
              orderId: task._id, // Use the meal task ID as the order ID
              patientName, // Use patient name instead of ID
              deliveryPersonnelName, // Use delivery personnel name instead of ID
              status: task.deliveryStatus,
              createdAt: task.createdAt,
              assignedTo: task.assignedTo, // Include assignedTo for notifications
              notifying: false, // Add notifying state for each alert
            });
          }
        }

        // Update the state with the alerts
        setPantryAlerts(pantryAlertsList);
        setDeliveryAlerts(deliveryAlertsList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

      {/* Top 3 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Patients"
          value={totalPatients}
          icon={<Users className="h-6 w-6 text-[#4318FF]" />}
          delay={0.1}
        />
        <StatsCard
          title="Meal Tasks Today"
          value={totalMealTasks}
          icon={<Utensils className="h-6 w-6 text-[#4318FF]" />}
          delay={0.2}
        />
        <StatsCard
          title="Total Employees"
          value={totalEmployees}
          icon={<UserPlus className="h-6 w-6 text-[#4318FF]" />}
          delay={0.3}
        />
      </div>

      {/* Bottom 2 Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pantry Alerts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Pantry Alerts</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
            {loading ? ( // Show loading spinner while data is being fetched
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-[#4318FF] animate-spin" />
                <span className="ml-2 text-gray-600">
                  Loading pantry alerts...
                </span>
              </div>
            ) : pantryAlerts.length > 0 ? (
              pantryAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      Patient: {alert.patientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Assigned To: {alert.assignedUserName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Pending for{" "}
                      {formatMinutesToHoursAndMinutes(
                        getTimeDifferenceInMinutes(alert.createdAt)
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotify(alert, "pantry", index)}
                    disabled={alert.notifying} // Disable only the clicked button
                    className="px-4 py-2 text-sm text-white bg-gradient-to-br from-[#868CFF] to-[#4318FF] rounded-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {alert.notifying ? "Sending..." : "Notify"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No pantry alerts.</p>
            )}
          </div>
        </motion.div>

        {/* Delivery Alerts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Delivery Alerts</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
            {loading ? ( // Show loading spinner while data is being fetched
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-[#4318FF] animate-spin" />
                <span className="ml-2 text-gray-600">
                  Loading delivery alerts...
                </span>
              </div>
            ) : deliveryAlerts.length > 0 ? (
              deliveryAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      Patient: {alert.patientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Delivery Personnel: {alert.deliveryPersonnelName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {alert.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Out for delivery for{" "}
                      {formatMinutesToHoursAndMinutes(
                        getTimeDifferenceInMinutes(alert.createdAt)
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotify(alert, "delivery", index)}
                    disabled={alert.notifying} // Disable only the clicked button
                    className="px-4 py-2 text-sm text-white bg-gradient-to-br from-[#868CFF] to-[#4318FF] rounded-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {alert.notifying ? "Sending..." : "Notify"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No delivery alerts.</p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
