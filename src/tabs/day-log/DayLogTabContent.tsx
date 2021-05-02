import React, { useEffect, useState } from "react";
import {
  HStack,
  Box,
  Grid,
  Heading,
  Input,
  useColorModeValue,
  List,
} from "@chakra-ui/react";

import EntrySearch from "../../components/entry/search/EntrySearch";
import DayLogListItem from "./day-log-list-item/DayLogListItem";
import DayLogListEmptyStateAlert from "./no-log-alert/DayLogListEmptyAlert";
import { EntryNutritionDefinitionList } from "../../components/entry/nutrition-definition-list/EntryNutritionDefinitionList";
import { loadDataFromLS, saveDataToLS } from "../../utils/localStorageUtils";
import {
  generateRandomString,
  getDateStringInYYYYMMDD,
} from "../../utils/utils";
import { getNutritionSumValuesFromEntryLogs } from "./utils/dayLogTabContentUtils";

interface DayLogTabContentProps {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

function DayLogTabContent({ entries, setEntries }: DayLogTabContentProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateInYYYYMMDD = getDateStringInYYYYMMDD(selectedDate);
  const [selectedDayEntryLogs, setSelectedDayEntryLogs] = useState<EntryLog[]>(
    loadDataFromLS()?.myLogs?.[selectedDateInYYYYMMDD] || []
  );

  useEffect(() => {
    // When selected date is changed, load the logs at the selected date, or initialize with empty array
    setSelectedDayEntryLogs(
      loadDataFromLS()?.myLogs?.[selectedDateInYYYYMMDD] || []
    );
  }, [selectedDateInYYYYMMDD]);

  useEffect(() => {
    // Sync selected day's data
    const lsData = loadDataFromLS();

    saveDataToLS({
      ...(lsData || { myEntries: [] }),
      myLogs: {
        ...lsData?.myLogs,
        [selectedDateInYYYYMMDD]: selectedDayEntryLogs,
      },
    });

    console.log("* LocalStorage data was updated.");
  }, [selectedDayEntryLogs, selectedDateInYYYYMMDD]);

  return (
    <>
      <EntrySearch
        entries={entries}
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
            background={useColorModeValue("gray.100", "gray.700")}
          >
            <EntryNutritionDefinitionList
              values={getNutritionSumValuesFromEntryLogs(selectedDayEntryLogs)}
            />
          </Grid>

          <Box
            overflow={"auto"}
            // todo: find a better way to fill the available height
            maxHeight={"calc(100vh - 350px)"}
            mt={7}
          >
            <List>
              {!selectedDayEntryLogs.length && <DayLogListEmptyStateAlert />}

              {selectedDayEntryLogs?.map((loggedItem) => (
                <DayLogListItem
                  key={loggedItem.id}
                  entryLog={loggedItem}
                  selectedDayEntryLogs={selectedDayEntryLogs}
                  setSelectedDayEntryLogs={setSelectedDayEntryLogs}
                />
              ))}
            </List>
          </Box>
        </Box>
      </HStack>
    </>
  );

  function handleCreateEntry(entry: Entry) {
    setEntries([...(entries || []), entry]);
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
}

export default DayLogTabContent;
