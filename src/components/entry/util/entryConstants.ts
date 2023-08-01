export const ENTRY_AMOUNT_TYPES = ["gr", "slice", "serving", "pack"] as const;

export const DEFAULT_ENTRIES: Entry[] = [
  {
    id: "default-entry-i0943094309",
    name: "Scrambled Egg",
    protein: 6.1,
    carb: 4,
    fat: 6.7,
    calories: null,
    amount: {
      value: 1,
      type: "serving",
    },
  },
  {
    id: "default-entry-j2389328493",
    name: "Chicken Breast",
    protein: 31,
    carb: 0,
    fat: 3.6,
    calories: 165,
    amount: {
      value: 100,
      type: "gr",
    },
  },
  {
    id: "default-entry-k4872490872",
    name: "Brown Rice",
    protein: 2.6,
    carb: 22,
    fat: 1.8,
    calories: 111,
    amount: {
      value: 50,
      type: "gr",
    },
  },
  {
    id: "default-entry-m9238749827",
    name: "Avocado",
    protein: 2,
    carb: 8.5,
    fat: 14.7,
    calories: 160,
    amount: {
      value: 1 / 2,
      type: "serving",
    },
  },
  {
    id: "default-entry-p3457329856",
    name: "Salmon Fillet",
    protein: 25,
    carb: 0,
    fat: 13.5,
    calories: 210,
    amount: {
      value: 100,
      type: "gr",
    },
  },
  {
    id: "default-entry-q5472093857",
    name: "Sweet Potato",
    protein: 1.6,
    carb: 20.7,
    fat: 0.1,
    calories: 86,
    amount: {
      value: 150,
      type: "gr",
    },
  },
  {
    id: "default-entry-r8740398340",
    name: "Turkish Yogurt",
    protein: 10,
    carb: 3.6,
    fat: 0.4,
    calories: 59,
    amount: {
      value: 100,
      type: "gr",
    },
  },
  // Add more entries here in the same format if needed.
];
