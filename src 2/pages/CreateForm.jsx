import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "../services/formStorageService";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Heading, Text } from "../components/common/Typography";
import FieldConfigPanel from "../components/form-builder/FieldConfigPanel";
import FieldList from "../components/form-builder/FieldList";
import FieldPreview from "../components/form-builder/FieldPreview";
import AddFieldButton from "../components/form-builder/AddFieldButton";
import Modal from "../components/common/Modal";
import { FIELD_TYPES } from "../utils/constants";

const CreateForm = () => {
  const navigate = useNavigate();
  const {
    currentForm,
    createForm,
    addField,
    removeField,
    duplicateField,
    updateField,
    updateFormConfig,
    publishForm,
    deleteForm,
  } = useFormStore();

  const [formName, setFormName] = useState(currentForm?.name || "");
  const [formDescription, setFormDescription] = useState(
    currentForm?.description || ""
  );
  const [selectedField, setSelectedField] = useState(null);
  const [showFieldConfig, setShowFieldConfig] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  // Initialize new form if none exists
  React.useEffect(() => {
    if (!currentForm) {
      createForm("Untitled Form", "");
    }
  }, []);

  const handleAddField = (fieldType) => {
    addField({
      type: fieldType,
      label: `New ${fieldType} field`,
      placeholder: "",
      required: false,
      helpText: "",
    });
  };

  const handleUpdateFieldConfig = (config) => {
    updateField(selectedField.id, config);
    setSelectedField(null);
    setShowFieldConfig(false);
  };

  const handleSaveFormConfig = () => {
    updateFormConfig({
      name: formName,
      description: formDescription,
    });
  };

  const handlePublish = () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }
    publishForm();
    setShowPublishConfirm(false);
    alert("Form published successfully!");
  };

  const handleDelete = () => {
    deleteForm(currentForm?.id);
    setShowDeleteConfirm(false);
    navigate("/myforms");
  };

  if (!currentForm)
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <Text color="muted">Loading...</Text>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="hero-light sticky top-0 z-40">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/myforms")}
                className="p-2 hover:bg-primary-50 rounded-lg transition-colors text-gray-600 hover:text-primary-600"
                aria-label="Go back"
              >
                <svg
                  className="h-6 w-6"
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
              </button>
              <Heading variant="h1" size="2xl" color="primary" weight="bold">
                Form Builder
              </Heading>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowPublishConfirm(true)}
                variant="success"
                className="flex items-center gap-2"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Publish
              </Button>
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="danger"
                className="flex items-center gap-2"
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
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Configuration */}
        <div className="card card-lg mb-8">
          <Heading
            variant="h2"
            size="xl"
            color="gray"
            weight="bold"
            className="mb-6"
          >
            Form Details
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Form Name"
              placeholder="Enter form name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
            <Input
              label="Form Description"
              placeholder="Enter form description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSaveFormConfig}
            variant="primary"
            className="mt-4"
          >
            Save Changes
          </Button>
        </div>

        {/* Form Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Add Fields */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="mb-6">
                <AddFieldButton onAddField={handleAddField} />
              </div>
              <FieldList
                fields={currentForm.fields}
                onSelectField={setSelectedField}
                onDeleteField={removeField}
                onDuplicateField={duplicateField}
                selectedFieldId={selectedField?.id}
              />
            </div>
          </div>

          {/* Right Panel - Preview & Config */}
          <div className="lg:col-span-2 space-y-8">
            <FieldPreview field={selectedField} formName={formName} />
            {selectedField && (
              <div>
                <Button
                  onClick={() => setShowFieldConfig(!showFieldConfig)}
                  variant="primary"
                  fullWidth
                >
                  {showFieldConfig
                    ? "Hide Configuration"
                    : "Edit Field Configuration"}
                </Button>
                {showFieldConfig && (
                  <div className="mt-6">
                    <FieldConfigPanel
                      field={selectedField}
                      onUpdate={handleUpdateFieldConfig}
                      onClose={() => setShowFieldConfig(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showPublishConfirm}
        title="Publish Form"
        onClose={() => setShowPublishConfirm(false)}
        onConfirm={handlePublish}
        confirmText="Publish"
        confirmVariant="success"
      >
        <Text color="gray" size="md">
          Are you sure you want to publish this form? Once published, users will
          be able to access and submit responses.
        </Text>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        title="Delete Form"
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        confirmText="Delete"
        confirmVariant="danger"
      >
        <Text color="gray" size="md">
          Are you sure you want to delete this form? This action cannot be
          undone. All form responses will also be deleted.
        </Text>
      </Modal>
    </div>
  );
};

export default CreateForm;
