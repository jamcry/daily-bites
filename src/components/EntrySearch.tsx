import React, { useEffect, useRef, useState } from "react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputRightElement,
  InputGroup,
  Box,
  List,
  ListItem,
  useDisclosure,
  IconButton,
  Button,
  SlideFade,
} from "@chakra-ui/react";

import { Entry } from "../utils/typeUtils";
import useOnClickOutside from "../utils/hooks/useOnClickOutside";
import { EntryListItemContent } from "./EntryListItemContent";
import CreateEntryModal from "./create-entry-modal/CreateEntryModal";

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
        entries.filter((i) =>
          i.name
            .toLocaleLowerCase()
            .includes(searchInputValue.toLocaleLowerCase())
        )
      );
      onOpen();
    } else {
      setVisibleEntries([]);
      onClose();
    }
  }, [searchInputValue, onOpen, onClose, entries]);

  return (
    <>
      <Box position={"relative"} ref={containerRef} zIndex={1}>
        <InputGroup>
          <Input
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.currentTarget.value)}
            placeholder="Search food or drinks"
            background={"gray.200"}
            _placeholder={{ color: "gray.400" }}
            _focus={{ background: "white" }}
          />
          <InputRightElement children={<SearchIcon color="gray.500" />} />
        </InputGroup>

        <SlideFade in={isOpen} unmountOnExit>
          <List
            position={"absolute"}
            width={"100%"}
            bg={"white"}
            borderRadius={4}
            border={"1px solid"}
            borderColor={"gray.100"}
            zIndex={2}
            boxShadow={"0 0 10px #999"}
            maxHeight={"300px"}
            overflow={"auto"}
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
                  background={"transparent"}
                >
                  {`Create New Entry (${searchInputValue})`}
                </Button>
              </ListItem>
            )}

            {visibleEntries.map((i) => (
              <ListItem
                key={i.id}
                transition={"background 0.23s"}
                _hover={{ bg: "gray.100" }}
                padding={"4px 12px"}
                display={"grid"}
                gridTemplateColumns={"1fr auto"}
                gridGap={5}
                alignItems={"center"}
                borderBottom={"1px solid"}
                borderColor={"gray.300"}
              >
                <EntryListItemContent entry={i} />

                <IconButton
                  aria-label={`add ${i.name} to list`}
                  icon={<AddIcon />}
                  size={"sm"}
                  colorScheme={"blackAlpha"}
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

      <CreateEntryModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateEntry}
        entryNameInitialValue={searchInputValue}
      />
    </>
  );

  function handleCreateEntry(entry: Entry) {
    setSearchInputValue(entry.name);
    onEntryCreate(entry);
  }
}

export default EntrySearch;
