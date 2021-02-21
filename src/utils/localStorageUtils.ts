import { Entry, EntryLog } from "./typeUtils";

const LS_KEY = "daily_bites_app_data";

type LocalStorageData = {
  myEntries: Entry[]; // i.e. food data
  myLogs: { [dateInYYYYMMDD: string]: EntryLog[] } | null;
};

function loadDataFromLS(): LocalStorageData | null {
  const lsRawData = localStorage.getItem(LS_KEY);
  return lsRawData ? (JSON.parse(lsRawData) as LocalStorageData) : null;
}

function saveDataToLS(data: LocalStorageData) {
  localStorage.setItem(LS_KEY, JSON.stringify(data as LocalStorageData));
}

export { loadDataFromLS, saveDataToLS };
