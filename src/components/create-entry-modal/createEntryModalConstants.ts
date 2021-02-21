import { Entry } from "../../utils/typeUtils";

export const CREATE_ENTRY_FORM_INPUT_NAMES = {
  NAME: "NAME",
  PROTEIN: "PROTEIN",
  CARB: "CARB",
  FAT: "FAT",
  KCAL: "KCAL",
} as const;

export const initialCreateEntryFormState = {
  [CREATE_ENTRY_FORM_INPUT_NAMES.NAME]: "",
  [CREATE_ENTRY_FORM_INPUT_NAMES.PROTEIN]: "",
  [CREATE_ENTRY_FORM_INPUT_NAMES.CARB]: "",
  [CREATE_ENTRY_FORM_INPUT_NAMES.FAT]: "",
  [CREATE_ENTRY_FORM_INPUT_NAMES.KCAL]: "",
  amount: {
    value: "",
    type: "" as Entry["amount"]["type"],
  },
};
