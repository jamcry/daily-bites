import React, { useEffect, useState } from "react";
import { AddIcon, DownloadIcon, HamburgerIcon } from "@chakra-ui/icons";
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
  Input,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import CreateUpdateEntryModal from "./components/create-entry-modal/CreateUpdateEntryModal";
import { defaults, Entry, EntryLog } from "./utils/typeUtils";
import {
  AppState,
  loadDataFromLS,
  saveDataToLS,
} from "./utils/localStorageUtils";
import {
  downloadObjectAsJSON,
  generateRandomString,
  getDateStringInYYYYMMDD,
} from "./utils/utils";
import EntrySearch from "./components/EntrySearch";
import { EntryListItemContent } from "./components/EntryListItemContent";
import { EntryNutritionDefinitionList } from "./components/EntryNutritionDefinitionList";
import EntryListPage from "./components/EntryListPage";
import DeleteButtonWithConfirmation from "./components/delete-button-with-confirmation/DeleteButton";
import ImportLogModal from "./components/import-log-modal/ImportLogModal";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isImportLogModalOpen, setIsImportLogModalOpen] = useState(false);
  const selectedDateInYYYYMMDD = getDateStringInYYYYMMDD(selectedDate);
  const [selectedDayEntryLogs, setSelectedDayEntryLogs] = useState<EntryLog[]>(
    lsData?.myLogs?.[selectedDateInYYYYMMDD] || []
  );

  useEffect(() => {
    // When selected date is changed, load the logs at the selected date, or initialize with empty array
    setSelectedDayEntryLogs(
      loadDataFromLS()?.myLogs?.[selectedDateInYYYYMMDD] || []
    );
  }, [selectedDateInYYYYMMDD]);

  useEffect(() => {
    saveDataToLS({
      myEntries,
      myLogs: {
        ...loadDataFromLS()?.myLogs,
        [selectedDateInYYYYMMDD]: selectedDayEntryLogs,
      },
    });

    console.log("* LocalStorage data was updated.");
  }, [myEntries, selectedDayEntryLogs, selectedDateInYYYYMMDD]);

  return (
    <Box bgColor={"gray.50"} width={"100%"} height={"100vh"}>
      <Box
        padding={{ lg: "24px", base: "12px" }}
        maxWidth={"960px"}
        margin={"auto"}
        bgColor={"gray.50"}
      >
        {renderHeader()}

        <Tabs variant={"line"} colorScheme={"blue"} bgColor={"gray.50"} isLazy>
          <TabList mb={2}>
            <Tab background={"transparent"}>Logs</Tab>
            <Tab>Entries</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>{renderDayLogView()}</TabPanel>
            <TabPanel>
              <EntryListPage entries={myEntries} setEntries={setMyEntries} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <CreateUpdateEntryModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSubmit={handleCreateEntry}
        />

        <ImportLogModal
          isOpen={isImportLogModalOpen}
          onClose={() => setIsImportLogModalOpen(false)}
          onLoad={handleBackupLoad}
        />
      </Box>
    </Box>
  );

  // TODO: extract render fns. to separate components
  function renderHeader() {
    return (
      <>
        <Grid
          gridTemplateColumns={"1fr 40px"}
          gridGap={5}
          // borderBottom={"1px solid"}
          borderColor={"gray.200"}
          pb={1}
          mb={1}
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
              <MenuItem
                icon={<DownloadIcon />}
                onClick={() =>
                  downloadObjectAsJSON(
                    loadDataFromLS(),
                    `dailybites_data_${new Date().getTime()}`
                  )
                }
              >
                Export data (JSON)
              </MenuItem>
              <MenuItem
                icon={<DownloadIcon transform="rotate(180deg)" />}
                onClick={() => setIsImportLogModalOpen(true)}
              >
                Import data (JSON)
              </MenuItem>
            </MenuList>
          </Menu>
        </Grid>
      </>
    );
  }

  function renderDayLogView() {
    return (
      <>
        <EntrySearch
          entries={myEntries}
          onEntrySelect={handleAddEntry}
          onEntryCreate={handleCreateEntry}
        />

        <HStack w="100%" alignItems={"flex-start"} spacing={10} mt={5}>
          <Box flex={1}>
            <Grid mb={3} gridTemplateColumns={"1fr auto"} alignItems={"center"}>
              <Heading as="h2" size="md">
                {selectedDateInYYYYMMDD === getDateStringInYYYYMMDD()
                  ? "Today's Logs"
                  : "Day Logs"}
              </Heading>

              <Input
                type="date"
                // value is expected as "2020-02-30"
                value={selectedDate.toISOString().slice(0, 10)}
                onChange={(e) => {
                  setSelectedDate(e.target.valueAsDate || new Date());
                }}
              />
            </Grid>

            <Grid
              autoFlow="column"
              gap={10}
              border={"1px solid"}
              borderColor={"gray.400"}
              borderRadius={5}
              padding={2}
            >
              <EntryNutritionDefinitionList
                values={selectedDayEntryLogs.reduce(
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

            <Box
              overflow={"auto"}
              // todo: find a better way to fill the available height
              maxHeight={"calc(100vh - 350px)"}
              mt={7}
            >
              <List>
                {!selectedDayEntryLogs.length && <NoLogMessageBox />}

                {selectedDayEntryLogs?.map((loggedItem) => (
                  <EntryLogListItem
                    key={loggedItem.id}
                    entryLog={loggedItem}
                    onNumOfServingChange={(num: number) => {
                      setSelectedDayEntryLogs(
                        selectedDayEntryLogs.map((log) => {
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
                      setSelectedDayEntryLogs(
                        selectedDayEntryLogs.filter(
                          (log) => log.id !== loggedItem.id
                        )
                      )
                    }
                  />
                ))}
              </List>
            </Box>
          </Box>
        </HStack>
      </>
    );
  }

  function handleAddEntry(entry: Entry) {
    const newTodayEntry: typeof selectedDayEntryLogs[0] = {
      id: generateRandomString(),
      addedAt: new Date().getTime(),
      entry,
      numOfServings: 1,
    };

    setSelectedDayEntryLogs([...selectedDayEntryLogs, newTodayEntry]);
  }

  function handleCreateEntry(entry: Entry) {
    setMyEntries([...(myEntries || []), entry]);
  }

  function handleBackupLoad(appState: AppState) {
    saveDataToLS(appState);

    // This is a lazy way to sync app state to local storage
    window.location.reload();
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

      <Box position={"absolute"} top={0} right={0}>
        <DeleteButtonWithConfirmation
          onDelete={onDelete}
          alertDialogProps={{
            title: `Delete "${entryLog.entry.name}"`,
            description: `Are you sure? You are removing the entry called "${entryLog.entry.name}". This cannot be undone.`,
          }}
        />
      </Box>
    </ListItem>
  );
}

export default App;
