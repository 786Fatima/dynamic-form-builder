// import { create } from "zustand";
// import { FORMS_STORAGE_KEY } from "../utils/constants";

// // Create Zustand store for form management
// export const useFormStore = create((set, get) => {
//   // Load forms from localStorage
//   const loadFormsFromStorage = () => {
//     try {
//       const forms = localStorage.getItem(FORMS_STORAGE_KEY);
//       return forms ? JSON.parse(forms) : [];
//     } catch (error) {
//       console.error("Error loading forms:", error);
//       return [];
//     }
//   };

//   return {
//     forms: loadFormsFromStorage(),
//     currentForm: null,

//     // Save forms to localStorage
//     saveForms: (forms) => {
//       try {
//         localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
//         set({ forms });
//       } catch (error) {
//         console.error("Error saving forms:", error);
//       }
//     },

//     // Create new form
//     createForm: (form) => {
//       set((state) => {
//         const updatedForms = [...state.forms, form];
//         localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

//         return {
//           forms: updatedForms,
//           currentForm: form,
//         };
//       });
//     },

//     // Load form by ID
//     loadForm: (formId) => {
//       set((state) => {
//         const form = state.forms.find((f) => f.id === formId);
//         return { currentForm: form || null };
//       });
//     },

//     updateForm: ({ id = null, form }) => {
//       set((state) => {
//         if (!id || !state.currentForm) return state;

//         const formDetails =
//           loadFormsFromStorage().find((f) => f.id === id) || {};

//         const updatedForm = {
//           ...formDetails,
//           ...form,
//           updatedAt: new Date().toISOString(),
//         };

//         const updatedForms = state.forms.map((f) =>
//           f.id === state.currentForm.id ? updatedForm : f
//         );

//         localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

//         return {
//           forms: updatedForms,
//           currentForm: updatedForm,
//         };
//       });
//     },

//     // Publish form
//     publishForm: () => {
//       set((state) => {
//         if (!state.currentForm) return state;

//         const updatedForm = {
//           ...state.currentForm,
//           isPublished: true,
//           publishedAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         };

//         const updatedForms = state.forms.map((f) =>
//           f.id === state.currentForm.id ? updatedForm : f
//         );

//         localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

//         return {
//           forms: updatedForms,
//           currentForm: updatedForm,
//         };
//       });
//     },

//     // Delete form
//     deleteForm: (formId) => {
//       set((state) => {
//         const updatedForms = state.forms.filter((f) => f.id !== formId);
//         localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

//         return {
//           forms: updatedForms,
//           currentForm:
//             state.currentForm?.id === formId ? null : state.currentForm,
//         };
//       });
//     },

//     // Get all forms
//     getForms: () => {
//       return get().forms;
//     },

//     // Get form by ID
//     getFormById: (formId) => {
//       return get().forms.find((f) => f.id === formId);
//     },

//     // Reorder fields
//     reorderFields: (fieldIds) => {
//       set((state) => {
//         if (!state.currentForm) return state;

//         const fieldMap = new Map(
//           state.currentForm.fields.map((f) => [f.id, f])
//         );

//         const reorderedFields = fieldIds
//           .map((id) => fieldMap.get(id))
//           .filter((f) => f !== undefined);

//         const updatedForm = {
//           ...state.currentForm,
//           fields: reorderedFields,
//           updatedAt: new Date().toISOString(),
//         };

//         const updatedForms = state.forms.map((f) =>
//           f.id === state.currentForm.id ? updatedForm : f
//         );

//         localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

//         return {
//           forms: updatedForms,
//           currentForm: updatedForm,
//         };
//       });
//     },
//   };
// });

// // Function to initialize store with persisted data
// export const initializeFormStore = () => {
//   const forms = loadFormsFromStorage();
//   useFormStore.setState({ forms });
// };

// // Helper function to load forms from storage
// const loadFormsFromStorage = () => {
//   try {
//     const forms = localStorage.getItem(FORMS_STORAGE_KEY);
//     return forms ? JSON.parse(forms) : [];
//   } catch (error) {
//     console.error("Error loading forms:", error);
//     return [];
//   }
// };

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FORMS_STORAGE_KEY } from "../utils/constants";

const loadFormsFromStorage = () => {
  try {
    const forms = localStorage.getItem(FORMS_STORAGE_KEY);
    return forms ? JSON.parse(forms) : [];
  } catch (error) {
    console.error("Error loading forms:", error);
    return [];
  }
};

const useFormStore = create(
  persist(
    (set, get) => ({
      forms: [],

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
      createForm: (form) => {
        let createdForm = null;

        set((state) => {
          const updatedForms = [...state.forms, form];
          localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

          createdForm = form;

          return {
            forms: updatedForms,
            currentForm: form,
          };
        });

        return { form: createdForm, success: Boolean(createdForm) };
      },

      // Load form by ID
      loadForm: (formId) => {
        set((state) => {
          const form = state.forms.find((f) => f.id === formId);
          return { currentForm: form || null };
        });
      },

      updateForm: ({ id = null, form }) => {
        set((state) => {
          if (!id || !state.currentForm) return state;

          const formDetails =
            loadFormsFromStorage().find((f) => f.id === id) || {};

          const updatedForm = {
            ...formDetails,
            ...form,
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

      // // Publish form
      // publishForm: () => {
      //   set((state) => {
      //     if (!state.currentForm) return state;

      //     const updatedForm = {
      //       ...state.currentForm,
      //       isPublished: true,
      //       publishedAt: new Date().toISOString(),
      //       updatedAt: new Date().toISOString(),
      //     };

      //     const updatedForms = state.forms.map((f) =>
      //       f.id === state.currentForm.id ? updatedForm : f
      //     );

      //     localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(updatedForms));

      //     return {
      //       forms: updatedForms,
      //       currentForm: updatedForm,
      //     };
      //   });
      // },

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
    }),
    {
      name: FORMS_STORAGE_KEY, // unique name
      // Only persist auth state and UI preferences
      partialize: (state) => ({
        forms: state.forms,
      }),
    }
  )
);

export default useFormStore;
