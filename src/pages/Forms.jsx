import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormCard from "../components/FormCard.jsx";
import useFormStore from "../services/formStorageService.jsx";
import { ROUTE_LIST } from "../utils/routes.jsx";

export default function Forms() {
  const { forms } = useFormStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredForms = (() => {
    let filtered = [...forms];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (form) =>
          form.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          form.description?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }

    // Sort (use timestamps and handle missing/invalid dates)
    const toTs = (d) => {
      const t = Date.parse(d);
      return Number.isFinite(t) ? t : 0;
    };

    filtered.sort((a, b) => {
      const ta = toTs(a?.createdAt);
      const tb = toTs(b?.createdAt);

      switch (sortBy) {
        case "newest":
          return tb - ta;
        case "oldest":
          return ta - tb;
        default:
          return 0;
      }
    });

    return filtered;
  })();

  const handlePreview = (id) => {
    navigate(`${ROUTE_LIST.PREVIEW_FORM}/${id}`);
  };

  const handleEdit = (form) => {
    toast.info(
      `Edit functionality for "${form.title}" would be implemented here`
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      toast.success("Form deleted successfully");
      // In real app, would call API to delete
    }
  };

  const handleToggleStatus = () => {
    toast.success("Form status updated successfully");
    // In real app, would call API to toggle status
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600">Manage your published content</p>
        </div>
        <button
          onClick={() => navigate(ROUTE_LIST.CREATE_FORM)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center space-x-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Form</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            Showing {filteredForms.length} of {forms.length} forms
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <div key={form.id} className="cursor-pointer">
            <FormCard
              form={form}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPreview={handlePreview}
              onToggleStatus={handleToggleStatus}
            />
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No forms found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
