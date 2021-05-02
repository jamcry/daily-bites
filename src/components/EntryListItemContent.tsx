import React from "react";
import { Grid, Text, Flex, Badge } from "@chakra-ui/react";

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
        flexWrap="wrap"
        gridGap={"5px 10px"}
        justifyContent={"flex-start"}
        textAlign={"left"}
      >
        <Text lineHeight={{ base: "100%" }}>{entry.name}</Text>

        <Badge width={"max-content"} variant={"outline"}>
          {entry.amount.value} {entry.amount.type}
        </Badge>
      </Flex>

      <EntryNutritionDefinitionList values={entry} />
    </Grid>
  );
}
