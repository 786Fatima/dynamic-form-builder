import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import AppButton from "../../components/basics/AppButton";
import Typography from "../../components/basics/Typography";
import FormInput from "../../components/form-utils/FormInput";
import useFormStore from "../../services/formStorageService";
import { FORM_INPUT_TYPES } from "../../utils/constants";
import { capitalizeWords, generateFieldKey } from "../../utils/functions";
import { ROUTE_LIST } from "../../utils/routes";

const fieldSchema = yup.object().shape({
  id: yup.string().required(),
  type: yup.string().oneOf(Object.values(FORM_INPUT_TYPES)).required(),
  label: yup.string().required(),
  key: yup.string().required(),
  placeholder: yup.string().optional(),
  required: yup.boolean().default(false),
  defaultValue: yup.mixed().optional(),
  optionsString: yup.string(),
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

  const form = isEdit ? getFormById(formId) || null : null;

  const newField = {
    id: uuidv4(),
    type: FORM_INPUT_TYPES.TEXT,
    label: "",
    key: "",
    placeholder: "",
    required: false,
    defaultValue: "",
    options: [],
  };

  const defaultValues = {
    id: form?.id || uuidv4(),
    name: form?.name || "",
    createdAt: form?.createdAt || new Date().toISOString(),
    updatedAt: form?.updatedAt || new Date().toISOString(),
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
      const fields = form?.fields?.map((field) => ({
        optionsString:
          field?.options?.length > 0
            ? field?.options?.map((option) => option.value)?.join(",")
            : "",
        ...field,
      }));
      setValue("fields", fields || []);
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

  const handleAddNewField = () => {
    setValue("fields", [...values.fields, newField]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = values.fields.filter((f, idx) => idx !== index);
    setValue("fields", updatedFields);
  };

  const generateFieldKeyByLabel = (e, index) => {
    let fieldKey = e.target.value;
    fieldKey = fieldKey ? generateFieldKey(fieldKey) : "";
    setValue(`fields[${index}].key`, fieldKey);
  };

  const convertStringToOptionArray = (e, index) => {
    const text = e.target.value;
    const options =
      text.length > 0
        ? text
            ?.toString()
            ?.split(",")
            ?.map((option) => ({
              label: capitalizeWords(option),
              value: option?.toUpperCase(),
            })) || []
        : [];
    setValue(`fields[${index}].options`, options);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-6">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg md:rounded-xl shadow-lg p-2 md:p-6 space-y-2 md:space-y-6 border border-gray-100">
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

          <div className="border p-2 md:p-4 rounded-lg space-y-2 md:space-y-4 bg-white">
            <div className="flow-root space-y-2 md:flex items-center justify-between">
              <Typography variant="h3">Form Fields</Typography>
              <AppButton onClick={handleAddNewField} className="md:ml-3">
                <FiPlus />
                Add Field
              </AppButton>
            </div>
            <div className="">
              {values?.fields?.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 bg-gray-50 p-2 md:p-4 rounded-lg border"
                >
                  <div className="col-span-1 md:col-span-2 mb-2">
                    <Typography variant="h5">Field {index + 1}</Typography>
                  </div>
                  <FormInput
                    name={`fields[${index}].label`}
                    label="Field Label *"
                    placeholder="Enter field label..."
                    errors={{
                      isError: errors?.fields?.[index]?.label,
                      message: errors?.fields?.[index]?.label?.message,
                    }}
                    onBlur={(e) => generateFieldKeyByLabel(e, index)}
                    register={register}
                  />
                  <FormInput
                    name={`fields[${index}].key`}
                    label="Field Key *"
                    placeholder="Key will be generated by label"
                    errors={{
                      isError: errors?.fields?.[index]?.key,
                      message: errors?.fields?.[index]?.key?.message,
                    }}
                    value={values?.fields[index]?.key || ""}
                    className="bg-gray-100 cursor-not-allowed"
                  />
                  <FormInput
                    name={`fields[${index}].type`}
                    label="Field Type *"
                    type="select"
                    options={Object.values(FORM_INPUT_TYPES).map((type) => ({
                      label: capitalizeWords(type),
                      value: type,
                    }))}
                    onBlur={() => {
                      setValue(`fields[${index}].defaultValue`, "");
                    }}
                    placeholder="Enter field type..."
                    errors={{
                      isError: errors?.fields?.[index]?.type,
                      message: errors?.fields?.[index]?.type?.message,
                    }}
                    register={register}
                  />

                  {field.type === FORM_INPUT_TYPES.SELECT && (
                    <div className="space-y-2">
                      <FormInput
                        name={`fields[${index}].optionsString`}
                        label="Options"
                        placeholder="Enter options (comma separated)..."
                        errors={{
                          isError: errors?.fields?.[index]?.optionsString,
                          message:
                            errors?.fields?.[index]?.optionsString?.message,
                        }}
                        onBlur={(e) => convertStringToOptionArray(e, index)}
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
                  {field.type === FORM_INPUT_TYPES.SELECT &&
                  field?.options?.length > 0 ? (
                    <FormInput
                      name={`fields[${index}].defaultValue`}
                      label="Default Value"
                      type="select"
                      options={field.options}
                      placeholder="Enter default value..."
                      errors={{
                        isError: errors?.fields?.[index]?.defaultValue,
                        message: errors?.fields?.[index]?.defaultValue?.message,
                      }}
                      register={register}
                    />
                  ) : (
                    <FormInput
                      name={`fields[${index}].defaultValue`}
                      label="Default Value"
                      type={
                        field.type == FORM_INPUT_TYPES.NUMBER
                          ? "number"
                          : "text"
                      }
                      placeholder="Enter default value..."
                      errors={{
                        isError: errors?.fields?.[index]?.defaultValue,
                        message: errors?.fields?.[index]?.defaultValue?.message,
                      }}
                      register={register}
                    />
                  )}
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
                  {values?.fields?.length > 1 && (
                    <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3">
                      <AppButton
                        type="button"
                        variant="error"
                        size="small"
                        onClick={() => handleRemoveField(index)}
                      >
                        Remove
                      </AppButton>
                    </div>
                  )}
                </div>
              ))}{" "}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <AppButton type="submit" className="flex items-center space-x-2">
            <FiUpload className="w-4 h-4" />
            <span>{isEdit ? "Update" : "Create"}</span>
          </AppButton>
        </div>
      </form>
    </>
  );
}
