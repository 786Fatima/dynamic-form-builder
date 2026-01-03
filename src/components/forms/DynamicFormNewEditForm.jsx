import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import AppButton from "../../components/basics/AppButton";
import Typography from "../../components/basics/Typography";
import FormInput from "../../components/form-utils/FormInput";
import useFormStore from "../../services/formStorageService";
import { FORM_INPUT_TYPES } from "../../utils/constants";
import { capitalizeWords } from "../../utils/functions";
import { ROUTE_LIST } from "../../utils/routes";
// import AppPageTitle from "../breadcrumbs/AppPageTitle";

const fieldSchema = yup.object().shape({
  id: yup.string().required(),
  type: yup.string().oneOf(Object.values(FORM_INPUT_TYPES)).required(),
  label: yup.string().required(),
  placeholder: yup.string().optional(),
  required: yup.boolean().default(false),
  defaultValue: yup.string().optional(),
  options: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      })
    )
    .optional(),
});
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  fields: yup
    .array()
    .of(fieldSchema)
    .min(1, "At least one field is required")
    .required("Fields are required"),
});

export default function DynamicFormNewEditForm() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const { createForm, getFormById, updateForm } = useFormStore();

  const isEdit = Boolean(formId);

  const form = isEdit ? getFormById(formId)?.currentForm || null : null;

  const newField = {
    id: uuidv4(),
    type: FORM_INPUT_TYPES.TEXT,
    label: "",
    placeholder: "",
    required: false,
    defaultValue: "",
    options: [{ label: "", value: "" }],
  };

  const defaultValues = {
    id: form?.id || uuidv4(),
    name: form?.name || "",
    createdAt: form?.createdAt || new Date().toISOString(),
    fields: form?.fields || [newField],
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    if (isEdit && form) {
      setValue("name", form?.name || "");
      setValue("description", form?.description || "");
      setValue("fields", form?.fields || []);
    }
  }, [isEdit, form]);

  //---------------------------------------------------------------------------

  const onSubmit = async (data) => {
    try {
      if (isEdit && formId) {
        const response = updateForm({ id: formId, form: data });
        if (response.success) {
          toast.success("Form updated successfully");
          navigate(ROUTE_LIST.FORM_LIST);
        } else {
          toast.error("Failed to update form");
        }
      } else {
        const response = createForm(data);
        if (response.success) {
          toast.success("Form created successfully");
          navigate(ROUTE_LIST.FORM_LIST);
        } else {
          toast.error("Failed to create form");
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 space-y-6 border border-gray-100">
          {/* Title */}
          <FormInput
            name="name"
            label="Name *"
            placeholder="Enter form name..."
            errors={{ isError: errors?.name, message: errors?.name?.message }}
            register={register}
          />
          {/* Description */}
          <FormInput
            name="description"
            label="Description *"
            type="textarea"
            placeholder="Enter form description..."
            errors={{
              isError: errors?.description,
              message: errors?.description?.message,
            }}
            register={register}
          />

          <div className="border p-4 rounded-lg space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <Typography variant="h3">Form Fields</Typography>
              <AppButton
                onClick={() => {
                  setValue("fields", [...values.fields, newField]);
                }}
                className="ml-3"
              >
                Add Field
              </AppButton>
            </div>
            {values?.fields?.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg"
              >
                <FormInput
                  name={`fields[${index}].label`}
                  label="Field Label *"
                  placeholder="Enter field label..."
                  errors={{
                    isError: errors?.fields?.[index]?.label,
                    message: errors?.fields?.[index]?.label?.message,
                  }}
                  register={register}
                />
                <FormInput
                  name={`fields[${index}].type`}
                  label="Field Type *"
                  type="select"
                  options={Object.values(FORM_INPUT_TYPES).map((type) => ({
                    label: capitalizeWords(type),
                    value: type,
                  }))}
                  placeholder="Enter field type..."
                  errors={{
                    isError: errors?.fields?.[index]?.type,
                    message: errors?.fields?.[index]?.type?.message,
                  }}
                  register={register}
                />

                {field.type === FORM_INPUT_TYPES.SELECT && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <FormInput
                      name={`fields[${index}].options`}
                      label="Options"
                      placeholder="Enter options (comma separated)..."
                      errors={{
                        isError: errors?.fields?.[index]?.options,
                        message: errors?.fields?.[index]?.options?.message,
                      }}
                      register={register}
                    />
                  </div>
                )}

                <FormInput
                  name={`fields[${index}].placeholder`}
                  label="Field Placeholder"
                  placeholder="Enter field placeholder..."
                  errors={{
                    isError: errors?.fields?.[index]?.placeholder,
                    message: errors?.fields?.[index]?.placeholder?.message,
                  }}
                  register={register}
                />
                <FormInput
                  name={`fields[${index}].defaultValue`}
                  label="Default Value"
                  placeholder="Enter default value..."
                  errors={{
                    isError: errors?.fields?.[index]?.defaultValue,
                    message: errors?.fields?.[index]?.defaultValue?.message,
                  }}
                  register={register}
                />
                <div className="col-span-2">
                  <FormInput
                    name={`fields[${index}].required`}
                    label="Is the field required?"
                    type="checkbox"
                    errors={{
                      isError: errors?.fields?.[index]?.required,
                      message: errors?.fields?.[index]?.required?.message,
                    }}
                    register={register}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3">
                  <AppButton
                    type="button"
                    variant="error"
                    size="small"
                    onClick={() => {
                      const updatedFields = values.fields.filter(
                        (f, idx) => idx !== index
                      );
                      setValue("fields", updatedFields);
                    }}
                  >
                    Remove
                  </AppButton>
                </div>
              </div>
            ))}
            {/* fallback Add Field for small screens handled above */}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <AppButton
            type="submit"
            className="flex items-center space-x-2"
            // disabled={isCreatingPost || isUpdatingPost}
          >
            <FiUpload className="w-4 h-4" />
            <span>
              {isEdit ? "Update" : "Create"}
              {/* {isCreatingPost || isUpdatingPost
                ? "Publishing..."
                : "Publish Post"} */}
            </span>
          </AppButton>
        </div>
      </form>
    </>
  );
}
