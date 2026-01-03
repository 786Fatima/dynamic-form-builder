import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Heading, Label } from "../common/Typography";
import { FIELD_TYPES, FIELD_LABELS } from "../../utils/constants";

const FieldConfigPanel = ({ field, onUpdate, onClose }) => {
  const [config, setConfig] = useState(field || {});

  const handleChange = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddOption = () => {
    setConfig((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };

  const handleRemoveOption = (index) => {
    setConfig((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleOptionChange = (index, value) => {
    setConfig((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const handleSave = () => {
    onUpdate(config);
    onClose();
  };

  return (
    <div className="card">
      <Heading
        variant="h3"
        size="lg"
        color="gray"
        weight="bold"
        className="mb-6"
      >
        Field Configuration
      </Heading>

      {/* Field Type */}
      <div className="mb-6">
        <Label size="sm" color="gray" weight="semibold">
          Field Type
        </Label>
        <select
          value={config.type || FIELD_TYPES.TEXT}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900 font-medium"
        >
          {Object.entries(FIELD_TYPES).map(([key, value]) => (
            <option key={value} value={value}>
              {FIELD_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      {/* Label */}
      <Input
        label="Field Label"
        placeholder="Enter field label"
        value={config.label || ""}
        onChange={(e) => handleChange("label", e.target.value)}
        required
      />

      {/* Placeholder */}
      <Input
        label="Placeholder Text"
        placeholder="Enter placeholder"
        value={config.placeholder || ""}
        onChange={(e) => handleChange("placeholder", e.target.value)}
      />

      {/* Help Text */}
      <Input
        label="Help Text"
        placeholder="Enter help text"
        value={config.helpText || ""}
        onChange={(e) => handleChange("helpText", e.target.value)}
      />

      {/* Required Checkbox */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.required || false}
            onChange={(e) => handleChange("required", e.target.checked)}
            className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
          />
          <span className="ml-3 text-gray-700 font-medium">Required Field</span>
        </label>
      </div>

      {/* Options for select, radio, checkbox */}
      {[FIELD_TYPES.SELECT, FIELD_TYPES.RADIO, FIELD_TYPES.CHECKBOX].includes(
        config.type
      ) && (
        <div className="mb-6">
          <Label size="sm" color="gray" weight="semibold" className="mb-3">
            Options
          </Label>
          <div className="space-y-2">
            {(config.options || []).map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900 font-medium"
                />
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleAddOption}
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
          >
            + Add Option
          </Button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <Button onClick={handleSave} variant="primary" fullWidth>
          Save Configuration
        </Button>
        <Button onClick={onClose} variant="secondary" fullWidth>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FieldConfigPanel;
