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
      <Box p={8}>
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
                  (prevValues, { entry }) => {
                    return {
                      ...prevValues,
                      protein: prevValues.protein + (entry.protein || 0),
                      carb: prevValues.carb + (entry.carb || 0),
                      fat: prevValues.fat + (entry.fat || 0),
                      calories: prevValues.calories + (entry.calories || 0),
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

              {todayEntryLogs?.map((e) => (
                <ListItem
                  key={e.id}
                  background={"gray.100"}
                  mb={3}
                  p={2}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  borderRadius={4}
                  gridGap={2}
                >
                  <EntryListItemContent entry={e.entry} />

                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label={`delete ${e.entry.name}`}
                    onClick={() => {
                      setTodayEntryLogs(
                        todayEntryLogs.filter((log) => log.id !== e.id)
                      );
                    }}
                  />
                </ListItem>
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

export default App;
