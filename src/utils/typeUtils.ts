export const ENTRY_AMOUNT_TYPES = ["gr", "slice", "serving", "pack"] as const;

export interface Entry {
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

export interface EntryLog {
  id: string;
  addedAt: number; // timestamp
  numOfServings: number;
  entry: Entry;
}

export const defaults: Entry[] = [
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
    id: "default-entry-0923903i093i09",
    name: "NAMET Smoked Turkey",
    protein: 1.7,
    carb: 0.2,
    fat: 0.18,
    calories: 9.2,
    amount: {
      value: 1,
      type: "slice",
    },
  },

  {
    id: "default-entry-u843i094ti093i09",
    name: "Lor Cheese",
    protein: 16.85,
    carb: 2.73,
    fat: 3.6,
    calories: 173,
    amount: {
      value: 100,
      type: "gr",
    },
  },

  {
    id: "default-entry-65ju65j55u6u46u56",
    name: "EMIN Cheese Meatballs",
    protein: 21,
    carb: 7,
    fat: 11,
    calories: 214,
    amount: {
      value: 100,
      type: "gr",
    },
  },

  {
    id: "default-entry-5u4y54u56j675i5i756i",
    name: "UNO Toast Bread",
    protein: 1.7,
    carb: 13.5,
    fat: 0.5,
    calories: 65,
    amount: {
      value: 1,
      type: "slice",
    },
  },

  {
    id: "default-entry-54u4u565675ik75ik5",
    name: "GOLD Peanut Butter",
    protein: 22,
    carb: 30.6,
    fat: 42.8,
    calories: 580,
    amount: {
      value: 100,
      type: "gr",
    },
  },

  {
    id: "default-entry-h54u56u655j56j",
    name: "Supefresh Tuna Fish (80g)",
    protein: 16.6,
    carb: 0,
    fat: 8,
    calories: 130,
    amount: {
      value: 1,
      type: "pack",
    },
  },

  {
    id: "default-entry-4jhu56j4j",
    name: "Chicken Breast",
    protein: 31,
    carb: 0,
    fat: 4,
    calories: 165,
    amount: {
      value: 100,
      type: "gr",
    },
  },

  {
    id: "default-entry-46uh44y45yy3y5",
    name: "Mushroom",
    protein: 3,
    carb: 3.2,
    fat: 0.1,
    calories: null,
    amount: {
      value: 100,
      type: "gr",
    },
  },

  {
    id: "default-entry-53hu46u46u46",
    name: "Indomie Noodle (80g)",
    protein: 8.8,
    carb: 48,
    fat: 13,
    calories: 370,
    amount: {
      value: 1,
      type: "pack",
    },
  },

  {
    id: "default-entry-45ju54u5445y54",
    name: "Local Toast Bread (30g)",
    protein: 2.85,
    carb: 14,
    fat: 1,
    calories: 75,
    amount: {
      value: 1,
      type: "slice",
    },
  },

  {
    id: "default-entry-54uh4h54yu4u454",
    name: "Half-fat Milk (250ml)",
    protein: 7.3,
    carb: 11.8,
    fat: 4.3,
    calories: 114,
    amount: {
      value: 1,
      type: "pack",
    },
  },
];
