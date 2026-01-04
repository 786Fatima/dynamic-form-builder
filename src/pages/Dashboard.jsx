import React from "react";
import { useNavigate } from "react-router-dom";
import useFormStore from "../services/formStorageService";
import AppButton from "../components/basics/AppButton";
import { ROUTE_LIST } from "../utils/routes";

export default function Dashboard() {
  const navigate = useNavigate();
  const forms = useFormStore((s) => s.forms) || [];

  const totalForms = forms.length;
  const totalFields = forms.reduce(
    (acc, f) => acc + (f.fields?.length || 0),
    0
  );
  const publishedCount = forms.filter((f) => f.isPublished).length;
  const recentForms = [...forms]
    .sort((a, b) => {
      const ta = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const tb = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return tb - ta;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Forms Dashboard</h1>
        <p className="text-gray-600">
          Summary and quick access for your dynamic forms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Forms</p>
          <p className="text-2xl font-semibold text-gray-900">{totalForms}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Fields</p>
          <p className="text-2xl font-semibold text-gray-900">{totalFields}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-medium text-gray-600">Published</p>
          <p className="text-2xl font-semibold text-gray-900">
            {publishedCount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flow-root space-y-3 md:flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Forms</h3>
          <div className="flow-root md:flex items-center gap-3">
            <AppButton onClick={() => navigate(ROUTE_LIST.FORM_LIST)}>
              Go to Forms
            </AppButton>
            <AppButton
              variant="secondary"
              onClick={() => navigate(ROUTE_LIST.CREATE_FORM)}
            >
              Create New
            </AppButton>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {recentForms.length === 0 && (
            <div className="text-sm text-gray-600">
              No forms yet. Create one to get started.
            </div>
          )}

          {recentForms.map((f) => (
            <div
              key={f.id}
              className="flow-root space-y-4 md:flex items-center justify-between p-3 border rounded"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {f.name || "Untitled Form"}
                </div>
                <div className="text-xs text-gray-500">
                  {f.fields?.length || 0} fields • Updated{" "}
                  {f.updatedAt ? new Date(f.updatedAt).toLocaleString() : "—"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AppButton
                  size="small"
                  onClick={() => navigate(`${ROUTE_LIST.FORM_LIST}`)}
                >
                  Open
                </AppButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
