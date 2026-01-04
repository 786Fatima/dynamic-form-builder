import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Breadcrumbs from "./components/basics/Breadcrumbs";
import Sidebar from "./components/Sidebar";

import LoadingSpinner from "./components/LoadingSpinner";
import CommonFormPreviewNewEditPage from "./pages/CommonFormPreviewNewEditPage";
import DynamicFormNewEditPage from "./pages/DynamicFormNewEditPage";
import Forms from "./pages/Forms";
import useStore from "./services/store";
import { PARAM_LIST, ROUTE_LIST } from "./utils/routes";

export default function App() {
  const { isLoading } = useStore();

  const { DASHBOARD, FORM_LIST, CREATE_FORM, EDIT_FORM, PREVIEW_FORM, HOME } =
    ROUTE_LIST;

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-3 md:p-6">
              <Breadcrumbs />
              <Routes>
                <Route path={HOME} element={<Navigate to={DASHBOARD} />} />

                <Route path={DASHBOARD} element={<Dashboard />} />
                <Route
                  path={CREATE_FORM}
                  element={<DynamicFormNewEditPage />}
                />
                <Route
                  path={`${EDIT_FORM}/${PARAM_LIST.formId}`}
                  element={<DynamicFormNewEditPage />}
                />
                <Route path={FORM_LIST} element={<Forms />} />
                <Route
                  path={`${PREVIEW_FORM}/${PARAM_LIST.formId}`}
                  element={<CommonFormPreviewNewEditPage />}
                />
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
