/// <reference types="react-scripts" />

interface Entry {
  id: string;
  name: string;
  protein: number | null;
  carb: number | null;
  fat: number | null;
  calories: number | null; // kcal
  amount: {
    value: number;
    type: "gr" | "slice" | "serving" | "pack";
  };
}

interface EntryLog {
  id: string;
  addedAt: number; // timestamp
  numOfServings: number;
  // !!! this can be refactored so that entryLog keeps only entry.id, rather than keeping a copy of entry
  // !!! BUT, entry delete logic should be refactored as well, to make sure to avoid removing referenced entries
  entry: Entry;
}
