import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  ListItem,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  IconButton,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  InputGroup,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  PopoverFooter,
  Flex,
} from "@chakra-ui/react";

import ButtonWithConfirmation from "../../../components/button-with-confirmation/ButtonWithConfirmation";
import { EntryListItemContent } from "../../../components/entry/list-item-content/EntryListItemContent";

interface DayLogListItemProps {
  entryLog: EntryLog;
  selectedDayEntryLogs: EntryLog[];
  setSelectedDayEntryLogs: React.Dispatch<React.SetStateAction<EntryLog[]>>;
}

function DayLogListItem({
  entryLog,
  selectedDayEntryLogs,
  setSelectedDayEntryLogs,
}: DayLogListItemProps) {
  /*
   * Directly updating log state (with onNumOfServingChange()) will prevent
   * user from manually entering decimal numbers, because parseFloat() will
   * remove "." as soon as it is entered. So, a local input state is also
   * kept here, and log state is updated only when input value is valid
   */

  const [numOfServingInputValue, setNumOfServingInputValue] = useState(
    entryLog.numOfServings.toString()
  );

  useEffect(() => {
    if (!numOfServingInputValue.endsWith(".")) {
      handleNumOfServingsChange(parseFloat(numOfServingInputValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfServingInputValue]);

  return (
    <ListItem
      key={entryLog.id}
      mb={3}
      p={2}
      display={"flex"}
      alignItems={"flex-end"}
      justifyContent={"space-between"}
      borderRadius={4}
      gridGap={"8px"}
      position={"relative"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <EntryListItemContent {...entryLog} />

      <Popover>
        <PopoverTrigger>
          <IconButton
            variant={"outline"}
            aria-label={"toggle log item menu"}
            icon={<EditIcon />}
          />
        </PopoverTrigger>

        <Portal>
          <PopoverContent marginRight={1}>
            <PopoverArrow />

            <PopoverCloseButton />

            <PopoverBody>
              <InputGroup display={"grid"} mb={3}>
                <FormLabel>{`Update Amount (${entryLog.entry.amount.type})`}</FormLabel>

                <NumberInput
                  // TODO: convert this to a more mobile friendly component
                  // exp: https://chakra-ui.com/docs/form/number-input#create-a-mobile-spinner
                  value={numOfServingInputValue}
                  step={0.01}
                  min={0.1}
                  precision={2}
                  onChange={(valueStr) => {
                    setNumOfServingInputValue(valueStr);
                  }}
                  focusInputOnChange={false}
                >
                  <NumberInputField paddingLeft={1.5} />

                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </PopoverBody>

            <PopoverFooter>
              <Flex justifyContent={"space-between"}>
                <ButtonWithConfirmation
                  colorScheme={"red"}
                  leftIcon={<DeleteIcon />}
                  buttonText={"Delete Log"}
                  onConfirm={handleDelete}
                  alertDialogProps={{
                    title: `Delete "${entryLog.entry.name}"`,
                    description: `Are you sure? You are removing the entry log with "${entryLog.entry.name}". This cannot be undone.`,
                    confirmButtonText: "Delete",
                  }}
                />
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </ListItem>
  );

  function handleNumOfServingsChange(num: number) {
    setSelectedDayEntryLogs(
      selectedDayEntryLogs.map((log) => {
        if (log.id === entryLog.id) {
          return {
            ...log,
            numOfServings: num,
          };
        }

        return log;
      })
    );
  }

  function handleDelete() {
    setSelectedDayEntryLogs(
      selectedDayEntryLogs.filter((log) => log.id !== entryLog.id)
    );
  }
}

export default DayLogListItem;
