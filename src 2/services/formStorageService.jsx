import { create } from "zustand";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils/generateId";
import {
  FORMS_STORAGE_KEY,
  DEFAULT_FIELD_CONFIG,
  FIELD_TYPES,
} from "../utils/constants";

// Create Zustand store for form management
export const useFormStore = create((set, get) => {
  // Load forms from localStorage
  const loadFormsFromStorage = () => {
    try {
      const forms = localStorage.getItem(FORMS_STORAGE_KEY);
      return forms ? JSON.parse(forms) : [];
    } catch (error) {
      console.error("Error loading forms:", error);
      return [];
    }
  };

  return {
    forms: loadFormsFromStorage(),
    currentForm: null,

    // Save forms to localStorage
    saveForms: (forms) => {
      try {
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
        set({ forms });
      } catch (error) {
        console.error("Error saving forms:", error);
      }
    },

    // Create new form
    createForm: (name, description = "") => {
      set((state) => {
        const newForm = {
          id: generateId(),
          name,
          description,
          fields: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: null,
          isPublished: false,
          responses: [],
        };

        const updatedForms = [...state.forms, newForm];
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: newForm,
        };
      });
    },

    // Load form by ID
    loadForm: (formId) => {
      set((state) => {
        const form = state.forms.find((f) => f.id === formId);
        return { currentForm: form || null };
      });
    },

    // Update form config (name, description, etc.)
    updateFormConfig: (updates) => {
      set((state) => {
        if (!state.currentForm) return state;

        const updatedForm = {
          ...state.currentForm,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },

    // Add field to form
    addField: (fieldConfig = {}) => {
      set((state) => {
        if (!state.currentForm) return state;

        const newField = {
          id: generateId(),
          ...DEFAULT_FIELD_CONFIG,
          ...fieldConfig,
          order: state.currentForm.fields.length,
        };

        const updatedForm = {
          ...state.currentForm,
          fields: [...state.currentForm.fields, newField],
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },

    // Update field in form
    updateField: (fieldId, updates) => {
      set((state) => {
        if (!state.currentForm) return state;

        const updatedForm = {
          ...state.currentForm,
          fields: state.currentForm.fields.map((field) =>
            field.id === fieldId ? { ...field, ...updates } : field
          ),
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },

    // Remove field from form
    removeField: (fieldId) => {
      set((state) => {
        if (!state.currentForm) return state;

        const updatedForm = {
          ...state.currentForm,
          fields: state.currentForm.fields.filter((f) => f.id !== fieldId),
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },

    // Duplicate field
    duplicateField: (fieldId) => {
      set((state) => {
        if (!state.currentForm) return state;

        const fieldToDuplicate = state.currentForm.fields.find(
          (f) => f.id === fieldId
        );
        if (!fieldToDuplicate) return state;

        const duplicatedField = {
          ...fieldToDuplicate,
          id: generateId(),
          label: `${fieldToDuplicate.label} (copy)`,
        };

        const updatedForm = {
          ...state.currentForm,
          fields: [...state.currentForm.fields, duplicatedField],
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },

    // Save form response
    saveFormResponse: (formId, responseData) => {
      set((state) => {
        const updatedForms = state.forms.map((form) => {
          if (form.id === formId) {
            return {
              ...form,
              responses: [
                ...(form.responses || []),
                {
                  id: generateId(),
                  data: responseData,
                  submittedAt: new Date().toISOString(),
                },
              ],
            };
          }
          return form;
        });

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return { forms: updatedForms };
      });
    },

    // Publish form
    publishForm: () => {
      set((state) => {
        if (!state.currentForm) return state;

        const updatedForm = {
          ...state.currentForm,
          isPublished: true,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },

    // Delete form
    deleteForm: (formId) => {
      set((state) => {
        const updatedForms = state.forms.filter((f) => f.id !== formId);
        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm:
            state.currentForm?.id === formId ? null : state.currentForm,
        };
      });
    },

    // Get all forms
    getForms: () => {
      return get().forms;
    },

    // Get form by ID
    getFormById: (formId) => {
      return get().forms.find((f) => f.id === formId);
    },

    // Reorder fields
    reorderFields: (fieldIds) => {
      set((state) => {
        if (!state.currentForm) return state;

        const fieldMap = new Map(
          state.currentForm.fields.map((f) => [f.id, f])
        );

        const reorderedFields = fieldIds
          .map((id) => fieldMap.get(id))
          .filter((f) => f !== undefined);

        const updatedForm = {
          ...state.currentForm,
          fields: reorderedFields,
          updatedAt: new Date().toISOString(),
        };

        const updatedForms = state.forms.map((f) =>
          f.id === state.currentForm.id ? updatedForm : f
        );

        localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

        return {
          forms: updatedForms,
          currentForm: updatedForm,
        };
      });
    },
  };
});

// Function to initialize store with persisted data
export const initializeFormStore = () => {
  const forms = loadFormsFromStorage();
  useFormStore.setState({ forms });
};

// Helper function to load forms from storage
const loadFormsFromStorage = () => {
  try {
    const forms = localStorage.getItem(FORMS_STORAGE_KEY);
    return forms ? JSON.parse(forms) : [];
  } catch (error) {
    console.error("Error loading forms:", error);
    return [];
  }
};
