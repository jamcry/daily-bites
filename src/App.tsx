import { AddIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Spacer,
  Heading,
  HStack,
  Flex,
  Select,
} from "@chakra-ui/react";

import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <AddEntryForm />
    </div>
  );
}

const INPUT_NAMES = {
  NAME: "NAME",
  PROTEIN: "PROTEIN",
  CARB: "CARB",
  FAT: "FAT",
  AMOUNT: "AMOUNT",
};

const initialFormState = {
  [INPUT_NAMES.NAME]: "",
  [INPUT_NAMES.PROTEIN]: "",
  [INPUT_NAMES.CARB]: "",
  [INPUT_NAMES.FAT]: "",
  [INPUT_NAMES.AMOUNT]: "",
};

function AddEntryForm() {
  const { NAME, PROTEIN, CARB, FAT, AMOUNT } = INPUT_NAMES;
  const [formState, setFormState] = useState(initialFormState);
  const [entries, setEntries] = useState([] as any[]);

  // TODO: add Calories(kcal), Amount(100g, 1 serving, 1 pack etc. [string for now]) fields

  return (
    <Box p={8}>
      <Box
        id="form"
        bg="gray.50"
        borderWidth="1px"
        borderRadius={6}
        padding={4}
        borderColor="gray.200"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h1" size="lg" mb={4}>
            Add New Entry
          </Heading>

          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              name={NAME}
              placeholder="e.g. 1 Scrambled Egg"
              value={formState[NAME]}
              onChange={handleInputChange}
              isRequired
              background="white"
            />
          </FormControl>

          <HStack mt={4}>
            <FormControl id="protein">
              <FormLabel>Protein (g)</FormLabel>
              <Input
                type="number"
                name={PROTEIN}
                value={formState[PROTEIN]}
                step=".1"
                onChange={handleInputChange}
                isRequired
                background="white"
              />
            </FormControl>

            <FormControl id="carb">
              <FormLabel>Carb (g)</FormLabel>
              <Input
                type="number"
                name={CARB}
                value={formState[CARB]}
                step=".1"
                onChange={handleInputChange}
                isRequired
                background="white"
              />
            </FormControl>

            <FormControl id="fat">
              <FormLabel>Fat (g)</FormLabel>
              <Input
                type="number"
                name={FAT}
                value={formState[FAT]}
                step=".1"
                onChange={handleInputChange}
                isRequired
                background="white"
              />
            </FormControl>
          </HStack>

          <HStack mt={4} verticalAlign="bottom">
            <FormControl id="amount" flex={2}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name={AMOUNT}
                value={formState[AMOUNT]}
                step=".1"
                onChange={handleInputChange}
                isRequired
                background="white"
              />
            </FormControl>

            <FormControl id="amount_type" flex={1}>
              <FormLabel>Amount Type</FormLabel>
              <Select placeholder="Select type" background="white">
                <option value="option1" selected>
                  gr
                </option>
                <option value="option2">pack</option>
                <option value="option3">serving</option>
                <option value="option4">slice</option>
              </Select>{" "}
            </FormControl>
          </HStack>

          <Flex justifyContent="flex-end">
            <Button
              mt={4}
              ml={"auto"}
              colorScheme="blue"
              type="submit"
              leftIcon={<AddIcon />}
              textTransform={"uppercase"}
              letterSpacing={"0.02em"}
            >
              Create
            </Button>
          </Flex>
        </form>
      </Box>

      <Spacer mt={16} mb={8} />

      <dl>
        <Heading as="h2" size="md" mb={8}>
          Entries
        </Heading>
        {entries.map(({ name, protein, carb, fat }) => (
          <Box bg="#888" w="100%" borderRadius={5} p={4} mb={8} color="white">
            <dt>{name || "unnamed"}</dt>
            <dd>{`Protein: ${protein}g`}</dd>
            <dd>{`Carb   : ${carb}g`}</dd>
            <dd>{`Fat    : ${fat}g`}</dd>
          </Box>
        ))}
      </dl>
    </Box>
  );

  function handleInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setEntries([
      ...entries,
      {
        name: formState[NAME],
        protein: formState[PROTEIN],
        carb: formState[CARB],
        fat: formState[FAT],
        amount: formState[AMOUNT],
      },
    ]);
    setFormState(initialFormState);
    console.log({ entries });
  }
}

export default App;
