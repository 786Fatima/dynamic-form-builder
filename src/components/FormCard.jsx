import { useState, useRef, useEffect } from "react";
import {
  FiEdit,
  FiMoreHorizontal,
  FiPower,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

export default function FormCard({
  form,
  onEdit,
  onDelete,
  onToggleStatus,
  onPreview,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showMenu]);

  const handleEdit = () => {
    onEdit(form);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete(form.id);
    setShowMenu(false);
  };

  const handleToggleStatus = () => {
    onToggleStatus(form.id);
    setShowMenu(false);
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Status indicator bar */}
      <div
        className={`h-1 w-full ${
          form.isActive
            ? "bg-gradient-to-r from-blue-500 to-purple-500"
            : "bg-gray-300"
        }`}
      ></div>

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {form.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xs text-gray-500 font-medium">
                {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
            >
              <FiMoreHorizontal className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors border-b border-gray-100"
                >
                  <FiEdit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleToggleStatus}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors border-b border-gray-100"
                >
                  <FiPower className="w-4 h-4" />
                  <span>{form.isActive ? "Disable" : "Enable"}</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {form.description.slice(0, 100) +
            (form.description.length > 100 ? "..." : "")}
        </p>

        {/* Fields Tags */}
        {form.fields && form.fields.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {form.fields.slice(0, 2).map((field) => (
              <span
                key={field.id}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
              >
                {field.label}
              </span>
            ))}
            {form.fields.length > 2 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                +{form.fields.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Preview Button - Bottom Corner */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={() => onPreview && onPreview(form.id)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FiEye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
