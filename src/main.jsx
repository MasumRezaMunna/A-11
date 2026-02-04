import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import "./index.css";
import Login from "./pages/Login";
import CreateTuition from "./pages/CreateTuition";
import TutorDashboard from "./pages/TutorDashboard";
import Layout from "./components/Layout";
import TutorDetails from "./pages/TutorDetails";
import TutorsPage from "./pages/TutorPage";
import PostTuition from "./pages/PostTuition";
import TuitionsPage from "./pages/TuitionsPage";
import TuitionDetails from "./pages/TuitionDetails";
import StudentDashboard from "./pages/StudentDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminTuitionManagement from "./pages/AdminTuitionManagement";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/create-tuition" element={<CreateTuition />} />
          <Route path="/dashboard" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/tutor/:id" element={<TutorDetails />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/post-tuition" element={<PostTuition />} />
          <Route path="/tuitions" element={<TuitionsPage />} />
          <Route path="/tuitions/:id" element={<TuitionDetails />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route
            path="/admin/tuitions"
            element={
              <AdminRoute>
                <AdminTuitionManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);
