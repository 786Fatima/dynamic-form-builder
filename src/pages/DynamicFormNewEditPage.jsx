import { useNavigate, useParams } from "react-router-dom";
import AppButton from "../components/basics/AppButton";
import DynamicFormNewEditForm from "../components/forms/DynamicFormNewEditForm";
import { ROUTE_LIST } from "../utils/routes";
import Typography from "../components/basics/Typography";

export default function DynamicFormNewEditPage() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(formId);

  return (
    <div className="w-full md:w-11/12 lg:w-8/12 w-full mx-auto flex flex-col gap-3 md:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">
            {isEdit ? "Edit Dynamic Form" : "Create Dynamic Form"}
          </Typography>
          <Typography variant="body">
            Quickly design your form and add fields below.
          </Typography>
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
