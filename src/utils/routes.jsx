export const PARAM_LIST = {
  formId: ":formId",
};

export const ROUTE_LIST = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CREATE_FORM: "/forms/create",
  FORM_LIST: "/forms",
  PREVIEW_FORM: `/forms/preview/:${PARAM_LIST.formId}`,
};
