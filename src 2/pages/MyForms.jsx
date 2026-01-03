import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "../services/formStorageService";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import { Heading, Text } from "../components/common/Typography";

const MyForms = () => {
  const navigate = useNavigate();
  const { forms, createForm, deleteForm } = useFormStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [newFormDescription, setNewFormDescription] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, published, draft

  const handleCreateForm = () => {
    if (!newFormName.trim()) {
      alert("Please enter a form name");
      return;
    }

    createForm(newFormName, newFormDescription);
    setNewFormName("");
    setNewFormDescription("");
    setShowCreateForm(false);
    navigate("/create");
  };

  const handleDeleteForm = (formId) => {
    deleteForm(formId);
    setDeleteConfirm(null);
  };

  const filteredForms = forms.filter((form) => {
    // Search filter
    const matchesSearch =
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    let matchesStatus = true;
    if (filterStatus === "published") {
      matchesStatus = form.isPublished;
    } else if (filterStatus === "draft") {
      matchesStatus = !form.isPublished;
    }

    return matchesSearch && matchesStatus;
  });

  const publishedCount = forms.filter((f) => f.isPublished).length;
  const draftCount = forms.filter((f) => !f.isPublished).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="hero">
        <div className="container px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <Heading
                variant="h1"
                size="4xl"
                color="white"
                weight="bold"
                className="mb-3"
              >
                Form Builder
              </Heading>
              <Text size="lg" color="white" className="opacity-90">
                Create, manage, and share your forms effortlessly
              </Text>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              variant="secondary"
              size="lg"
              className="flex items-center gap-2 shadow-lg"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Form
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" weight="medium">
                  Total Forms
                </Text>
                <Heading
                  variant="h2"
                  size="3xl"
                  color="gray"
                  weight="bold"
                  className="mt-2"
                >
                  {forms.length}
                </Heading>
              </div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" weight="medium">
                  Published
                </Text>
                <Heading
                  variant="h2"
                  size="3xl"
                  color="success"
                  weight="bold"
                  className="mt-2"
                >
                  {publishedCount}
                </Heading>
              </div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-success-100">
                <svg
                  className="h-6 w-6 text-success-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <Text size="sm" color="muted" weight="medium">
                  Draft
                </Text>
                <Heading
                  variant="h2"
                  size="3xl"
                  color="warning"
                  weight="bold"
                  className="mt-2"
                >
                  {draftCount}
                </Heading>
              </div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-warning-100">
                <svg
                  className="h-6 w-6 text-warning-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search forms by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="md"
                className="mb-0"
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-white font-medium text-gray-700 text-base"
              >
                <option value="all">All Forms</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        {filteredForms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <Heading
              variant="h3"
              size="lg"
              color="gray"
              weight="semibold"
              className="mb-2"
            >
              No forms found
            </Heading>
            <Text color="muted" size="md" className="mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first form to get started"}
            </Text>
            {searchTerm === "" && filterStatus === "all" && (
              <Button onClick={() => setShowCreateForm(true)} variant="primary">
                Create New Form
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <div
                key={form.id}
                className="card transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 px-6 py-4">
                  <div className="flex items-start justify-between">
                    <Heading
                      variant="h3"
                      size="lg"
                      color="white"
                      weight="bold"
                      className="pr-4 line-clamp-2"
                    >
                      {form.name}
                    </Heading>
                    {form.isPublished && (
                      <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full whitespace-nowrap">
                        Published
                      </span>
                    )}
                    {!form.isPublished && (
                      <span className="inline-block px-3 py-1 text-xs font-bold text-gray-900 bg-yellow-300 rounded-full whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {form.description && (
                    <Text color="muted" size="sm" className="mb-4 line-clamp-2">
                      {form.description}
                    </Text>
                  )}

                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.972 1.972 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span>{form.fields.length} fields</span>
                    </div>
                    <div className="flex items-center gap-2">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>{form.responses?.length || 0} responses</span>
                    </div>
                    <div className="flex items-center gap-2">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs">
                        {new Date(form.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-2">
                  <Button
                    onClick={() => navigate(`/create?id=${form.id}`)}
                    variant="primary"
                    size="sm"
                    fullWidth
                    className="flex items-center justify-center gap-1"
                  >
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </Button>
                  <Button
                    onClick={() => navigate(`/preview/${form.id}`)}
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="flex items-center justify-center gap-1"
                  >
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Preview
                  </Button>
                  <button
                    onClick={() => setDeleteConfirm(form.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete form"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Form Modal */}
      <Modal
        isOpen={showCreateForm}
        title="Create New Form"
        onClose={() => {
          setShowCreateForm(false);
          setNewFormName("");
          setNewFormDescription("");
        }}
        onConfirm={handleCreateForm}
        confirmText="Create"
        confirmVariant="primary"
      >
        <div className="space-y-4">
          <Input
            label="Form Name"
            placeholder="Enter form name"
            value={newFormName}
            onChange={(e) => setNewFormName(e.target.value)}
            required
          />
          <Input
            label="Form Description"
            placeholder="Enter form description (optional)"
            value={newFormDescription}
            onChange={(e) => setNewFormDescription(e.target.value)}
          />
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        title="Delete Form"
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteForm(deleteConfirm)}
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

export default MyForms;
