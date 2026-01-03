import { useFormStore } from "../services/formStorageService";

// Custom hook for form schema management
export const useFormSchema = (formId) => {
  const {
    currentForm,
    loadForm,
    updateFormField,
    updateFormConfig,
    addField,
    removeField,
    duplicateField,
    updateField,
  } = useFormStore();

  return {
    form: currentForm,
    loadForm,
    updateFormField,
    updateFormConfig,
    addField,
    removeField,
    duplicateField,
    updateField,
  };
};
