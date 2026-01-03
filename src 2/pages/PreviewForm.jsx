import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormStore } from "../services/formStorageService";
import RenderField from "../components/form-renderer/RenderField";
import Button from "../components/common/Button";
import { Heading, Text } from "../components/common/Typography";
import ValidationMessage from "../components/form-renderer/ValidationMessage";
import { validateField } from "../utils/validators";

const PreviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFormById, saveFormResponse } = useFormStore();
  const [form, setForm] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const formData = getFormById(id);
    if (formData) {
      setForm(formData);
      // Initialize form values
      const initialValues = {};
      formData.fields.forEach((field) => {
        initialValues[field.id] = "";
      });
      setFormValues(initialValues);
    } else {
      setForm(null);
    }
  }, [id]);

  const handleFieldChange = (fieldId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    form.fields.forEach((field) => {
      const value = formValues[field.id];

      if (field.required && (!value || value === "")) {
        newErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      // Add more validations based on field type if needed
      if (value && field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.id] = "Invalid email format";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      saveFormResponse(form.id, formValues);
      setSubmitted(true);
      setSubmitting(false);
    }, 800);
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="text-center card p-8 max-w-md">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Heading variant="h2" size="xl" color="gray" weight="bold">
            Form not found
          </Heading>
          <Text color="muted" size="md" className="mt-2">
            The form you're looking for doesn't exist.
          </Text>
          <Button
            onClick={() => navigate("/myforms")}
            variant="primary"
            className="mt-6"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="card card-lg p-12 max-w-md text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success-100 mb-4">
            <svg
              className="h-8 w-8 text-success-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Heading
            variant="h2"
            size="2xl"
            color="gray"
            weight="bold"
            className="mb-2"
          >
            Response Submitted!
          </Heading>
          <Text color="muted" size="md" className="mb-6">
            Thank you for submitting the form. Your response has been recorded.
          </Text>
          <Button
            onClick={() => {
              setSubmitted(false);
              const initialValues = {};
              form.fields.forEach((field) => {
                initialValues[field.id] = "";
              });
              setFormValues(initialValues);
              setErrors({});
            }}
            variant="primary"
            fullWidth
          >
            Submit Another Response
          </Button>
          <Button
            onClick={() => navigate("/myforms")}
            variant="secondary"
            fullWidth
            className="mt-3"
          >
            Go Back to Forms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="container max-w-2xl px-4 mx-auto">
        {/* Header */}
        <div className="card card-lg mb-8">
          <button
            onClick={() => navigate("/myforms")}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 font-semibold transition-colors"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Forms
          </button>
          <Heading
            variant="h1"
            size="4xl"
            color="gray"
            weight="bold"
            className="mb-2"
          >
            {form.name}
          </Heading>
          {form.description && (
            <Text size="lg" color="muted">
              {form.description}
            </Text>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            {form.fields.map((field) => (
              <RenderField
                key={field.id}
                field={field}
                value={formValues[field.id] || ""}
                onChange={(value) => handleFieldChange(field.id, value)}
                error={errors[field.id]}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <Button
              type="submit"
              variant="success"
              size="lg"
              fullWidth
              disabled={submitting}
              className="flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Submit Response
                </>
              )}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => setErrors({})}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreviewForm;
