Here’s a concise version of the `README.md` file with a brief description and only the necessary commands:

---

# Hospital Food Delivery Management System

A **MERN stack** application for managing hospital food delivery. It includes features like patient management, diet chart generation using the **Gemini API**, pantry operations, and meal delivery tracking.

---

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   https://github.com/swarajmahadik123/Hospital-Food-Delivery-Management-system.git
   cd Hospital-Food-Delivery-Management-system
   ```

2. **Set Up the Backend:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file with:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     GEMINI_API_KEY=your_gemini_api_key
     PORT=5000
     ```
   - Start the backend:
     ```bash
     nodemon index.js
     ```

3. **Set Up the Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Access the Application:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

---

This version is short and to the point, focusing only on the essential details and commands. Let me know if you need further adjustments! 🚀
