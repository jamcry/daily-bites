function getNutritionSumValuesFromEntryLogs(entryLogs: EntryLog[]) {
  return entryLogs.reduce(
    (prevValues, { entry, numOfServings }) => {
      return {
        ...prevValues,
        protein: prevValues.protein + (entry.protein || 0) * numOfServings,
        carb: prevValues.carb + (entry.carb || 0) * numOfServings,
        fat: prevValues.fat + (entry.fat || 0) * numOfServings,
        calories: prevValues.calories + (entry.calories || 0) * numOfServings,
      };
    },
    {
      protein: 0,
      carb: 0,
      fat: 0,
      calories: 0,
    }
  );
}

export { getNutritionSumValuesFromEntryLogs };
