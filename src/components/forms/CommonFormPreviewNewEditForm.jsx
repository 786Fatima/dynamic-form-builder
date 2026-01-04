import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import useFormStore from "../../services/formStorageService";
import { FORM_INPUT_TYPES } from "../../utils/constants";
import { getDynamicSchemaAndDefaultValues } from "../../utils/functions";
import AppButton from "../basics/AppButton";
import FormInput from "../form-utils/FormInput";
// import AppPageTitle from "../breadcrumbs/AppPageTitle";

export default function CommonFormPreviewNewEditForm() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const { getFormById } = useFormStore();

  const formData = getFormById(formId) || null;

  const dynamicFields = formData?.fields || [];

  const { defaultFields, dynamicSchema } =
    getDynamicSchemaAndDefaultValues(dynamicFields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object().shape(dynamicSchema)),
    defaultValues: defaultFields,
  });

  // useEffect(() => {
  //   if (isEdit && form) {
  //     setValue("name", form?.name || "");
  //     setValue("description", form?.description || "");
  //     setValue("fields", form?.fields || []);
  //   }
  // }, [isEdit, form]);

  //---------------------------------------------------------------------------

  const onSubmit = async (data) => {
    try {
      setSubmittedData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg md:rounded-xl shadow-lg p-2 md:p-6 space-y-2 md:space-y-6 border border-gray-100">
          {dynamicFields?.length > 0 &&
            dynamicFields?.map((field) => {
              return (
                <div
                  key={field.id}
                  className={`${
                    field.type === FORM_INPUT_TYPES.TEXTAREA && "col-span-2"
                  }`}
                >
                  <FormInput
                    name={field.key}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    // value={field.defaultValue || ""}
                    options={field.options}
                    errors={{
                      isError: errors?.[field.key],
                      message: errors?.[field.key]?.message,
                    }}
                    register={register}
                  />
                </div>
              );
            })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <AppButton type="submit" className="flex items-center md:space-x-2">
            <FiEye className="w-4 h-4" />
            <span>Preview</span>
          </AppButton>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 p-6 z-10">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Submitted Data</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-80">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <AppButton onClick={() => setIsModalOpen(false)}>Close</AppButton>
              <AppButton variant="error" onClick={() => navigate(-1)}>
                Exit
              </AppButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Modal styles are inline tailwind classes used in the JSX above
