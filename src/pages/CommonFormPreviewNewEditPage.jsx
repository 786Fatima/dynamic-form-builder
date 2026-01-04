import { useNavigate, useParams } from "react-router-dom";
import AppButton from "../components/basics/AppButton";
import CommonFormPreviewNewEditForm from "../components/forms/CommonFormPreviewNewEditForm";
import { ROUTE_LIST } from "../utils/routes";
import useFormStore from "../services/formStorageService";
import Typography from "../components/basics/Typography";

export default function CommonFormPreviewNewEditPage() {
  const { formId } = useParams();
  const { getFormById } = useFormStore();
  const navigate = useNavigate();

  const formData = getFormById(formId) || null;

  return (
    <div className="md:w-8/12 w-full mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h2">{`${formData.name} Form`}</Typography>
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
      <CommonFormPreviewNewEditForm />
    </div>
  );
}
