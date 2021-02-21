import React, { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Grid,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import CreateEntryModal from "./components/create-entry-modal/CreateEntryModal";
import { defaults, Entry, EntryLog } from "./utils/typeUtils";
import { loadDataFromLS, saveDataToLS } from "./utils/localStorageUtils";
import { generateRandomString, getDateStringInYYYYMMDD } from "./utils/utils";
import EntrySearch from "./components/EntrySearch";
import { EntryListItemContent } from "./components/EntryListItemContent";
import { EntryNutritionDefinitionList } from "./components/EntryNutritionDefinitionList";

function App() {
  const lsData = loadDataFromLS();
  const {
    isOpen: isCreateModalOpen,
    onOpen: openCreateModal,
    onClose: closeCreateModal,
  } = useDisclosure();
  const [myEntries, setMyEntries] = useState<Entry[]>(
    lsData?.myEntries || defaults
  );
  const [todayEntryLogs, setTodayEntryLogs] = useState<EntryLog[]>(
    lsData?.myLogs?.[getDateStringInYYYYMMDD()] || []
  );

  useEffect(() => {
    saveDataToLS({
      myEntries,
      myLogs: {
        ...loadDataFromLS()?.myLogs,
        [getDateStringInYYYYMMDD()]: todayEntryLogs,
      },
    });

    console.log("* LocalStorage data was updated.");
  }, [myEntries, todayEntryLogs]);

  return (
    <div className="App">
      <Box padding={{ lg: "24px", base: "12px" }}>
        <Grid
          gridTemplateColumns={"1fr 40px"}
          gridGap={5}
          borderBottom={"1px solid"}
          borderColor={"gray.200"}
          pb={5}
          mb={5}
        >
          <Heading>🍕 DailyBites</Heading>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              size="md"
              variant="outline"
            />
            <MenuList zIndex={4}>
              <MenuItem icon={<AddIcon />} onClick={openCreateModal}>
                Create Entry
              </MenuItem>
            </MenuList>
          </Menu>
        </Grid>

        <EntrySearch entries={myEntries} onEntrySelect={handleAddEntry} />

        <HStack w="100%" alignItems={"flex-start"} spacing={10} mt={10}>
          <Box flex={1}>
            <Heading as="h2" size="md" mb={3}>
              Today's Log
            </Heading>

            <Grid
              autoFlow="column"
              gap={10}
              border={"1px solid"}
              borderColor={"gray.400"}
              borderRadius={5}
              padding={2}
            >
              <EntryNutritionDefinitionList
                values={todayEntryLogs.reduce(
                  (prevValues, { entry, numOfServings }) => {
                    return {
                      ...prevValues,
                      protein:
                        prevValues.protein +
                        (entry.protein || 0) * numOfServings,
                      carb: prevValues.carb + (entry.carb || 0) * numOfServings,
                      fat: prevValues.fat + (entry.fat || 0) * numOfServings,
                      calories:
                        prevValues.calories +
                        (entry.calories || 0) * numOfServings,
                    };
                  },
                  {
                    protein: 0,
                    carb: 0,
                    fat: 0,
                    calories: 0,
                  }
                )}
              />
            </Grid>

            <List mt={7} maxHeight={500} overflow={"auto"}>
              {!todayEntryLogs.length && <NoLogMessageBox />}

              {todayEntryLogs?.map((loggedItem) => (
                <EntryLogListItem
                  key={loggedItem.id}
                  entryLog={loggedItem}
                  onNumOfServingChange={(num: number) => {
                    setTodayEntryLogs(
                      todayEntryLogs.map((log) => {
                        if (log.id === loggedItem.id) {
                          return {
                            ...log,
                            numOfServings: num,
                          };
                        }
                        return log;
                      })
                    );
                  }}
                  onDelete={() =>
                    setTodayEntryLogs(
                      todayEntryLogs.filter((log) => log.id !== loggedItem.id)
                    )
                  }
                />
              ))}
            </List>
          </Box>
        </HStack>

        <CreateEntryModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onCreate={handleCreateEntry}
        />
      </Box>
    </div>
  );

  function handleAddEntry(entry: Entry) {
    const newTodayEntry: typeof todayEntryLogs[0] = {
      id: generateRandomString(),
      addedAt: new Date().getTime(),
      entry,
      numOfServings: 1,
    };

    setTodayEntryLogs([...todayEntryLogs, newTodayEntry]);
  }

  function handleCreateEntry(entry: Entry) {
    setMyEntries([...(myEntries || []), entry]);
  }
}

function NoLogMessageBox() {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      borderRadius={6}
    >
      <AlertIcon boxSize="40px" mr={0} />

      <AlertTitle mt={4} mb={1} fontSize="lg">
        No Items Yet
      </AlertTitle>

      <AlertDescription maxWidth="sm">
        There are no items in today's log. You can search and add an item above.
      </AlertDescription>
    </Alert>
  );
}

function EntryLogListItem({
  entryLog,
  onNumOfServingChange,
  onDelete,
}: {
  entryLog: EntryLog;
  onNumOfServingChange: (num: number) => void;
  onDelete: VoidFunction;
}) {
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
      onNumOfServingChange(parseFloat(numOfServingInputValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfServingInputValue]);

  return (
    <ListItem
      key={entryLog.id}
      background={"gray.100"}
      mb={3}
      p={2}
      display={"flex"}
      alignItems={"flex-end"}
      justifyContent={"space-between"}
      borderRadius={4}
      gridGap={"8px"}
      position={"relative"}
    >
      <EntryListItemContent entry={entryLog.entry} />

      <NumberInput
        value={numOfServingInputValue}
        step={0.1}
        min={0.1}
        precision={1}
        onChange={(valueStr, valNum) => {
          setNumOfServingInputValue(valueStr);
        }}
        w={100}
        focusInputOnChange={false}
      >
        <NumberInputField background={"white"} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <IconButton
        icon={<DeleteIcon color={"gray.400"} />}
        aria-label={`delete ${entryLog.entry.name}`}
        onClick={onDelete}
        size={"sm"}
        position={"absolute"}
        top={0}
        right={0}
      />
    </ListItem>
  );
}

export default App;
