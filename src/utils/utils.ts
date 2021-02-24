function generateRandomString(length = 6) {
  return Math.random().toString(20).substr(2, length);
}

function getDateStringInYYYYMMDD() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
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

export { generateRandomString, getDateStringInYYYYMMDD, downloadObjectAsJSON };
