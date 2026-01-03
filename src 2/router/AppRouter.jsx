import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initializeFormStore } from "../services/formStorageService";
import MyForms from "../pages/MyForms";
import CreateForm from "../pages/CreateForm";
import PreviewForm from "../pages/PreviewForm";

const AppRouter = () => {
  useEffect(() => {
    // Initialize store with persisted data
    initializeFormStore();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/myforms" element={<MyForms />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview/:id" element={<PreviewForm />} />
        <Route path="/" element={<Navigate to="/myforms" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
