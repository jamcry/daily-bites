import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputRightElement,
  InputGroup,
  Box,
  List,
  ListItem,
  ScaleFade,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../utils/hooks/useOnClickOutside";

import { Entry } from "../utils/typeUtils";
import { EntryListItemContent } from "./EntryListItemContent";

interface EntrySearchProps {
  entries: Entry[];
  onEntrySelect: (entry: Entry) => void;
}

function EntrySearch({ entries, onEntrySelect }: EntrySearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [visibleEntries, setVisibleEntries] = useState<Entry[]>([]);

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
    <Box position={"relative"} ref={containerRef}>
      <InputGroup>
        <Input
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.currentTarget.value)}
          placeholder="Search food or drinks"
        />
        <InputRightElement children={<SearchIcon color="gray.500" />} />
      </InputGroup>

      <ScaleFade in={isOpen} unmountOnExit>
        <List
          position={"absolute"}
          width={"100%"}
          bg={"white"}
          borderRadius={4}
          border={"1px solid"}
          borderColor={"gray.100"}
          zIndex={1}
          boxShadow={"0 0 10px #eee"}
          maxHeight={"300px"}
          overflow={"auto"}
        >
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
      </ScaleFade>
    </Box>
  );
}

export default EntrySearch;
