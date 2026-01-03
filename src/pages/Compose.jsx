import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import {
  FiBold,
  FiImage,
  FiItalic,
  FiList,
  FiUnderline,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
// import {
//   useCreatePost,
//   useGetPostById,
//   useUpdatePost,
// } from "../../services/admin-panel/postServices";
// import { useGetAllTags } from "../../services/admin-panel/tagServices";
import { ROUTE_LIST } from "../utils/routes";
import LoadingSpinner from "../components/LoadingSpinner";
import { FORM_INPUT_TYPES } from "../utils/constants";
import FormInput from "../components/form-utils/FormInput";
import AppButton from "../components/basics/AppButton";
import Typography from "../components/basics/Typography";
import useFormStore from "../services/formStorageService";
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

export default function PostNewEditForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { createForm } = useFormStore();

  const isEdit = Boolean(postId);
  const tags = [];

  // const { mutate: createPost, isLoading: isCreatingPost } = useCreatePost();
  // const { mutate: updatePost, isLoading: isUpdatingPost } = useUpdatePost();

  // const {
  //   data: post,
  //   isLoading: postIsLoading,
  //   isError: postIsError,
  // } = useGetPostById(postId);
  // const {
  //   data: tags,
  //   isLoading: tagIsLoading,
  //   isError: tagIsError,
  // } = useGetAllTags(postId);

  const post = {};

  const defaultValues = {
    id: post?.id || uuidv4(),
    name: post?.name || "",
    createdAt: post?.createdAt || new Date().toISOString(),
    fields: post?.fields || [
      {
        id: uuidv4(),
        type: "text",
        label: "",
        placeholder: "",
        required: false,
        defaultValue: "",
        options: [{ label: "", value: "" }],
      },
    ],
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
    if (isEdit && post) {
      setValue("title", post?.title || "");
      setValue("description", post?.description || "");
      setValue("tags", post?.tags || []);
      setValue("images", post?.images || []);
    }
  }, [isEdit, post]);

  //---------------------------------------------------------------------------

  // if (postIsLoading || tagIsLoading) return <LoadingSpinner />;

  // if (postIsError || tagIsError) return <ErrorScreen />;

  //----------------------------------------------------------------------------
  const onSubmit = async (data) => {
    console.log(data);

    try {
      if (isEdit && postId) {
        // await updatePost(
        //   { postId, data },
        //   {
        //     onSuccess: () => {
        //       navigate(ROUTE_LIST.FORM_LIST);
        //     },
        //   }
        // );
      } else {
        const response = createForm(data);
        console.log("first", response);
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
  console.log("first", errors);

  return (
    <>
      {/* <AppPageTitle
        title={isEdit ? "Edit Post" : "Compose Post"}
        description={
          isEdit
            ? "Edit an existing post."
            : "Create a new post to share with your audience."
        }
      /> */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
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

          <div className="border p-4 rounded-md space-y-4">
            <Typography variant="h3">Form Fields</Typography>
            {values?.fields?.map((field, index) => (
              <div key={field.id} className="grid grid-cols-2 gap-4">
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
                <div className="col-span-2">
                  {/* Add more inputs for other field properties as needed */}
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
            <AppButton
              onClick={() => {
                const newField = {
                  id: Date.now().toString(),
                  type: "text",
                  label: "",
                  placeholder: "",
                  required: false,
                  defaultValue: "",
                  options: [{ label: "", value: "" }],
                };
                setValue("fields", [...values.fields, newField]);
              }}
              // className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Add Field
            </AppButton>
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
              Create
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
