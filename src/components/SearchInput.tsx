import React from "react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <InputGroup>
      <Input
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        background={"gray.200"}
        _placeholder={{ color: "gray.400" }}
        _focus={{ background: "white" }}
      />
      <InputRightElement
        children={
          value.length ? (
            <IconButton
              aria-label="clear search query"
              bgColor={"transparent"}
              icon={<CloseIcon />}
              onClick={() => onChange("")}
            />
          ) : (
            <SearchIcon color="gray.500" />
          )
        }
      />
    </InputGroup>
  );
}

export default SearchInput;
