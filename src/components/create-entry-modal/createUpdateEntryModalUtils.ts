import { Entry } from "../../utils/typeUtils";
import { generateRandomString } from "../../utils/utils";
import {
  initialCreateEntryFormState,
  CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES,
} from "./createUpdateEntryModalConstants";

export function getEditEntryModalInitialStateFromEntry(
  entry: Partial<Entry>
): typeof initialCreateEntryFormState {
  return {
    NAME: entry.name || "",
    PROTEIN: String(entry.protein) || "",
    CARB: String(entry.carb) || "",
    FAT: String(entry.fat) || "",
    KCAL: String(entry.calories) || "",
    amount: {
      value: String(entry.amount?.value) || "",
      type: entry.amount?.type || "gr",
    },
  };
}

export function createEntryFromEntryModalState(
  formState: typeof initialCreateEntryFormState,
  id?: string
): Entry {
  const {
    NAME,
    PROTEIN,
    CARB,
    FAT,
    KCAL,
  } = CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES;

  return {
    id: id || generateRandomString(10),
    name: formState[NAME],
    protein: parseFloat(formState[PROTEIN]),
    carb: parseFloat(formState[CARB]),
    fat: parseFloat(formState[FAT]),
    calories: parseFloat(formState[KCAL]),
    amount: {
      value: parseFloat(formState.amount.value),
      type: formState.amount.type,
    },
  };
}
