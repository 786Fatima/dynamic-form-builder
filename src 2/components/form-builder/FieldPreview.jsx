import React from "react";
import RenderField from "../form-renderer/RenderField";
import { Heading, Text } from "../common/Typography";

const FieldPreview = ({ field, formName }) => {
  return (
    <div className="card card-lg">
      <div className="mb-6">
        <Heading variant="h2" size="2xl" color="gray" weight="bold">
          {formName || "Form Preview"}
        </Heading>
        <Text color="muted" size="sm" className="mt-1">
          How your form will appear to users
        </Text>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 min-h-96 border-2 border-dashed border-gray-300">
        {field ? (
          <div className="max-w-md">
            <div className="bg-white rounded-lg p-6 shadow">
              <RenderField field={field} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <Text color="muted" weight="medium">
              Select a field to preview
            </Text>
            <Text color="muted" size="sm" className="mt-2">
              Click on a field from the list to see it here
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldPreview;
