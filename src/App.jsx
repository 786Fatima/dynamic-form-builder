import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Admin Pages
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Feedbacks from "./pages/Feedbacks";
import UserDetail from "./pages/UserDetail";

// User Pages

// Admin Components
import Breadcrumbs from "./components/Breadcrumbs";
import Sidebar from "./components/Sidebar";

// User Components

import LoadingSpinner from "./components/LoadingSpinner";
import DynamicFormNewEditPage from "./pages/Compose";
import Forms from "./pages/Forms";
import useStore from "./store";
import { PARAM_LIST, ROUTE_LIST } from "./utils/routes";

export default function App() {
  const { isAuthenticated, isLoading, fetchData } = useStore();

  const { DASHBOARD, FORM_LIST, CREATE_FORM, PREVIEW_FORM, LOGIN } = ROUTE_LIST;

  useEffect(() => {
    // Fetch initial data
    const loadData = async () => {
      await Promise.all([
        fetchData("users"),
        fetchData("posts"),
        fetchData("tags"),
        fetchData("interactions"),
        fetchData("comments"),
      ]);
    };
    loadData();
  }, [fetchData]);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <Breadcrumbs />
              <Routes>
                {/* <Route
                path="/login"
                element={<Navigate to="/admin/dashboard" />}
              />
              <Route
                path="/register"
                element={<Navigate to="/admin/dashboard" />}
              /> */}

                <Route path={DASHBOARD} element={<Dashboard />} />
                <Route
                  path={CREATE_FORM}
                  element={<DynamicFormNewEditPage />}
                />
                <Route path={FORM_LIST} element={<Forms />} />
                <Route
                  path={`${PREVIEW_FORM}/${PARAM_LIST.formId}`}
                  element={<UserDetail />}
                />
                <Route path="/admin/feedbacks" element={<Feedbacks />} />
              </Routes>
            </div>
          </div>
        </main>
        <LoadingSpinner isLoading={isLoading} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}
