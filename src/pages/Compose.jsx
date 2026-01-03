import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import AppButton from "../components/basics/AppButton";
import DynamicFormNewEditForm from "../components/forms/DynamicFormNewEditForm";
import { FORM_INPUT_TYPES } from "../utils/constants";
import { ROUTE_LIST } from "../utils/routes";
// import AppPageTitle from "../breadcrumbs/AppPageTitle";

export default function DynamicFormNewEditPage() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(formId);

  return (
    <div className="md:w-8/12 w-full mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Dynamic Form" : "Create Dynamic Form"}
          </h2>
          <p className="text-sm text-gray-500">
            Quickly design your form and add fields below.
          </p>
        </div>
        <div className="hidden md:block">
          <AppButton
            variant="secondary"
            onClick={() => navigate(ROUTE_LIST.FORM_LIST)}
          >
            Cancel
          </AppButton>
        </div>
      </div>
      <DynamicFormNewEditForm />
    </div>
  );
}
