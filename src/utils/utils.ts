function generateRandomString(length = 6) {
  return Math.random().toString(20).substr(2, length);
}

/**
 *
 * @param date Date object to be parsed string
 * @returns Date string in format YYYYMMDD (e.g. 2020-12-04)
 */
function getDateStringInYYYYMMDD(date?: Date) {
  return (date || new Date()).toISOString().slice(0, 10).replace(/-/g, "");
}

function downloadObjectAsJSON(exportObj: any, exportName: string) {
  // source: https://stackoverflow.com/a/30800715
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function filterEntriesBySearchKeyword(entries: Entry[], keyword: string) {
  return entries.filter((i) =>
    i.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  );
}

export {
  generateRandomString,
  getDateStringInYYYYMMDD,
  downloadObjectAsJSON,
  filterEntriesBySearchKeyword,
};
