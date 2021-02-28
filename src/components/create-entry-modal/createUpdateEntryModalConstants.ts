import { Entry } from "../../utils/typeUtils";

export const CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES = {
  NAME: "NAME",
  PROTEIN: "PROTEIN",
  CARB: "CARB",
  FAT: "FAT",
  KCAL: "KCAL",
} as const;

export const initialCreateEntryFormState = {
  [CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES.NAME]: "",
  [CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES.PROTEIN]: "",
  [CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES.CARB]: "",
  [CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES.FAT]: "",
  [CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES.KCAL]: "",
  amount: {
    value: "",
    type: "" as Entry["amount"]["type"],
  },
};
