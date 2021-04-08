import React, { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { Entry } from "../utils/typeUtils";
import SearchInput from "./SearchInput";
import CreateUpdateEntryModal from "./create-entry-modal/CreateUpdateEntryModal";
import { EntryListItemContent } from "./EntryListItemContent";
import ButtonWithConfirmation from "./button-with-confirmation/ButtonWithConfirmation";
import { filterEntriesBySearchKeyword } from "../utils/utils";

interface EntryListPageProps {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

function EntryListPage({ entries, setEntries }: EntryListPageProps) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [visibleEntries, setVisibleEntries] = useState<Entry[]>(entries);
  const [entryToBeEdited, setEntryToBeEdited] = useState<Entry | null>(null);

  const {
    isOpen: isCreateUpdateEntryModalOpen,
    onOpen: openCreateUpdateModal,
    onClose: closeCreateUpdateModal,
  } = useDisclosure();

  useEffect(() => {
    if (searchInputValue) {
      setVisibleEntries(
        filterEntriesBySearchKeyword(entries, searchInputValue)
      );
    } else {
      setVisibleEntries(entries);
    }
  }, [searchInputValue, entries]);

  return (
    <div className={"playground-container"}>
      <SearchInput
        value={searchInputValue}
        placeholder={"Filter entries by name"}
        onChange={(value) => setSearchInputValue(value)}
      />

      <Box mt={5}>
        <Grid mb={3} gridTemplateColumns={"1fr auto"} alignItems={"center"}>
          <Heading as="h2" size="md">
            {`Entries (${visibleEntries.length})`}
          </Heading>
          <Button
            size={"sm"}
            leftIcon={<AddIcon />}
            variant={"outline"}
            onClick={openCreateUpdateModal}
          >
            Add New
          </Button>
        </Grid>

        <List>
          {visibleEntries.length ? (
            visibleEntries.map((entry) => (
              <ListItem
                key={`entry-list-page-${entry.id}`}
                display={"grid"}
                gridTemplateColumns={"1fr auto auto"}
                gridGap={"12px"}
                alignItems={"center"}
                padding={1}
                borderBottom={"1px solid"}
                borderColor={"gray.200"}
                marginBottom={2}
              >
                <EntryListItemContent entry={entry} />

                <ButtonWithConfirmation
                  onConfirm={() => handleEntryDelete(entry)}
                  icon={<DeleteIcon />}
                  alertDialogProps={{
                    title: `Delete "${entry.name}"`,
                    description: `Are you sure? You are removing the entry called "${entry.name}". This cannot be undone.`,
                    confirmButtonText: "Delete",
                  }}
                />

                <IconButton
                  icon={<EditIcon />}
                  aria-label={`edit ${entry.name}`}
                  onClick={() => {
                    setEntryToBeEdited(entry);
                    openCreateUpdateModal();
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Text textAlign="center" color={"gray.500"}>
              Nothing to see here...
            </Text>
          )}
        </List>
      </Box>

      <CreateUpdateEntryModal
        onClose={closeCreateUpdateModal}
        isOpen={isCreateUpdateEntryModalOpen}
        onSubmit={handleCreateUpdateEntryModalSubmit}
        entry={entryToBeEdited || undefined}
        mode={entryToBeEdited ? "EDIT" : "CREATE"}
      />
    </div>
  );

  function handleCreateUpdateEntryModalSubmit(entry: Entry) {
    if (entryToBeEdited) {
      setEntries(
        entries.map((ent) => {
          if (ent.id === entry.id) {
            return entry;
          }

          return ent;
        })
      );
    } else {
      setEntries([...entries, entry]);
    }
  }

  function handleEntryDelete(entryToBeDeleted: Entry) {
    // !!! TODO: Removing entries directly may cause problems, if daily logs reference log.entry by ID (currently every daily log keeps a copy of the entry)
    setEntries(entries.filter((entry) => entry.id !== entryToBeDeleted.id));
  }
}

export default EntryListPage;
