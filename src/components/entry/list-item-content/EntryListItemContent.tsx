import React from "react";
import { Grid, Text, Flex, Badge } from "@chakra-ui/react";

import { EntryNutritionDefinitionList } from "../nutrition-definition-list/EntryNutritionDefinitionList";

/**
 *
 * @param numOfServings will be multiplied by entry values (amount and nutritions) for showing in UI
 */
export function EntryListItemContent({
  entry,
  numOfServings = 1,
}: {
  entry: Entry;
  numOfServings?: number;
}) {
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
          {entry.amount.value * numOfServings} {entry.amount.type}
        </Badge>
      </Flex>

      <EntryNutritionDefinitionList
        values={entry}
        numOfServings={numOfServings}
      />
    </Grid>
  );
}
