import React, { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";

import { Entry, ENTRY_AMOUNT_TYPES } from "../../utils/typeUtils";
import {
  CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES,
  initialCreateEntryFormState,
} from "./createUpdateEntryModalConstants";
import {
  getEditEntryModalInitialStateFromEntry,
  createEntryFromEntryModalState,
} from "./createUpdateEntryModalUtils";

interface CreateEntryModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit: (entry: Entry) => void;
  // Entry is partial because only single field can be passed for initializing the form (for example pre-filled name)
  entry?: Partial<Entry>;
  mode?: "EDIT" | "CREATE";
}

function CreateUpdateEntryModal({
  isOpen,
  onClose,
  onSubmit,
  entry,
  mode = "CREATE",
}: CreateEntryModalProps) {
  const {
    NAME,
    PROTEIN,
    CARB,
    FAT,
    KCAL,
  } = CREATE_UPDATE_ENTRY_FORM_INPUT_NAMES;
  const [formState, setFormState] = useState(initialCreateEntryFormState);
  const isEditForm = mode === "EDIT";

  useEffect(() => {
    if (entry) {
      setFormState(getEditEntryModalInitialStateFromEntry(entry));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditForm ? `Edit "${entry?.name}"` : "Create New Entry"}
        </ModalHeader>

        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <HStack>
              <FormControl id="name" flex={2}>
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

              <FormControl id="kcal" flex={1}>
                <FormLabel>kcal</FormLabel>
                <Input
                  type="number"
                  name={KCAL}
                  value={formState[KCAL]}
                  onChange={handleInputChange}
                  isRequired
                  background="white"
                />
              </FormControl>
            </HStack>

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
                  name={"AMOUNT_VAL"}
                  value={formState.amount.value}
                  step=".1"
                  onChange={handleAmountValueChange}
                  isRequired
                  background="white"
                />
              </FormControl>

              <FormControl id="amount_type" flex={1}>
                <FormLabel>Unit</FormLabel>
                <Select background="white" defaultValue={ENTRY_AMOUNT_TYPES[0]}>
                  {ENTRY_AMOUNT_TYPES.map((t) => (
                    <option key={`option-${t}`} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>{" "}
              </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>

            <Button
              colorScheme="blue"
              type="submit"
              leftIcon={<AddIcon />}
              textTransform={"uppercase"}
              letterSpacing={"0.02em"}
            >
              {isEditForm ? "Save" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  function handleInputChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function handleAmountValueChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      amount: {
        ...formState.amount,
        value: e.currentTarget.value,
      },
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit(createEntryFromEntryModalState(formState, entry?.id));
    setFormState(initialCreateEntryFormState);
    onClose();
  }
}

export default CreateUpdateEntryModal;
