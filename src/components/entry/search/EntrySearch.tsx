import React, { useEffect, useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  List,
  ListItem,
  useDisclosure,
  IconButton,
  Button,
  SlideFade,
  useColorModeValue,
} from "@chakra-ui/react";

import useOnClickOutside from "../../../utils/hooks/useOnClickOutside";
import { EntryListItemContent } from "../list-item-content/EntryListItemContent";
import CreateUpdateEntryModal from "../create-modal/CreateUpdateEntryModal";
import SearchInput from "../../search-input/SearchInput";
import { filterEntriesBySearchKeyword } from "../../../utils/utils";

interface EntrySearchProps {
  entries: Entry[];
  onEntrySelect: (entry: Entry) => void;
  onEntryCreate: (entry: Entry) => void;
}

function EntrySearch({
  entries,
  onEntrySelect,
  onEntryCreate,
}: EntrySearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [visibleEntries, setVisibleEntries] = useState<Entry[]>([]);

  const {
    isOpen: isCreateModalOpen,
    onOpen: openCreateModal,
    onClose: closeCreateModal,
  } = useDisclosure();

  useOnClickOutside(containerRef, onClose);

  useEffect(() => {
    if (searchInputValue) {
      setVisibleEntries(
        filterEntriesBySearchKeyword(entries, searchInputValue)
      );
      onOpen();
    } else {
      setVisibleEntries([]);
      onClose();
    }
  }, [searchInputValue, onOpen, onClose, entries]);

  const addIconButtonColorScheme = useColorModeValue("blackAlpha", undefined);
  const listItemBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <Box position={"relative"} ref={containerRef} zIndex={1}>
        <SearchInput
          value={searchInputValue}
          placeholder={"Search food or drinks"}
          onChange={(value) => setSearchInputValue(value)}
        />

        <SlideFade in={isOpen} unmountOnExit>
          <List
            position={"absolute"}
            width={"100%"}
            borderRadius={4}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.100", "gray.600")}
            zIndex={2}
            boxShadow={useColorModeValue("0 0 10px #999", "0 0 10px #333")}
            maxHeight={"300px"}
            overflow={"auto"}
            background={useColorModeValue("gray.50", "gray.700")}
          >
            {!visibleEntries.length && (
              <ListItem
                transition={"background 0.23s"}
                padding={"4px 12px"}
                display={"grid"}
              >
                <Button
                  leftIcon={<AddIcon />}
                  justifyContent={"flex-start"}
                  width={"100%"}
                  onClick={openCreateModal}
                >
                  {`Create New Entry (${searchInputValue})`}
                </Button>
              </ListItem>
            )}

            {visibleEntries.map((i) => (
              <ListItem
                key={i.id}
                transition={"background 0.23s"}
                padding={"4px 12px"}
                display={"grid"}
                gridTemplateColumns={"1fr auto"}
                gridGap={5}
                alignItems={"center"}
                borderBottom={"1px solid"}
                borderColor={listItemBorderColor}
              >
                <EntryListItemContent entry={i} />

                <IconButton
                  aria-label={`add ${i.name} to list`}
                  icon={<AddIcon />}
                  size={"sm"}
                  colorScheme={addIconButtonColorScheme}
                  onClick={() => {
                    onEntrySelect(i);
                    setSearchInputValue("");
                  }}
                />
              </ListItem>
            ))}
          </List>
        </SlideFade>
      </Box>

      <CreateUpdateEntryModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateEntry}
        entry={{ name: searchInputValue }}
      />
    </>
  );

  function handleCreateEntry(entry: Entry) {
    setSearchInputValue(entry.name);
    onEntryCreate(entry);
  }
}

export default EntrySearch;
