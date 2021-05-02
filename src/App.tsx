import React, { useEffect, useState } from "react";

import { Box, TabList, Tab, TabPanels, Tabs, TabPanel } from "@chakra-ui/react";

import PageHeader from "./components/header/PageHeader";
import DayLogTabContent from "./tabs/day-log/DayLogTabContent";
import { DEFAULT_ENTRIES } from "./components/entry/util/entryConstants";
import EntryListTabContent from "./tabs/entry-list/EntryListTabContent";
import { loadDataFromLS, saveDataToLS } from "./utils/localStorageUtils";

function App() {
  // TODO: Move all state management to a context using reducer
  const lsData = loadDataFromLS();
  const [myEntries, setMyEntries] = useState<Entry[]>(
    lsData?.myEntries || DEFAULT_ENTRIES
  );

  useEffect(() => {
    // Sync myEntries
    saveDataToLS({
      ...(loadDataFromLS() || { myLogs: null }),
      myEntries,
    });

    console.log("* LocalStorage data was updated.");
  }, [myEntries]);

  const tabs: { title: string; content: React.ReactNode }[] = [
    {
      title: "Logs",
      content: (
        <DayLogTabContent entries={myEntries} setEntries={setMyEntries} />
      ),
    },

    {
      title: "Entries",
      content: (
        <EntryListTabContent entries={myEntries} setEntries={setMyEntries} />
      ),
    },
  ];

  return (
    <Box width={"100%"} height={"100vh"}>
      <Box
        padding={{ lg: "24px", base: "12px" }}
        maxWidth={"960px"}
        margin={"auto"}
      >
        <PageHeader onCreateEntry={handleCreateEntry} />

        <Tabs variant={"line"} colorScheme={"blue"} isLazy>
          <TabList mb={2} id={"tab-list"}>
            {tabs.map((t) => (
              <Tab key={`tab-${t.title}`} background={"transparent"}>
                {t.title}
              </Tab>
            ))}
          </TabList>

          <TabPanels padding={0}>
            {tabs.map((t) => (
              <TabPanel
                key={`tab-${t.title}`}
                padding={{ base: 1, md: 3, lg: 6 }}
              >
                {t.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );

  function handleCreateEntry(entry: Entry) {
    setMyEntries([...(myEntries || []), entry]);
  }
}

export default App;
