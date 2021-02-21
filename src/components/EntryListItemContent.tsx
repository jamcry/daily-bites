import React from "react";
import { Grid, Text, Flex } from "@chakra-ui/react";

import { Entry } from "../utils/typeUtils";
import { EntryNutritionDefinitionList } from "./EntryNutritionDefinitionList";

export function EntryListItemContent({ entry }: { entry: Entry }) {
  return (
    <Grid
      gridTemplateColumns={{
        sm: "1fr",
        lg: "1fr auto",
      }}
      gridGap={2}
      width={"100%"}
      alignItems={"center"}
    >
      <Flex
        flexDirection={{ lg: "column", base: "row" }}
        gridGap={"0 6px"}
        textAlign={"left"}
      >
        <Text>{entry.name}</Text>
        <Text color={"gray.600"}>
          {entry.amount.value} {entry.amount.type}
        </Text>
      </Flex>

      <EntryNutritionDefinitionList values={entry} />
    </Grid>
  );
}
