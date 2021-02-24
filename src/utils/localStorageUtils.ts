import { Entry, EntryLog } from "./typeUtils";

const LS_KEY = "daily_bites_app_data";

export type AppState = {
  myEntries: Entry[]; // i.e. food data
  myLogs: { [dateInYYYYMMDD: string]: EntryLog[] } | null;
};

function loadDataFromLS(): AppState | null {
  const lsRawData = localStorage.getItem(LS_KEY);
  return lsRawData ? (JSON.parse(lsRawData) as AppState) : null;
}

function saveDataToLS(data: AppState) {
  localStorage.setItem(LS_KEY, JSON.stringify(data as AppState));
}

export { loadDataFromLS, saveDataToLS };
