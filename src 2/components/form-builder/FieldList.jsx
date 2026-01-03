import React from "react";
import Button from "../common/Button";
import { Heading, Text } from "../common/Typography";

const FieldList = ({
  fields,
  onSelectField,
  onDeleteField,
  onDuplicateField,
  selectedFieldId,
}) => {
  return (
    <div className="card">
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 px-6 py-4">
        <Heading variant="h2" size="lg" color="white" weight="bold">
          Form Fields ({fields.length})
        </Heading>
      </div>

      {fields.length === 0 ? (
        <div className="p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4a1 1 0 011-1h16a1 1 0 011 1v2.757a1 1 0 01-.071.382l-8 15a1 1 0 01-1.858 0l-8-15A1 1 0 013 6.757V4z"
            />
          </svg>
          <Text color="muted" weight="medium">
            No fields added yet
          </Text>
          <Text color="muted" size="sm" className="mt-1">
            Start by adding your first field
          </Text>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:bg-primary-50 ${
                selectedFieldId === field.id
                  ? "bg-primary-50 border-l-4 border-primary-600"
                  : ""
              }`}
              onClick={() => onSelectField(field)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Heading
                      variant="h3"
                      size="sm"
                      color="gray"
                      weight="semibold"
                    >
                      {field.label}
                    </Heading>
                    {field.required && (
                      <span className="text-xs bg-danger-100 text-danger-700 px-2 py-1 rounded font-medium">
                        Required
                      </span>
                    )}
                  </div>
                  <Text size="sm" color="muted" className="mt-1">
                    Type: {field.type}
                  </Text>
                  {field.helpText && (
                    <Text size="sm" color="muted" italic className="mt-1">
                      {field.helpText}
                    </Text>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateField(field.id);
                    }}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    title="Duplicate field"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteField(field.id);
                    }}
                    className="p-2 text-danger-600 hover:bg-danger-100 rounded-lg transition-colors"
                    title="Delete field"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldList;
