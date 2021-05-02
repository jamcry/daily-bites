import { AppState } from "./localStorageUtils";

function isObjectValidAppState(obj: AppState) {
  return Boolean(
    obj.myEntries &&
      obj.myEntries.every(isObjectValidEntry) &&
      (obj.myLogs === null ||
        (obj.myLogs &&
          Object.values(obj.myLogs).every((log) =>
            log.every(isObjectValidEntryLog)
          )))
  );
}

function isObjectValidEntryLog(obj: EntryLog) {
  return (
    obj.id &&
    typeof obj.id === "string" &&
    obj.addedAt &&
    typeof obj.addedAt === "number" &&
    obj.numOfServings &&
    typeof obj.numOfServings === "number" &&
    obj.entry &&
    isObjectValidEntry(obj.entry)
  );
}

function isObjectValidEntry(obj: Entry) {
  return obj.id && obj.name;
}

export { isObjectValidAppState, isObjectValidEntryLog, isObjectValidEntry };
