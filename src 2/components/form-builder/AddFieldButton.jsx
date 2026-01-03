import React from "react";
import Button from "../common/Button";
import { FIELD_TYPES, FIELD_LABELS } from "../../utils/constants";

const AddFieldButton = ({ onAddField }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const fieldCategories = {
    "Basic Fields": [
      FIELD_TYPES.TEXT,
      FIELD_TYPES.EMAIL,
      FIELD_TYPES.PASSWORD,
      FIELD_TYPES.NUMBER,
    ],
    "Advanced Fields": [
      FIELD_TYPES.TEXTAREA,
      FIELD_TYPES.SELECT,
      FIELD_TYPES.DATE,
      FIELD_TYPES.TIME,
    ],
    "Choice Fields": [FIELD_TYPES.RADIO, FIELD_TYPES.CHECKBOX],
    "Other Fields": [FIELD_TYPES.PHONE, FIELD_TYPES.URL, FIELD_TYPES.FILE],
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        variant="success"
        size="lg"
        className="flex items-center gap-2 shadow-md"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Field
      </Button>

      {showMenu && (
        <div className="absolute top-full mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 w-72 animate-slide-in">
          {Object.entries(fieldCategories).map(([category, types]) => (
            <div key={category}>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 last:border-b-0">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {category}
                </p>
              </div>
              <div className="py-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onAddField(type);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-primary-50 transition-colors flex items-center gap-3 group"
                  >
                    <span className="text-primary-600 group-hover:text-primary-700">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {FIELD_LABELS[type]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddFieldButton;
